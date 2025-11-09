# Firebase Studio

This is a Next.js project.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Supabase connectivity check

This project is preconfigured to talk to the Supabase project at `https://qembpneerjztsnmkbqeq.supabase.co` using the provided anon key. Copy `.env.example` to `.env.local` so the credentials are available to both the server and the client:

```bash
cp .env.example .env.local
```

With the environment variables in place, start the development server (`npm run dev`) and visit [`http://localhost:9002/supabase-check`](http://localhost:9002/supabase-check). The page automatically runs a health check using your configured project URL and anon key and will surface any connectivity or configuration issues.

If you simply need to test the connection from a terminal, you can call the same health endpoint directly:

```bash
curl -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
     -H "authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
     "$NEXT_PUBLIC_SUPABASE_URL/auth/v1/health"
```

Some restricted environments (including this one) block outbound HTTPS requests, which will cause the command above to fail with status code `000`. Run the curl command locally to validate the credentials end-to-end if you encounter that limitation.