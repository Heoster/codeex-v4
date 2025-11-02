'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { errorEmitter, FirestorePermissionError } from '@/firebase';

async function createUserProfile(user: User) {
    const firestore = getFirestore(user.app);
    const userDocRef = doc(firestore, 'users', user.uid);
    const userData = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        creationTimestamp: new Date().toISOString(),
        lastLoginTimestamp: new Date().toISOString(),
    };
    
    setDoc(userDocRef, userData, { merge: true }).catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'create',
            requestResourceData: userData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
}


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, displayName: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then(async (userCredential) => {
        if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
            // We need to create the user profile document in Firestore
            await createUserProfile(userCredential.user);
            
            toast({
              title: "Welcome to CODEEX AI!",
              description: "Your account has been created successfully."
            });
        }
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            toast({
                title: "Email already in use",
                description: "This email is already registered. Please login instead.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Signup Error",
                description: error.message,
                variant: "destructive",
            });
        }
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password)
  .then(async (userCredential) => {
    if (userCredential.user) {
        const firestore = getFirestore(userCredential.user.app);
        const userDocRef = doc(firestore, 'users', userCredential.user.uid);
        const updateData = { lastLoginTimestamp: new Date().toISOString() };
        
        // Update the last login timestamp
        setDoc(userDocRef, updateData, { merge: true })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userDocRef.path,
                    operation: 'update',
                    requestResourceData: updateData,
                });
                errorEmitter.emit('permission-error', permissionError);
            });
    }
  })
    .catch((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
            toast({
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Login Error",
                description: error.message,
                variant: "destructive",
            });
        }
    });
}

/** Handle Google Sign-In and profile creation */
export function initiateGoogleSignIn(auth: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      // Check if this is a new user
      const isNewUser = result.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        // Create profile for new user
        await createUserProfile(user);
        toast({
            title: `Welcome, ${user.displayName}!`,
            description: "Your account has been created with Google.",
        });
      } else {
        // For returning users, just update last login
         const firestore = getFirestore(user.app);
         const userDocRef = doc(firestore, 'users', user.uid);
         const updateData = { lastLoginTimestamp: new Date().toISOString() };
         setDoc(userDocRef, updateData, { merge: true }).catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'update',
                requestResourceData: updateData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
      }
    })
    .catch((error) => {
      // Don't show an error toast if the user simply cancels the popup.
      if (error.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error("Google Sign-In Error", error);
      toast({
        title: "Google Sign-In Failed",
        description: error.message,
        variant: "destructive",
      });
    });
}
