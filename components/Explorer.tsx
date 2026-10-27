"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Content } from "@/lib/data";
import { slugify, serviceHref, contactHref, t } from "@/lib/data";
import TrackLink from "./TrackLink";
import { track } from "@/lib/analytics";

export default function Explorer({ content }: { content: Content }) {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const areas = content.categories;
  const specialties = useMemo(() => {
    const list = content.units.filter(u => !city || u.id===city).flatMap(u => u.especialidades);
    return Array.from(new Set(list)).sort((a,b) => a.localeCompare(b,"pt-BR"));
  }, [content.units, city]);
  const shown = specialties.filter(s => slugify(s).includes(slugify(query)));
  const serviceList = content.services.filter(s => s.categoria===category);
  const picked = serviceList.find(s => s.id===selected);
  const choose = (key: string) => { setCategory(key); setCity(""); setQuery(""); setSelected(""); track("interest_selected", {category:key}); };
  return <div className="container narrow page-space">
    <div className="eyebrow">{t(content,"explorer.eyebrow","ENCONTRAR UM SERVIÇO")}</div>
    <h1>{t(content,"explorar.titulo","O que você quer resolver agora?")}</h1><p className="lead">{t(content,"explorar.texto","Escolha uma opção. A gente mostra os caminhos disponíveis e o que você precisa confirmar.")}</p>
    {category && <button className="text-button" onClick={() => choose("")}>{t(content,"explorer.back","← Voltar às opções")}</button>}
    {!category ? <div className="explorer-choices">
      {areas.map(a => <button key={a.id} className="explorer-choice" onClick={() => choose(a.id)}><span className="emoji">{a.icone}</span><span><strong>{a.nome}</strong><small>{a.resumo}</small></span><span aria-hidden>→</span></button>)}
      <Link className="explorer-choice" href="/associacao"><span className="emoji">🤝</span><span><strong>{t(content,"explorer.association.title","Entender a associação")}</strong><small>{t(content,"explorer.association.text","Quem pode se associar e quais documentos são necessários.")}</small></span><span>→</span></Link>
      <Link className="explorer-choice" href="/associado"><span className="emoji">🪪</span><span><strong>{t(content,"explorer.member.title","Resolver algo como associado")}</strong><small>{t(content,"explorer.member.text","Boletos, consultas, cadastro ou Ouvidoria.")}</small></span><span>→</span></Link>
    </div> : <>
      <h2>{areas.find(a=>a.id===category)?.nome}</h2>
      {category==="saude" ? <div className="wizard-panel">
        <label htmlFor="cidade">{t(content,"explorer.city.title","Em qual cidade você quer atendimento?")}</label>
        <select id="cidade" value={city} onChange={e=>{setCity(e.target.value);track("city_selected",{unit_id:e.target.value || "todas"});}}>
          <option value="">{t(content,"explorer.city.all","Ainda não sei / todas as unidades")}</option>{content.units.map(u=><option value={u.id} key={u.id}>{u.cidade}</option>)}
        </select>
        <label htmlFor="busca">{t(content,"explorer.specialty.title","Qual especialidade você procura?")}</label>
        <input id="busca" placeholder={t(content,"explorer.specialty.placeholder","Ex.: cardiologia")} value={query} onChange={e=>{setQuery(e.target.value);}} />
        <p className="muted">{t(content,"explorer.specialty.note","A disponibilidade depende da agenda atual. Escolha uma especialidade para ver as unidades.")}</p>
        {shown.length ? <div className="choice-list">{shown.map(s=><TrackLink key={s} event="service_search" params={{service_id:slugify(s),unit_id:city||"todas"}} href={`/servicos/saude/${slugify(s)}`} className="result-link">{s} <span>{t(content,"explorer.specialty.results_cta","Ver unidades")} →</span></TrackLink>)}</div> : <div className="empty-state"><strong>{t(content,"explorer.specialty.empty","Esta especialidade não aparece na unidade escolhida.")}</strong><p>{t(content,"explorer.specialty.alternative","Tente outra unidade ou fale com a Central para confirmar alternativas.")}</p><button className="button secondary" onClick={()=>setCity("")}>{t(content,"explorer.other_units","Ver outras unidades")}</button> <Link href={contactHref("callcenter")} className="button">{t(content,"explorer.call_center","Falar com a Central")}</Link></div>}
      </div> : <div className="wizard-panel">
        <label htmlFor="servico">{t(content,"explorer.service.question","O que você procura?")}</label>
        <select id="servico" value={selected} onChange={e=>{setSelected(e.target.value);track("service_search",{service_id:e.target.value});}}>
          <option value="">{t(content,"explorer.service.choose","Escolha um serviço")}</option>{serviceList.map(s=><option value={s.id} key={s.id}>{s.nome}</option>)}
        </select>
        {picked ? <div className="result-detail"><h3>{picked.nome}</h3><p>{picked.resumo}</p><div className="pills"><span>{picked.acesso}</span><span>{picked.status}</span></div><p><strong>{t(content,"explorer.requirements","Requisitos:")}</strong> {picked.requisitos}</p><TrackLink href={serviceHref(picked)} event="service_view" params={{service_id:picked.id}} className="button">{t(content,"explorer.service.cta","Ver detalhes e como participar")} →</TrackLink></div> : <p className="muted">{t(content,"explorer.select_prompt","Selecione uma opção para ver público, requisitos e contato.")}</p>}
        <Link href={`/servicos/${category}`} className="subtle-link">{t(content,"explorer.all_services","Ver todos os serviços da área")} →</Link>
      </div>}
    </>}
  </div>;
}
