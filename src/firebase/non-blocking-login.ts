'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
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

function handleAuthError(error: any) {
    // Gracefully handle cases where the user cancels the popup or an internal assertion fails.
    // These are not critical errors and should not disrupt the user experience.
    if (
      error.code === 'auth/cancelled-popup-request' ||
      error.message.includes('INTERNAL ASSERTION FAILED')
    ) {
      return;
    }
    
    if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/configuration-not-found') {
        toast({
            title: "Authentication Not Enabled",
            description: "Please enable Email/Password and Google sign-in in your Firebase Console > Authentication > Sign-in method.",
            variant: "destructive",
            duration: 10000,
        });
    } else if (error.code === 'auth/api-key-not-valid') {
        toast({
            title: "Invalid API Key",
            description: "The provided Firebase API key is not valid. Please check your configuration.",
            variant: "destructive",
        });
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
        toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
        });
    } else if (error.code === 'auth/email-already-in-use') {
        toast({
            title: "Email already in use",
            description: "This email is already registered. Please login instead.",
            variant: "destructive",
        });
    } else {
        toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
        });
    }
}


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch(handleAuthError);
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
    .catch(handleAuthError);
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
    .catch(handleAuthError);
}

/** Handle Google Sign-In and profile creation */
export function initiateGoogleSignIn(auth: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo?.isNewUser) {
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
    .catch(handleAuthError);
}
