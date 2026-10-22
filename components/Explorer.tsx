"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Content } from "@/lib/data";
import { slugify, serviceHref, contactHref } from "@/lib/data";
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
    <div className="eyebrow">ENCONTRAR UM SERVIÇO</div>
    <h1>O que você quer resolver agora?</h1><p className="lead">Escolha uma opção. A gente mostra os caminhos disponíveis e o que você precisa confirmar.</p>
    {category && <button className="text-button" onClick={() => choose("")}>← Voltar às opções</button>}
    {!category ? <div className="explorer-choices">
      {areas.map(a => <button key={a.id} className="explorer-choice" onClick={() => choose(a.id)}><span className="emoji">{a.icone}</span><span><strong>{a.nome}</strong><small>{a.resumo}</small></span><span aria-hidden>→</span></button>)}
      <Link className="explorer-choice" href="/associacao"><span className="emoji">🤝</span><span><strong>Entender a associação</strong><small>Quem pode se associar e quais documentos são necessários.</small></span><span>→</span></Link>
      <Link className="explorer-choice" href="/associado"><span className="emoji">🪪</span><span><strong>Resolver algo como associado</strong><small>Boletos, consultas, cadastro ou Ouvidoria.</small></span><span>→</span></Link>
    </div> : <>
      <h2>{areas.find(a=>a.id===category)?.nome}</h2>
      {category==="saude" ? <div className="wizard-panel">
        <label htmlFor="cidade">Em qual cidade você quer atendimento?</label>
        <select id="cidade" value={city} onChange={e=>{setCity(e.target.value);track("city_selected",{unit_id:e.target.value || "todas"});}}>
          <option value="">Ainda não sei / todas as unidades</option>{content.units.map(u=><option value={u.id} key={u.id}>{u.cidade}</option>)}
        </select>
        <label htmlFor="busca">Qual especialidade você procura?</label>
        <input id="busca" placeholder="Ex.: cardiologia" value={query} onChange={e=>{setQuery(e.target.value);}} />
        <p className="muted">A disponibilidade depende da agenda atual. Escolha uma especialidade para ver as unidades.</p>
        {shown.length ? <div className="choice-list">{shown.map(s=><TrackLink key={s} event="service_search" params={{service_id:slugify(s),unit_id:city||"todas"}} href={`/servicos/saude/${slugify(s)}`} className="result-link">{s} <span>Ver unidades →</span></TrackLink>)}</div> : <div className="empty-state"><strong>Esta especialidade não aparece na unidade escolhida.</strong><p>Tente outra unidade ou fale com a Central para confirmar alternativas.</p><button className="button secondary" onClick={()=>setCity("")}>Ver outras unidades</button> <Link href={contactHref("callcenter")} className="button">Falar com a Central</Link></div>}
      </div> : <div className="wizard-panel">
        <label htmlFor="servico">O que você procura?</label>
        <select id="servico" value={selected} onChange={e=>{setSelected(e.target.value);track("service_search",{service_id:e.target.value});}}>
          <option value="">Escolha um serviço</option>{serviceList.map(s=><option value={s.id} key={s.id}>{s.nome}</option>)}
        </select>
        {picked ? <div className="result-detail"><h3>{picked.nome}</h3><p>{picked.resumo}</p><div className="pills"><span>{picked.acesso}</span><span>{picked.status}</span></div><p><strong>Requisitos:</strong> {picked.requisitos}</p><TrackLink href={serviceHref(picked)} event="service_view" params={{service_id:picked.id}} className="button">Ver detalhes e como participar →</TrackLink></div> : <p className="muted">Selecione uma opção para ver público, requisitos e contato.</p>}
        <Link href={`/servicos/${category}`} className="subtle-link">Ver todos os serviços da área →</Link>
      </div>}
    </>}
  </div>;
}
