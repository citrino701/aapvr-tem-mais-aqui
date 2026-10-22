"use client";
import { useState } from "react";
import type { Contact } from "@/lib/data";
import { track } from "@/lib/analytics";

const label: Record<string,string> = {
  callcenter:"Consulta médica e agendamento",odonto:"Odontologia",cpsi:"Terapias e atividades físicas",'assistencia-social':"Oficinas e Assistência Social",sede:"Sede Campestre",juridico:"Jurídico",previdenciario:"Previdenciário",secretaria:"Cadastro, carteira e boleto",ouvidoria:"Reclamação, elogio ou sugestão",comercial:"Associação e condições comerciais",relacionamento:"Relacionamento"
};
const aliases: Record<string,string> = {consulta:"callcenter",associacao:"comercial",'condicoes-comerciais':"comercial",financeiro:"secretaria",cancelamento:"relacionamento"};
const digits = (s:string) => s.replace(/\D/g,"");
export default function ContactChooser({ contacts, initial, service, specialty, unit }: {
  contacts: Contact[]; initial: string; service: string; specialty: string; unit: string;
}) {
  const [current,setCurrent] = useState(aliases[initial] || initial || "");
  const selection = contacts.find(c=>c.id===current);
  const message = specialty ? `Olá. Vim pelo hub TEM MAIS AQUI e quero saber como solicitar uma consulta de ${specialty}${unit ? ` na unidade ${unit}` : ""}.` :
    service ? `Olá. Vim pelo hub TEM MAIS AQUI e quero saber os requisitos e a disponibilidade para ${service}.` :
    current==="comercial" ? 'Olá. Conheci a AAPVR pelo hub TEM MAIS AQUI e quero entender as categorias, as condições de adesão e como funciona a associação.' :
    `Olá. Vim pelo hub TEM MAIS AQUI e gostaria de informações sobre ${label[current]?.toLowerCase() || "um serviço"}.`;
  const whats = selection?.whatsapp ? `https://wa.me/55${digits(selection.whatsapp)}?text=${encodeURIComponent(message)}` : "";
  return <div className="wizard-panel">
    <label htmlFor="assunto">Sobre qual assunto você quer falar?</label>
    <select id="assunto" value={current} onChange={e=>{setCurrent(e.target.value);track("contact_department_selected",{department:e.target.value});}}>
      <option value="">Escolha o assunto</option>
      {contacts.map(c=><option key={c.id} value={c.id}>{label[c.id] || c.nome}</option>)}
    </select>
    {current && !selection && <p className="notice">Este contato ainda precisa ser confirmado pela AAPVR. Consulte a Central antes de encaminhar a demanda.</p>}
    {selection && <div className="result-detail">
      <h2>{selection.nome}</h2>
      {selection.telefone && <p><strong>Telefone:</strong> {selection.telefone}</p>}
      {selection.whatsapp && <p><strong>WhatsApp:</strong> {selection.whatsapp}</p>}
      {selection.observacao && <p className="muted">{selection.observacao}</p>}
      <div className="button-row">
        {selection.telefone && <a className="button secondary" href={`tel:+55${digits(selection.telefone)}`} onClick={()=>track("contact_department_selected",{department:current,channel:"phone"})}>Ligar para o setor ↗</a>}
        {whats && <a className="button" href={whats} target="_blank" rel="noopener noreferrer" onClick={()=>track("whatsapp_click",{department:current,service_id:service})}>Abrir WhatsApp ↗</a>}
      </div>
      {whats && <p className="muted">A mensagem já vem preenchida. Você poderá revisar antes de enviar.</p>}
    </div>}
  </div>;
}
