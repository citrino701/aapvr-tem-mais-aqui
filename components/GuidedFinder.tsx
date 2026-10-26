"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Content, Service } from "@/lib/data";
import { serviceHref, slugify } from "@/lib/data";

type Need = { id: string; label: string; icon: string; categories: string[] };
const needs: Need[] = [
  { id: "consulta", label: "Marcar uma consulta", icon: "✚", categories: ["saude"] },
  { id: "odonto", label: "Cuidar da saúde bucal", icon: "◉", categories: ["odontologia"] },
  { id: "movimento", label: "Fazer fisioterapia ou atividade física", icon: "↗", categories: ["terapias-reabilitacao", "movimento"] },
  { id: "cursos", label: "Participar de cursos e oficinas", icon: "✳", categories: ["convivencia-aprendizado"] },
  { id: "lazer", label: "Encontrar lazer e convivência", icon: "⌂", categories: ["lazer", "convivencia-aprendizado"] },
  { id: "orientacao", label: "Buscar orientação social ou jurídica", icon: "◎", categories: ["orientacao-direitos"] },
  { id: "tudo", label: "Conhecer tudo que existe", icon: "＋", categories: [] },
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
          summary: `Consulta disponível na unidade ${unit.nome}.`,
          href: `/servicos/saude/${slugify(specialty)}`,
          access: "Confira o público, as condições e como solicitar o agendamento.",
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
        access: service.acesso || "Consulte as condições do serviço.",
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
      nome: content.units.find((unit) => unit.id === id)?.nome || (id === "sede-campestre" ? "Sede Campestre" : id),
    }));
    return units.length > 1 ? [{ id: "qualquer", nome: "Qualquer unidade" }, ...units] : units;
  }, [content, need]);

  function unitLabel(id: string) {
    return content.units.find((unit) => unit.id === id)?.nome || (id === "sede-campestre" ? "Sede Campestre" : id);
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
        <span className="finder-step">{started ? (need ? "2 de 2" : "1 de 2") : "COMECE AQUI"}</span>
        <span className="finder-kicker">BUSCA GUIADA</span>
      </div>

      {!started && <div className="finder-stage finder-cover" key="cover"><span className="finder-cover-icon" aria-hidden="true">＋</span><h2 id="finder-title">Encontre o serviço certo para você</h2><p>Responda a duas perguntas rápidas. A gente mostra as opções, unidades e os próximos passos.</p><button type="button" className="button finder-start" onClick={() => setStarted(true)}>Iniciar busca <span aria-hidden="true">→</span></button></div>}

      {started && !need && <div className="finder-stage" key="need">
        <h2 id="finder-title">O que você precisa hoje?</h2>
        <p>Escolha pelo que quer fazer. A gente ajuda a encontrar por onde começar.</p>
        <div className="finder-needs" role="list" aria-label="Escolha uma necessidade">
          {needs.map((item) => <button type="button" role="listitem" className="finder-need" key={item.id} onClick={() => chooseNeed(item.id)}>
            <span className="finder-need-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            <span className="finder-need-arrow" aria-hidden="true">→</span>
          </button>)}
        </div>
      </div>}

      {need && !unitId && <div className="finder-stage" key="unit">
        <button type="button" className="finder-back" onClick={reset}>← Voltar e trocar a resposta</button>
        <h2 id="finder-title">Onde você prefere ser atendido?</h2>
        <p>Você escolheu: <strong>{need.label.toLowerCase()}</strong></p>
        <div className="finder-units" role="group" aria-label="Escolha uma unidade">
          {unitOptions.map((unit) => <button type="button" className="finder-unit" key={unit.id} onClick={() => { setUnitId(unit.id); setShowResults(true); }}>
            {unit.nome}<span aria-hidden="true">→</span>
          </button>)}
        </div>
      </div>}

      {need && unitId && showResults && <div className="finder-stage finder-results" key="results">
        <button type="button" className="finder-back" onClick={() => { setUnitId(null); setShowResults(false); }}>← Trocar unidade</button>
        <div className="finder-result-heading">
          <span className="finder-result-check" aria-hidden="true">✓</span>
          <div><span className="finder-result-kicker">SUA BUSCA</span><h2 id="finder-title">{need.label}</h2></div>
        </div>
        <p className="finder-location">Disponível em: <strong>{unitId === "qualquer" ? "as unidades relacionadas à sua busca" : unitLabel(unitId)}</strong></p>
        <p className="finder-disclaimer">Quem pode utilizar e como acessar: consulte os critérios e confirme a disponibilidade de cada serviço.</p>
        {results.length > 0 ? <div className="finder-results-list">
          {results.map((result) => <article className="finder-result-card" key={`${result.href}-${result.title}`}>
            <div><h3>{result.title}</h3><p>{result.summary}</p><small>{result.access}</small></div>
            <Link href={result.href} className="finder-result-link">Ver detalhes <span aria-hidden="true">→</span></Link>
          </article>)}
        </div> : <div className="finder-empty">Não encontramos uma opção publicada para essa combinação. Tente “Qualquer unidade” ou fale com a equipe.</div>}
        <button type="button" className="finder-back finder-reset" onClick={reset}>Começar outra busca</button>
      </div>}
    </section>
  );
}
