"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HealthResponse {
  ok: boolean;
  status: number;
  message: string;
  url: string;
}

const defaultUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const defaultKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export default function SupabaseCheckPage() {
  const [projectUrl, setProjectUrl] = useState(defaultUrl);
  const [anonKey, setAnonKey] = useState(defaultKey);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAutoRun, setHasAutoRun] = useState(false);

  const isConfigured = useMemo(
    () => Boolean(projectUrl) && Boolean(anonKey),
    [projectUrl, anonKey]
  );

  const runHealthCheck = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/supabase-check", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url: projectUrl, apiKey: anonKey }),
      });

      const data = (await response.json()) as HealthResponse;

      if (!response.ok) {
        setError(data.message || "Unable to connect to Supabase.");
      } else {
        setError(null);
      }

      setResult(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [anonKey, projectUrl]);

  const checkConnection = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setHasAutoRun(true);
      await runHealthCheck();
    },
    [runHealthCheck]
  );

  useEffect(() => {
    if (!isConfigured) {
      setHasAutoRun(false);
      return;
    }

    if (!hasAutoRun && !isLoading) {
      setHasAutoRun(true);
      void runHealthCheck();
    }
  }, [hasAutoRun, isConfigured, isLoading, runHealthCheck]);

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Check</CardTitle>
          <CardDescription>
            Provide your Supabase project URL and anon API key to verify that this
            dashboard can reach your Supabase backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={checkConnection}>
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Supabase Project URL</Label>
              <Input
                id="supabase-url"
                name="supabase-url"
                type="url"
                placeholder="https://your-project.supabase.co"
                value={projectUrl}
                onChange={(event) => setProjectUrl(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supabase-key">Supabase anon key</Label>
              <Textarea
                id="supabase-key"
                name="supabase-key"
                placeholder="Paste your anon public API key"
                value={anonKey}
                onChange={(event) => setAnonKey(event.target.value)}
                required
                rows={3}
              />
            </div>
            <Button type="submit" disabled={isLoading || !isConfigured}>
              {isLoading ? "Checking..." : "Check connection"}
            </Button>
          </form>
          <div className="mt-6 space-y-4">
            {result && (
              <div className="rounded-lg border border-muted-foreground/20 bg-muted/50 p-4">
                <p className="text-sm font-semibold">
                  Status {result.status} {result.ok ? "(OK)" : "(Error)"}
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Endpoint:</span> {result.url}/auth/v1/health
                </p>
                <p className="mt-2 text-sm font-semibold">Response body:</p>
                <pre className="mt-1 whitespace-pre-wrap break-words rounded-md bg-background p-3 text-xs shadow-inner">
                  {result.message}
                </pre>
              </div>
            )}
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}
            {!isConfigured && (
              <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-800">
                Provide both the project URL and anon key to test the connection.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
