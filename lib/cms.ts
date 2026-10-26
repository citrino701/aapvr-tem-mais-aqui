import "server-only";
import { after } from "next/server";
import seed from "./seed.json";
import type { Content } from "./data";

const defaultContent = seed as Omit<Content, "cmsOnline">;
const fallbackContent: Content = { ...defaultContent, cmsOnline: false };
const CACHE_MS = 120_000;
const RETRY_MS = 30_000;
const REQUEST_TIMEOUT_MS = 8_000;

let cached: { url: string; content: Content; validUntil: number } | undefined;
let pending: { url: string; promise: Promise<Content> } | undefined;

function refresh(url: string): Promise<Content> {
  if (pending?.url === url) return pending.promise;

  const promise = (async () => {
    try {
      const response = await fetch(url, {
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`CMS retornou ${response.status}`);
      const remote: Partial<Content> = await response.json();
      if (!remote.texts || !Array.isArray(remote.services) || !Array.isArray(remote.units) ||
          !Array.isArray(remote.contacts) || !Array.isArray(remote.categories) ||
          !Array.isArray(remote.faqs)) {
        throw new Error("Formato inesperado do CMS");
      }
      const content: Content = {
        texts: { ...defaultContent.texts, ...remote.texts },
        categories: remote.categories,
        services: remote.services,
        units: remote.units,
        contacts: remote.contacts,
        faqs: remote.faqs,
        cmsOnline: true,
      };
      cached = { url, content, validUntil: Date.now() + CACHE_MS };
      return content;
    } catch (err) {
      console.error("Falha na leitura do CMS. Usando ultimo conteudo valido.", err);
      if (cached?.url === url) {
        cached.validUntil = Date.now() + RETRY_MS;
        return cached.content;
      }
      cached = { url, content: fallbackContent, validUntil: Date.now() + RETRY_MS };
      return fallbackContent;
    }
  })();
  pending = { url, promise };
  void promise.finally(() => {
    if (pending?.promise === promise) pending = undefined;
  });
  return promise;
}

/**
 * Uma resposta valida serve as proximas paginas do mesmo Worker. Ao vencer o prazo,
 * devolvemos os dados existentes e atualizamos em segundo plano.
 */
export async function getContent(): Promise<Content> {
  const url = process.env.GOOGLE_CONTENT_API_URL ||
    "https://script.google.com/macros/s/AKfycbx9z-CERsSUJgYiPjMZCwCWIenaUIpVeDbmZ_dUc98j2zASt0QSCha-i_9Xy0vaNbet8Q/exec";
  if (cached?.url === url) {
    if (Date.now() >= cached.validUntil) {
      const promise = refresh(url);
      after(() => promise);
    }
    return cached.content;
  }
  return refresh(url);
}
