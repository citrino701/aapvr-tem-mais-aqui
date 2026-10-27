"use client";
import { useState } from "react";
import type { Content } from "@/lib/data";
import { t } from "@/lib/data";
import { track } from "@/lib/analytics";

const aliases: Record<string,string> = {consulta:"callcenter",associacao:"comercial",'condicoes-comerciais':"comercial",financeiro:"secretaria",cancelamento:"relacionamento"};
const digits = (s:string) => s.replace(/\D/g,"");
export default function ContactChooser({ content, initial, service, specialty, unit }: {
  content: Content; initial: string; service: string; specialty: string; unit: string;
}) {
  const contacts=content.contacts;
  const [current,setCurrent] = useState(aliases[initial] || initial || "");
  const selection = contacts.find(c=>c.id===current);
  const fill=(template:string,values:Record<string,string>)=>Object.entries(values).reduce((text,[key,value])=>text.replaceAll(`{${key}}`,value),template);
  const message = specialty ? fill(t(content,"contact.message.consultation","Olá. Vim pelo hub TEM MAIS AQUI e quero saber como solicitar uma consulta de {especialidade}{unidade}."),{
      especialidade:specialty,
      unidade:unit ? fill(t(content,"contact.message.consultation_unit"," na unidade {unidade}"),{unidade:content.units.find((item)=>item.id===unit)?.nome||unit}) : "",
    }) :
    service ? fill(t(content,"contact.message.service","Olá. Vim pelo hub TEM MAIS AQUI e quero saber os requisitos e a disponibilidade para {servico}."),{servico:service}) :
    current==="comercial" ? t(content,"contact.message.commercial","Olá. Conheci a AAPVR pelo hub TEM MAIS AQUI e quero entender as categorias, as condições de adesão e como funciona a associação.") :
    fill(t(content,"contact.message.default","Olá. Vim pelo hub TEM MAIS AQUI e gostaria de informações sobre {assunto}."),{assunto:selection?.nome.toLowerCase()||"um serviço"});
  const whats = selection?.whatsapp ? `https://wa.me/55${digits(selection.whatsapp)}?text=${encodeURIComponent(message)}` : "";
  return <div className="wizard-panel">
    <label htmlFor="assunto">{t(content,"contact.chooser.title","Sobre qual assunto você quer falar?")}</label>
    <select id="assunto" value={current} onChange={e=>{setCurrent(e.target.value);track("contact_department_selected",{department:e.target.value});}}>
      <option value="">{t(content,"contact.chooser.placeholder","Escolha o assunto")}</option>
      {contacts.map(c=><option key={c.id} value={c.id}>{c.nome}</option>)}
    </select>
    {current && !selection && <p className="notice">{t(content,"contact.chooser.warning","Este contato ainda precisa ser confirmado pela AAPVR. Consulte a Central antes de encaminhar a demanda.")}</p>}
    {selection && <div className="result-detail">
      <h2>{selection.nome}</h2>
      {selection.telefone && <p><strong>{t(content,"contact.chooser.phone_label","Telefone:")}</strong> {selection.telefone}</p>}
      {selection.whatsapp && <p><strong>{t(content,"contact.chooser.whatsapp_label","WhatsApp:")}</strong> {selection.whatsapp}</p>}
      {selection.observacao && <p className="muted">{selection.observacao}</p>}
      <div className="button-row">
        {selection.telefone && <a className="button secondary" href={`tel:+55${digits(selection.telefone)}`} onClick={()=>track("contact_department_selected",{department:current,channel:"phone"})}>{t(content,"contact.chooser.call_cta","Ligar para o setor")} ↗</a>}
        {whats && <a className="button" href={whats} target="_blank" rel="noopener noreferrer" onClick={()=>track("whatsapp_click",{department:current,service_id:service})}>{t(content,"contact.chooser.whatsapp_cta","Abrir WhatsApp")} ↗</a>}
      </div>
      {whats && <p className="muted">{t(content,"contact.chooser.prefill_note","A mensagem já vem preenchida. Você poderá revisar antes de enviar.")}</p>}
    </div>}
  </div>;
}
