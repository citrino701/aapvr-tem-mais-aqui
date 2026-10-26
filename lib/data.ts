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
