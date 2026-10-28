"use client";
import { useState } from "react";
import type { Content } from "@/lib/data";
import { t } from "@/lib/data";
import { track } from "@/lib/analytics";

const aliases: Record<string,string> = {consulta:"callcenter",associacao:"comercial",'condicoes-comerciais':"comercial",financeiro:"secretaria",cancelamento:"ouvidoria",relacionamento:"ouvidoria"};
const digits = (s:string) => s.replace(/\D/g,"");
export default function ContactChooser({ content, initial, service, specialty, unit }: {
  content: Content; initial: string; service: string; specialty: string; unit: string;
}) {
  const contacts=content.contacts;
  const [current,setCurrent] = useState(aliases[initial] || initial || "");
  const selection = contacts.find(c=>c.id===current);
  const general = contacts.find(c=>c.id==="callcenter") || contacts.find(c=>c.telefone || c.whatsapp);
  const phone = selection?.telefone || general?.telefone || "";
  const whatsapp = selection?.whatsapp || general?.whatsapp || "";
  const whats = whatsapp ? `https://wa.me/55${digits(whatsapp)}` : "";
  const phoneHours = selection?.observacao || t(content,"contact.phone_hours","Atendimento telefônico: segunda a sexta, das 08h às 14h.");
  return <div className="wizard-panel">
    <label htmlFor="assunto">{t(content,"contact.chooser.title","Sobre qual assunto você quer falar?")}</label>
    <select id="assunto" value={current} onChange={e=>{setCurrent(e.target.value);track("contact_department_selected",{department:e.target.value});}}>
      <option value="">{t(content,"contact.chooser.placeholder","Escolha o assunto")}</option>
      {contacts.map(c=><option key={c.id} value={c.id}>{c.nome}</option>)}
    </select>
    {(selection || general) && <div className="result-detail">
      <h2>{selection?.nome || t(content,"contact.general.title","Atendimento geral da AAPVR")}</h2>
      <p>{t(content,"contact.general.forwarding","A equipe encaminhará sua solicitação ao setor responsável.")}</p>
      {phone && <p><strong>{t(content,"contact.chooser.phone_label","Telefone:")}</strong> {phone}</p>}
      {whatsapp && <p><strong>{t(content,"contact.chooser.whatsapp_label","WhatsApp:")}</strong> {whatsapp}</p>}
      {phone && <p className="muted">{phoneHours}</p>}
      <div className="button-row">
        {phone && <a className="button secondary" href={`tel:+55${digits(phone)}`} onClick={()=>track("contact_department_selected",{department:selection?.id || "callcenter",channel:"phone"})}>{t(content,"contact.chooser.call_cta","Ligar para a Central")} ↗</a>}
        {whats && <a className="button" href={whats} target="_blank" rel="noopener noreferrer" onClick={()=>track("whatsapp_click",{department:selection?.id || "callcenter",service_id:service})}>{t(content,"contact.chooser.whatsapp_cta","Abrir WhatsApp")} ↗</a>}
      </div>
      {whats && <details className="contact-whatsapp-options">
        <summary>{t(content,"contact.chooser.whatsapp_options_label","Ver opções do WhatsApp geral")}</summary>
        <p style={{ whiteSpace: "pre-line" }}>{t(content,"contact.chooser.whatsapp_options","No WhatsApp geral, escolha a opção correspondente ao seu assunto:\n1. Boleto, PIX e comprovante\n2. Centro Odontológico\n3. Call Center\n4. Jurídico\n5. Ouvidoria\n6. Unidade Barra do Piraí\n7. Financeiro e negociação de débitos")}</p>
      </details>}
    </div>}
    {!selection && !general && <div className="notice">{t(content,"contact.chooser.warning","Os canais de contato estão indisponíveis no momento.")} <a href="/servicos">{t(content,"home.search.services_cta","Explorar serviços")} →</a> · <a href="/">{t(content,"footer.home_link","Voltar ao início")} →</a></div>}
  </div>;
}
