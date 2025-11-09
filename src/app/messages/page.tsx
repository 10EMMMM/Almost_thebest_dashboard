
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Mail, Send, Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function MessagesPage() {
  const pageBackground = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 lg:p-8">
      {pageBackground && (
        <Image
          src={pageBackground.imageUrl}
          alt={pageBackground.description}
          fill
          className={cn(
            'object-cover -z-10 brightness-50 transition-all duration-300'
          )}
          data-ai-hint={pageBackground.imageHint}
          priority
        />
      )}
       <Card className="w-full max-w-6xl mx-auto bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[80vh]">
        <CardHeader className="p-0 text-center">
        <div className="flex justify-center items-center gap-1 bg-muted/50">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-transparent hover:border-primary"
                    asChild
                  >
                    <Link href="/dashboard">
                      <LayoutGrid className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-transparent hover:border-primary rounded-xl"
                    asChild
                  >
                    <Link href="/request">
                      <Send className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Request</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-primary bg-primary/10 hover:border-primary rounded-xl"
                     asChild
                  >
                    <Link href="/messages">
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-transparent hover:border-primary"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="pt-4 pb-4">
            <CardTitle>Messages</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex justify-center items-center p-8">
            <p>This is the messages page.</p>
        </CardContent>
      </Card>
    </main>
  );
}
