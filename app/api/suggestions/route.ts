import { NextResponse } from "next/server";
import { getContentApiUrl } from "@/lib/cms";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    const body = await request.json();
    const suggestion = typeof body.suggestion === "string" ? body.suggestion.trim() : "";
    const rawWhatsapp = typeof body.whatsapp === "string" ? body.whatsapp : "";
    const whatsapp = normalizeWhatsapp(rawWhatsapp);
    const rawPage = typeof body.page === "string" ? body.page.trim() : "/";
    const page = rawPage === "/" ? "Página inicial" : rawPage;

    if (suggestion.length < 5 || suggestion.length > 2000) {
      return NextResponse.json({ ok: false, error: "Confira o texto da sugestão." }, { status: 400 });
    }

    if (!whatsapp) {
      return NextResponse.json({ ok: false, error: "Informe um WhatsApp válido com DDD." }, { status: 400 });
    }

    const response = await fetch(getContentApiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submitSuggestion",
        suggestion,
        whatsapp,
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

/** Devolve só os dígitos (DDD + número) ou "" se o número não for válido. */
function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  return digits.length === 10 || digits.length === 11 ? digits : "";
}
