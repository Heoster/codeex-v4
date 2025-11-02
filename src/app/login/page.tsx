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
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    initiateEmailSignIn(auth, email, password);
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
            <h1 className="text-4xl font-headline font-bold">Welcome Back to the Enchanted Circuit</h1>
            <p className="text-muted-foreground text-lg">Your magical AI companion awaits your command.</p>
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
              <CardTitle className="text-2xl font-headline">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSignIn}>
                <div className="grid gap-4">
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
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="premium">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} type="button">
                    <GoogleIcon className="mr-2 h-4 w-4"/>
                    Login with Google
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
