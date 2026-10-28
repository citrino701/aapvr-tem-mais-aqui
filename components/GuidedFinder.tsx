"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Content, Service } from "@/lib/data";
import { serviceHref, slugify, t } from "@/lib/data";

type Need = { id: string; label: string; labelKey: string; icon: string; categories: string[] };
const needs: Need[] = [
  { id: "consulta", label: "Marcar uma consulta", labelKey:"finder.need.consulta", icon: "✚", categories: ["saude"] },
  { id: "odonto", label: "Cuidar da saúde bucal", labelKey:"finder.need.odonto", icon: "◉", categories: ["odontologia"] },
  { id: "movimento", label: "Fazer fisioterapia ou atividade física", labelKey:"finder.need.movimento", icon: "↗", categories: ["terapias-reabilitacao", "movimento"] },
  { id: "cursos", label: "Participar de cursos e oficinas", labelKey:"finder.need.cursos", icon: "✳", categories: ["convivencia-aprendizado"] },
  { id: "lazer", label: "Encontrar lazer e convivência", labelKey:"finder.need.lazer", icon: "⌂", categories: ["lazer", "convivencia-aprendizado"] },
  { id: "orientacao", label: "Buscar orientação social ou jurídica", labelKey:"finder.need.orientacao", icon: "◎", categories: ["orientacao-direitos"] },
  { id: "tudo", label: "Conhecer tudo que existe", labelKey:"finder.need.tudo", icon: "＋", categories: [] },
];

type ResultItem = { title: string; summary: string; href: string; access: string; units: string[] };

function serviceUnits(service: Service) {
  return (service.unidades || "").split("|").map((unit) => unit.trim()).filter(Boolean);
}

export default function GuidedFinder({ content }: { content: Content }) {
  const [needId, setNeedId] = useState<string | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);
  const need = needs.find((item) => item.id === needId);
  const needLabel = need ? t(content, need.labelKey, need.label) : "";

  const results = useMemo(() => {
    if (!need || !unitId) return [] as ResultItem[];
    const selectedCategories = need.categories.length
      ? need.categories
      : content.categories.map((category) => category.id);
    const matches: ResultItem[] = [];

    if (selectedCategories.includes("saude")) {
      content.units
        .filter((unit) => unitId === "qualquer" || unit.id === unitId)
        .forEach((unit) => unit.especialidades.forEach((specialty) => matches.push({
          title: specialty,
          summary: t(content,"finder.summary.consultation","Consulta disponível na unidade {unidade}.").replace("{unidade}",unit.nome),
          href: `/servicos/saude/${slugify(specialty)}`,
          access: t(content,"finder.access.default","Confira o público, as condições e como solicitar o agendamento."),
          units: [unit.id],
        })));
    }

    content.services
      .filter((service) => selectedCategories.includes(service.categoria))
      .filter((service) => unitId === "qualquer" || serviceUnits(service).includes(unitId))
      .forEach((service) => matches.push({
        title: service.nome,
        summary: service.resumo,
        href: serviceHref(service),
        access: service.acesso || t(content,"finder.access.service_default","Consulte as condições do serviço."),
        units: serviceUnits(service),
      }));

    return matches;
  }, [content, need, needId, unitId]);

  const unitOptions = useMemo(() => {
    if (!need) return [];
    const categories = need.categories.length ? need.categories : content.categories.map((category) => category.id);
    const relatedIds = new Set<string>();
    if (categories.includes("saude")) content.units.forEach((unit) => relatedIds.add(unit.id));
    content.services
      .filter((service) => categories.includes(service.categoria))
      .forEach((service) => serviceUnits(service).forEach((id) => relatedIds.add(id)));
    const units = [...relatedIds].map((id) => ({
      id,
      nome: content.units.find((unit) => unit.id === id)?.nome || (id === "sede-campestre" ? t(content,"finder.units.campestre","Sede Campestre") : id),
    }));
    return units.length > 1 ? [{ id: "qualquer", nome: t(content,"finder.units.any","Qualquer unidade") }, ...units] : units;
  }, [content, need]);

  function unitLabel(id: string) {
    return content.units.find((unit) => unit.id === id)?.nome || (id === "sede-campestre" ? t(content,"finder.units.campestre","Sede Campestre") : id);
  }

  function chooseNeed(id: string) {
    setNeedId(id);
    setUnitId(null);
    setShowResults(false);
    setStarted(true);
  }

  function reset() {
    setNeedId(null);
    setUnitId(null);
    setShowResults(false);
    setStarted(false);
  }

  return (
    <section className="guided-finder" aria-labelledby="finder-title">
      <div className="finder-topline">
        <span className="finder-step">{started ? (need ? t(content,"finder.step.two","2 de 2") : t(content,"finder.step.one","1 de 2")) : t(content,"finder.step.cover","COMECE AQUI")}</span>
        <span className="finder-kicker">{t(content,"finder.kicker","BUSCA GUIADA")}</span>
      </div>

      {!started && <div className="finder-stage finder-cover" key="cover"><h2 id="finder-title">{t(content,"finder.cover.title","Encontre o serviço certo para você")}</h2><p>{t(content,"finder.cover.text","Responda a duas perguntas rápidas. A gente mostra as opções, unidades e os próximos passos.")}</p><button type="button" className="button finder-start" onClick={() => setStarted(true)}>{t(content,"finder.cover.start","Iniciar busca")} <span aria-hidden="true">→</span></button></div>}

      {started && !need && <div className="finder-stage" key="need">
        <h2 id="finder-title">{t(content,"finder.need.title","O que você precisa hoje?")}</h2>
        <p>{t(content,"finder.need.text","Escolha pelo que quer fazer. A gente ajuda a encontrar por onde começar.")}</p>
        <div className="finder-needs" role="list" aria-label={t(content,"finder.aria.need","Escolha uma necessidade")}>
          {needs.map((item) => <button type="button" role="listitem" className="finder-need" key={item.id} onClick={() => chooseNeed(item.id)}>
            <span className="finder-need-icon" aria-hidden="true">{item.icon}</span>
            <span>{t(content,item.labelKey,item.label)}</span>
            <span className="finder-need-arrow" aria-hidden="true">→</span>
          </button>)}
        </div>
      </div>}

      {need && !unitId && <div className="finder-stage" key="unit">
        <button type="button" className="finder-back" onClick={reset}>{t(content,"finder.back.need","← Voltar e trocar a resposta")}</button>
        <h2 id="finder-title">{t(content,"finder.unit.title","Onde você prefere ser atendido?")}</h2>
        <p>{t(content,"finder.choice.label","Você escolheu:")} <strong>{needLabel.toLowerCase()}</strong></p>
        {unitOptions.length > 0 ? <div className="finder-units" role="group" aria-label={t(content,"finder.aria.unit","Escolha uma unidade")}>
          {unitOptions.map((unit) => <button type="button" className="finder-unit" key={unit.id} onClick={() => { setUnitId(unit.id); setShowResults(true); }}>
            {unit.nome}<span aria-hidden="true">→</span>
          </button>)}
        </div> : <div className="finder-empty"><p>{t(content,"finder.units.empty","Ainda não há unidades relacionadas a essa opção.")}</p><Link className="button secondary" href="/contato?assunto=callcenter">{t(content,"finder.empty.contact","Falar com a equipe")} →</Link></div>}
      </div>}

      {need && unitId && showResults && <div className="finder-stage finder-results" key="results">
        <button type="button" className="finder-back" onClick={() => { setUnitId(null); setShowResults(false); }}>{t(content,"finder.back.unit","Trocar unidade")}</button>
        <div className="finder-result-heading">
          <span className="finder-result-check" aria-hidden="true">✓</span>
          <div><span className="finder-result-kicker">{t(content,"finder.result.kicker","SUA BUSCA")}</span><h2 id="finder-title">{needLabel}</h2></div>
        </div>
        <p className="finder-location">{t(content,"finder.result.available","Disponível em:")} <strong>{unitId === "qualquer" ? t(content,"finder.location.any","as unidades relacionadas à sua busca") : unitLabel(unitId)}</strong></p>
        <p className="finder-disclaimer">{t(content,"finder.result.criteria","Quem pode utilizar e como acessar: consulte os critérios e confirme a disponibilidade de cada serviço.")}</p>
        {results.length > 0 ? <div className="finder-results-list">
          {results.map((result) => <article className="finder-result-card" key={`${result.href}-${result.title}`}>
            <div><h3>{result.title}</h3><p>{result.summary}</p><small>{result.access}</small></div>
            <Link href={result.href} className="finder-result-link">{t(content,"finder.result.details","Ver detalhes")} <span aria-hidden="true">→</span></Link>
          </article>)}
        </div> : <div className="finder-empty"><p>{t(content,"finder.empty","Não encontramos uma opção publicada para essa combinação. Tente “Qualquer unidade” ou fale com a equipe.")}</p><div className="button-row"><Link className="button" href="/contato?assunto=callcenter">{t(content,"finder.empty.contact","Falar com a equipe")} →</Link><Link className="button secondary" href="/servicos">{t(content,"home.search.services_cta","Explorar serviços")} →</Link></div></div>}
        <button type="button" className="finder-back finder-reset" onClick={reset}>{t(content,"finder.reset","Começar outra busca")}</button>
      </div>}
    </section>
  );
}
