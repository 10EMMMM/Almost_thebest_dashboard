"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

const greetings = [
    "Hello, human!",
    "What's up, doc?",
    "Welcome to the matrix.",
    "Greetings, earthling.",
    "Keep up the great work!",
    "You're doing awesome!",
    "Remember to stay hydrated.",
    "Have a fantastic day!",
    "Let's get this bread.",
    "Someone's looking productive today!",
];

const Widget = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'widget bg-card rounded-xl p-6 flex flex-col border shadow-lg',
      className
    )}
  >
    {children}
  </div>
);


export const GreetingWidget = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, []);

    return (
        <Widget>
            <div className="flex justify-between items-center w-full mb-4">
                <h3 className="text-base font-semibold text-primary uppercase tracking-wider flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>WELCOME</span>
                </h3>
                <div className="text-sm text-muted-foreground">
                    &lt;Username&gt;
                </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow">
                 <p className="text-lg text-center font-medium">"{greeting}"</p>
            </div>
        </Widget>
    );
};
