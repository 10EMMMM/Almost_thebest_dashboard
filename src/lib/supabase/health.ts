export interface SupabaseHealthCheckInput {
  url?: string;
  apiKey?: string;
}

export interface SupabaseHealthCheckResult {
  ok: boolean;
  status: number;
  message: string;
  url: string;
}

const DEFAULT_HEALTH_PATH = "/auth/v1/health";

interface NormalizedError {
  message: string;
  status: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractNodeError(value: unknown): { code?: string; message?: string } | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.code === "string" || typeof value.message === "string") {
    return {
      code: typeof value.code === "string" ? value.code : undefined,
      message: typeof value.message === "string" ? value.message : undefined,
    };
  }

  if (Array.isArray(value.errors)) {
    for (const error of value.errors) {
      const result = extractNodeError(error);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

function normalizeNetworkError(error: unknown): NormalizedError {
  if (error instanceof Error) {
    const nodeError =
      extractNodeError(isRecord(error) ? error : null) ??
      extractNodeError(
        isRecord((error as { cause?: unknown }).cause)
          ? ((error as { cause?: unknown }).cause as unknown)
          : undefined
      );

    if (nodeError?.code === "ENETUNREACH") {
      return {
        message:
          "Network unreachable while trying to reach Supabase. Ensure your environment allows outbound HTTPS connections.",
        status: 503,
      };
    }

    if (nodeError?.code === "ECONNREFUSED") {
      return {
        message:
          "Supabase refused the connection. Double-check the project URL and confirm the service is online.",
        status: 503,
      };
    }

    if (nodeError?.message) {
      return {
        message: nodeError.message,
        status: 500,
      };
    }

    if (error.message) {
      return {
        message: error.message,
        status: 500,
      };
    }
  }

  return {
    message: "Unknown error",
    status: 500,
  };
}

export async function checkSupabaseHealth({
  url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}: SupabaseHealthCheckInput = {}): Promise<SupabaseHealthCheckResult> {
  if (!url) {
    return {
      ok: false,
      status: 400,
      message:
        "Missing Supabase project URL. Provide it in the form or set NEXT_PUBLIC_SUPABASE_URL.",
      url: "",
    };
  }

  if (!apiKey) {
    return {
      ok: false,
      status: 400,
      message:
        "Missing Supabase anon key. Provide it in the form or set NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      url,
    };
  }

  const endpoint = new URL(DEFAULT_HEALTH_PATH, url).toString();

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: apiKey,
        authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    let message: string;

    if (contentType.includes("application/json")) {
      const json = await response.json();
      message = JSON.stringify(json);
    } else {
      message = await response.text();
    }

    return {
      ok: response.ok,
      status: response.status,
      message,
      url,
    };
  } catch (error) {
    const normalized = normalizeNetworkError(error);

    return {
      ok: false,
      status: normalized.status,
      message: normalized.message,
      url,
    };
  }
}
