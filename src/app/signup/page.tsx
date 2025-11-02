'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, WandIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initiateEmailSignUp } from "@/firebase/non-blocking-login";


export default function SignupPage() {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Error signing in with Google", error);
        }
    };

    const handleEmailSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        initiateEmailSignUp(auth, email, password);
    };

    useEffect(() => {
        if (!isUserLoading && user) {
          router.push('/chat');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || user) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
          </div>
        );
    }
    
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="hidden bg-sidebar lg:flex flex-col items-center justify-center p-10 text-sidebar-foreground">
            <div className="w-full max-w-md space-y-4 text-center">
                <Logo className="justify-center text-4xl [&>span]:text-4xl [&>svg]:h-12 [&>svg]:w-12"/>
                <h1 className="text-4xl font-headline font-bold">Join the Magic</h1>
                <p className="text-muted-foreground text-lg">Create your account and unlock the power of AI.</p>
            </div>
            <div className="absolute bottom-4 text-sm text-muted-foreground flex items-center gap-2">
                <WandIcon className="h-4 w-4 text-primary" />
                Made by HEOSTER
            </div>
        </div>
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
                        <CardDescription>
                        Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleEmailSignUp}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="full-name">Full name</Label>
                                    <Input 
                                        id="full-name" 
                                        placeholder="Merlin" 
                                        required 
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                     />
                                </div>
                                <Button type="submit" className="w-full" variant="premium">
                                    Create an account
                                </Button>
                                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} type="button">
                                    <GoogleIcon className="mr-2 h-4 w-4" />
                                    Sign up with Google
                                </Button>
                            </div>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
      </div>
    </div>
  );
}
