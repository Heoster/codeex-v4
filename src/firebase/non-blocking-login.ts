'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

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
    await setDoc(userDocRef, userData, { merge: true });
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
            await createUserProfile(userCredential.user);
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
        await setDoc(userDocRef, { lastLoginTimestamp: new Date().toISOString() }, { merge: true });
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
