'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Code, Brain, Bot, FileQuestion, ScanEye, ShieldCheck, Wand2, Star } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useUser } from '@/firebase';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ChatHistoryProvider } from '@/components/chat/chat-history-provider';
import { ChatModeProvider } from '@/components/chat/chat-mode-provider';

const features = [
    {
      icon: Wand2,
      title: "Sentence Correction with Style",
      description: "Corrects your sentences with a touch of magic, adapting to your chosen style.",
    },
    {
      icon: Code,
      title: "Minecraft Modding Help",
      description: "Get guidance and code snippets for creating your own Minecraft mods.",
    },
    {
      icon: Brain,
      title: "Real-Time Search & Knowledge",
      description: "Access up-to-date information from the web to answer your questions.",
    },
    {
      icon: Bot,
      title: "Magical Personalities",
      description: "Switch between Jarvis, Codeex, and other AI personalities for a unique chat experience.",
    },
    {
      icon: FileQuestion,
      title: "Student-Friendly Quizzes",
      description: "Test your knowledge with quizzes generated on any topic, at any difficulty level.",
    },
    {
      icon: ScanEye,
      title: "Vision & OCR Tools",
      description: "Analyze images and extract text with powerful vision capabilities.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy-First Architecture",
      description: "Your data is yours. Conversations are stored securely and locally.",
    },
     {
      icon: Star,
      title: "Explore Features",
      description: "Discover all the powerful tools and features that Codeex has to offer.",
    }
  ];

export default function LandingPage() {
    const { user } = useUser();

    return (
        <ChatModeProvider>
        <ChatHistoryProvider>
          <SidebarProvider>
              <div className="min-h-screen">
                  <AppSidebar />
                  <SidebarInset>
                      <AppHeader />
                      <main className="h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="flex flex-col min-h-screen bg-background text-foreground">
                            <section className="flex-1 w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-br from-background to-primary/10">
                                <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                                <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                                    <div>
                                    <h1 className="lg:leading-tighter text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                        {user ? `Welcome back, ${user.displayName || 'friend'} ✨` : 'Welcome to CODEEX AI!'}
                                    </h1>
                                    <h2 className="text-2xl font-headline mt-2 text-primary">Your Magical Tech Companion Awaits</h2>
                                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                                        Learn, build, and explore with an assistant that speaks your language, corrects your sentences, helps you mod Minecraft, and guides you through real-world tech adventures.
                                    </p>
                                    <div className="space-x-4 mt-6">
                                        <Link href={user ? `/chat/${user.uid}` : '/login'}>
                                            <Button variant="premium" size="lg">
                                                <Brain className="mr-2 h-5 w-5" />
                                                Start Chatting with Codeex
                                            </Button>
                                        </Link>
                                        <Link href="/demo">
                                            <Button variant="outline" size="lg">
                                                <Wand2 className="mr-2 h-5 w-5" />
                                                Try a Magical Demo
                                            </Button>
                                        </Link>
                                    </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center relative">
                                        <Logo className='text-9xl [&>span]:text-9xl [&>svg]:h-40 [&>svg]:w-40' />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl -z-10"></div>
                                    </div>
                                </div>
                                </div>
                            </section>
                            
                            <section id="features" className="w-full py-12 md:py-24 lg:py-32">
                                <div className="container mx-auto px-4 md:px-6">
                                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">What Can Codeex Do?</h2>
                                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    From coding assistance to creative brainstorming, Codeex is your all-in-one magical companion.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {features.map((feature, index) => (
                                    <Card key={index} className="flex flex-col justify-start p-6 bg-card border card-hover-glow">
                                        <feature.icon className="h-8 w-8 text-primary mb-4" />
                                        <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </Card>
                                    ))}
                                </div>
                                </div>
                            </section>

                            <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
                                <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                                        Built for Learning, Designed for Wonder
                                    </h2>
                                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        An invaluable tool for students and educators. Explore complex topics, prepare for quizzes, and get help with your projects in an interactive, engaging way.
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <Link href="/tools">
                                        <Button variant="outline">Curriculum Tools</Button>
                                    </Link>
                                    <Link href="/terms">
                                        <Button variant="outline">Ethical Tech Guides</Button>
                                    </Link>
                                </div>
                                </div>
                            </section>
                        </div>
                      </main>
                  </SidebarInset>
              </div>
          </SidebarProvider>
        </ChatHistoryProvider>
      </ChatModeProvider>
    );
  }
