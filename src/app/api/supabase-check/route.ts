import { NextResponse } from "next/server";

import {
  SupabaseHealthCheckInput,
  checkSupabaseHealth,
} from "@/lib/supabase/health";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SupabaseHealthCheckInput;

  const result = await checkSupabaseHealth(body);

  return NextResponse.json(result, {
    status: result.ok ? 200 : result.status,
  });
}

export async function GET() {
  const result = await checkSupabaseHealth();

  return NextResponse.json(result, {
    status: result.ok ? 200 : result.status,
  });
}
