import { NextResponse } from "next/server";
import { getContentApiUrl } from "@/lib/cms";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    const body = await request.json();
    const suggestion = typeof body.suggestion === "string" ? body.suggestion.trim() : "";
    const page = typeof body.page === "string" ? body.page.trim() : "/";

    if (suggestion.length < 5 || suggestion.length > 2000) {
      return NextResponse.json({ ok: false, error: "Confira o texto da sugestão." }, { status: 400 });
    }

    const response = await fetch(getContentApiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitSuggestion",
        suggestion,
        page: page.slice(0, 500),
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result || result.ok !== true) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
