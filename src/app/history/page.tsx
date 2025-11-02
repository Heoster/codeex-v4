'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { History, Trash2 } from 'lucide-react';
import { useChatHistory } from '@/components/chat/chat-history-provider';
import Link from 'next/link';

export default function HistoryPage() {
  const { chats, deleteChat } = useChatHistory();

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
          <CardDescription>
            Review and manage your past conversations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chats.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chats
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((chat) => (
                    <TableRow key={chat.id}>
                      <TableCell>
                        <Link href={`/chat/${chat.id}`} className="font-medium hover:underline">
                          {chat.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className='text-destructive hover:text-destructive'>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your chat history and remove
                                the data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteChat(chat.id)}
                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
              <History className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
              <p className="text-muted-foreground">
                Your past conversations will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
