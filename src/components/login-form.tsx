
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm({ mode = 'signup' }: { mode?: 'signup' | 'signin' }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (mode === 'signup') {
      toast({
        title: "Account Created",
        description: "We've created your account. You will be redirected shortly.",
      });
    } else {
      toast({
        title: "Logged In",
        description: "You are now logged in. Redirecting...",
      });
    }
    setTimeout(() => {
        router.push('/dashboard');
        setIsLoading(false);
    }, 1000)
  }

  const isSignUp = mode === 'signup';

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{isSignUp ? 'Sign up' : 'Sign in'}</h1>
        <p className="text-muted-foreground">
          {isSignUp ? 'Create an account to get started.' : 'Enter your credentials to log in.'}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder={isSignUp ? "Create Password" : "Enter Password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full !mt-6" variant="secondary" disabled={isLoading}>
            {isLoading ? "Loading..." : (isSignUp ? 'Create Account' : 'Login')}
          </Button>
        </form>
      </Form>
       <div className="mt-8 text-center text-sm">
        {isSignUp ? 'Already Have An Account?' : "Don't have an account?"} <a href="#" className="font-semibold text-primary hover:underline">{isSignUp ? 'Login' : 'Sign Up'}</a>
      </div>
    </div>
  );
}
