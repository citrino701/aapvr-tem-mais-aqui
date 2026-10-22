import seed from "./seed.json";

export type Category = { id: string; nome: string; resumo: string; icone: string };
export type Service = {
  id: string; categoria: string; nome: string; resumo: string;
  publico: string; idade: string; acesso: string; requisitos: string;
  unidades: string; status: string; canal: string;
};
export type Unit = { id: string; nome: string; cidade: string; endereco: string; horario: string; especialidades: string[] };
export type Contact = { id: string; nome: string; telefone: string; whatsapp: string; observacao: string };
export type FAQ = { id: string; pergunta: string; resposta: string };
export type Content = {
  texts: Record<string,string>;
  categories: Category[];
  services: Service[];
  units: Unit[];
  contacts: Contact[];
  faqs: FAQ[];
  cmsOnline: boolean;
};
const defaultContent = seed as Omit<Content,"cmsOnline">;

/**
 * Somente LEITURA via endpoint de Apps Script. Acesso de escrita fica no Google Sheets.
 * A revalidacao de 120 segundos depende do cache configurado na hospedagem.
 */
export async function getContent(): Promise<Content> {
  const url = process.env.GOOGLE_CONTENT_API_URL ||
    "https://script.google.com/macros/s/AKfycbx9z-CERsSUJgYiPjMZCwCWIenaUIpVeDbmZ_dUc98j2zASt0QSCha-i_9Xy0vaNbet8Q/exec";
  try {
    const response = await fetch(url, { next: { revalidate: 120 } });
    if (!response.ok) throw new Error(`CMS retornou ${response.status}`);
    const remote: Partial<Content> = await response.json();
    if (!remote.texts || !Array.isArray(remote.services) || !Array.isArray(remote.units) ||
        !Array.isArray(remote.contacts) || !Array.isArray(remote.categories) ||
        !Array.isArray(remote.faqs)) {
      throw new Error("Formato inesperado do CMS");
    }
    return {
      texts: { ...defaultContent.texts, ...remote.texts },
      categories: remote.categories,
      services: remote.services,
      units: remote.units,
      contacts: remote.contacts,
      faqs: remote.faqs,
      cmsOnline: true,
    };
  } catch (err) {
    console.error("Falha na leitura do CMS. Usando conteudo de demonstracao.", err);
    return { ...defaultContent, cmsOnline: false };
  }
}
export function t(c: Content, key: string, fallback = ""): string {
  return c.texts[key] || fallback;
}
export function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function serviceHref(s: Service) { return `/servicos/${s.categoria}/${s.id}`; }
export function contactHref(id: string, service?: string) {
  const p = new URLSearchParams({ assunto: id });
  if (service) p.set("servico", service);
  return `/contato?${p.toString()}`;
}
