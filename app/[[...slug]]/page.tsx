import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t, slugify, serviceHref, contactHref, type Content, type Service, type Unit } from "@/lib/data";
import { getContent } from "@/lib/cms";
import Explorer from "@/components/Explorer";
import ContactChooser from "@/components/ContactChooser";
import TrackLink from "@/components/TrackLink";
import GuidedFinder from "@/components/GuidedFinder";
import Image from "next/image";

type PageArgs = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const first = (p:Record<string,string|string[]|undefined>, k:string) => {
  const x = p[k]; return typeof x === "string" ? x : Array.isArray(x) ? x[0] || "" : "";
};

export async function generateMetadata({ params }: PageArgs): Promise<Metadata> {
  const {slug=[]} = await params;
  return { title: slug.length ? slug.map(x=>x.replace(/-/g,' ')).join(' | ') : "TEM MAIS AQUI" };
}

function Breadcrumb({ items }: { items: Array<[string,string]> }) {
  return <div className="breadcrumb"><Link href="/">Início</Link>{items.map(([name,href])=><span key={href}> / <Link href={href}>{name}</Link></span>)}</div>;
}
function TitleSection({eyebrow,title,description}:{eyebrow?:string;title:string;description?:string}) {
  return <div className="title-section">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p className="lead">{description}</p>}</div>;
}
function SectionCard({title,body,href,cta}:{title:string;body:string;href:string;cta:string}) {
  return <Link className="card action-card card-link" href={href}><h3>{title}</h3><p>{body}</p><span className="arrow-link">{cta} <span>→</span></span></Link>;
}
function Home({c}:{c:Content}) {
  const areas = [
    ["saude", "Consultas e especialidades", "Encontre especialidades e consulte em quais unidades há atendimento.", "✚"],
    ["odontologia", "Odontologia", "Conheça os atendimentos odontológicos e como solicitar.", "◉"],
    ["terapias-reabilitacao", "Movimento e Reabilitação", "Veja fisioterapias, terapias e atividades para diferentes necessidades.", "↗"],
    ["convivencia-aprendizado", "Cultura e Aprendizado", "Explore oficinas, projetos culturais, coral e inclusão digital.", "✳"],
    ["lazer", "Lazer e Convivência", "Conheça a Sede Campestre, bailes e outras opções de convivência.", "⌂"],
    ["orientacao-direitos", "Apoio e Orientação", "Encontre Assistência Social, Jurídico, Previdenciário e outros setores.", "◎"],
  ];
  return <>
    <section className="hero"><div className="container">
      <div className="hero-layout"><div className="hero-copy"><Image className="hero-campaign-logo" src="/brand/tem-mais-aqui.svg" alt="Tem Mais Aqui" width={222} height={113} priority/><div className="eyebrow">AAPVR · SERVIÇOS, CUIDADO E CONVIVÊNCIA</div><h1>{t(c,"hero.titulo")}</h1><p className="lead">{t(c,"hero.texto")}</p><div className="hero-actions"><a className="button" href="#busca-guiada">Iniciar busca <span aria-hidden="true">→</span></a><Link className="button secondary" href="/servicos">Explorar serviços</Link></div><p className="hero-note">{t(c,"hero.nota")}</p></div><div className="hero-portrait"><Image src="/brand/aapvr-familia.webp" alt="Profissionais de saúde com pessoas de diferentes idades" width={760} height={798} priority sizes="(max-width: 700px) 100vw, 50vw"/></div></div>
      <div className="hero-finder" id="busca-guiada"><GuidedFinder content={c}/></div>
    </div></section>
    <section className="container section-space areas-section"><div className="section-header"><span className="eyebrow">EXPLORE TODAS AS ÁREAS</span><h2>Conheça o que existe na AAPVR</h2><p>Se ainda está descobrindo as possibilidades, comece pelas áreas.</p></div><div className="card-grid three">{areas.map(([id,title,body,icon])=><Link className="card area-card" key={id} href={`/servicos/${id}`}><span className="area-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{body}</p><span className="arrow-link">Explorar serviços <span>→</span></span></Link>)}</div><Link href="/servicos" className="all-services-link">Ver todos os serviços <span>→</span></Link></section>
    <section className="soft-section eligibility-section" id="quem-pode-utilizar"><div className="container eligibility-inner"><div><h2 className="eligibility-title">Quem pode utilizar?</h2><p className="eligibility-subtitle">Você não precisa adivinhar se pode participar.</p><p>As regras dependem do serviço e da categoria de associação. Antes de entrar em contato, veja os critérios informados para cada opção.</p></div><div className="eligibility-grid"><article><span>01</span><h3>Associados</h3><p>Podem utilizar os serviços previstos em sua categoria, conforme agenda, carência e requisitos.</p></article><article><span>02</span><h3>Dependentes</h3><p>O acesso depende do vínculo, da idade e da documentação exigida.</p></article><article><span>03</span><h3>Não associados</h3><p>Alguns atendimentos e atividades podem estar disponíveis. Consulte as condições de cada serviço.</p></article><p className="eligibility-note">As regras variam por serviço, unidade, agenda e disponibilidade. Confirme os dados antes de comparecer.</p></div></div></section>
    <section className="units-section" id="unidades"><div className="container section-space"><div className="section-header"><span className="eyebrow">UNIDADES</span><h2>Onde você pode encontrar atendimento</h2><p>Veja os endereços e consulte os serviços relacionados a cada unidade.</p></div><div className="card-grid three">{c.units.map((unit)=><article key={unit.id} className="card unit-card"><span className="unit-city">{unit.cidade}</span><h3>{unit.nome}</h3><p>{unit.endereco}</p><p className="unit-hours">{unit.horario}</p><div className="unit-tags">{unit.especialidades.slice(0,4).map((specialty)=><span key={specialty}>{specialty}</span>)}</div><Link href={`/unidades/${unit.id}`} className="arrow-link">Ver serviços desta unidade <span>→</span></Link></article>)}</div></div></section>
    <section className="container section-space social-section" id="acompanhe"><div className="section-header"><span className="eyebrow">ACOMPANHE A AAPVR</span><h2>Quer acompanhar o que acontece na AAPVR?</h2><p>Novos serviços, atividades, eventos e avisos também são divulgados nos nossos canais.</p></div><div className="card-grid three social-grid">{[
      ["instagram", "Instagram", "Veja conteúdos, bastidores, serviços e atividades da AAPVR.", t(c,"social.instagram.url"), "Acessar o Instagram"],
      ["facebook", "Facebook", "Acompanhe publicações, programações e novidades das unidades.", t(c,"social.facebook.url"), "Acessar o Facebook"],
      ["whatsapp", "Canal no WhatsApp", "Receba avisos e novidades da AAPVR diretamente no seu WhatsApp.", t(c,"social.whatsapp.url"), "Entrar no canal"],
    ].filter(([, , , url]) => /^https?:\/\//i.test(url)).map(([platform,name,description,url,cta])=><a className={`card social-card social-card--${platform}`} key={platform} href={url} target="_blank" rel="noopener noreferrer"><div className="social-card-heading"><span className={`social-card-icon social-card-icon--${platform}`} aria-hidden="true">{platform === "instagram" ? <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle className="social-icon-dot" cx="17.5" cy="6.5" r="1"/></svg> : platform === "facebook" ? <svg viewBox="0 0 24 24"><path className="social-icon-fill" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z"/></svg> : <svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.7 6L0 24l6.3-1.7a12 12 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8a9.7 9.7 0 0 1 6.9 2.9 9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.7 9.8Zm5.4-7.3c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.2-.3-.3-.6-.4Z"/></svg>}</span><div><span className="social-card-label">AAPVR · REDES SOCIAIS</span><h3>{name}</h3></div></div><p>{description}</p><span className="arrow-link">{cta} <span aria-hidden="true">→</span></span></a>)}</div><p className="social-note">O canal do WhatsApp é informativo e não substitui os contatos de atendimento.</p></section>
    <section className="container section-space faq-section" id="duvidas"><div className="section-header"><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Ficou com alguma pergunta?</h2><p>Veja respostas sobre utilização, agendamento e condições dos serviços.</p></div><div className="faqs">{c.faqs.slice(0,5).map((faq)=><details key={faq.id}><summary>{faq.pergunta}</summary><p>{faq.resposta}</p></details>)}</div><Link href="/duvidas" className="arrow-link spaced-link">Ver todas as dúvidas <span>→</span></Link></section>
    <section className="container section-space bottom-spacer association-section"><div className="panel association-panel"><div><span className="eyebrow">ASSOCIAÇÃO</span><h2>Quer ter acesso aos serviços da AAPVR?</h2><p>Entenda quem pode se associar, como funcionam as categorias e quais condições precisam ser confirmadas antes da adesão.</p><div className="association-paths"><Link className="button" href="/associado">Já sou associado <span>→</span></Link><Link className="button secondary" href="/associacao">Ainda não sou associado <span>→</span></Link></div></div><div className="panel-icon" aria-hidden="true">AAPVR</div></div></section>
  </>;
}
function AreaIndex({c}:{c:Content}) {
  return <div className="container page-space"><Breadcrumb items={[["Serviços","/servicos"]]}/><TitleSection eyebrow="SERVIÇOS" title={t(c,"servicos.titulo")} description={t(c,"servicos.texto")}/><div className="card-grid three">{c.categories.map(a=><div className="card action-card" key={a.id}><div className="card-icon">{a.icone}</div><h2 className="card-heading">{a.nome}</h2><p>{a.resumo}</p><Link className="arrow-link" href={`/servicos/${a.id}`}>Explorar serviços →</Link></div>)}</div></div>;
}
function CardService({s}:{s:Service}) {
  return <div className="card service-card"><div className="card-tag">{s.status}</div><h3>{s.nome}</h3><p>{s.resumo}</p><div className="microcopy">{s.acesso}</div><TrackLink href={serviceHref(s)} event="service_view" params={{service_id:s.id}} className="arrow-link">Ver requisitos <span>→</span></TrackLink></div>;
}
function Area({c,id}:{c:Content;id:string}) {
  const a=c.categories.find(x=>x.id===id);
  if (!a) notFound();
  if (id==="saude") return <Health c={c}/>;
  const relatedCategoryIds = id === "terapias-reabilitacao" ? [id, "movimento"]
    : id === "lazer" ? [id, "convivencia-aprendizado"]
    : [id];
  const selected=c.services.filter(s=>relatedCategoryIds.includes(s.categoria));
  return <div className="container page-space"><Breadcrumb items={[["Serviços","/servicos"],[a.nome,`/servicos/${id}`]]}/><TitleSection eyebrow="SERVIÇOS" title={t(c,`${id}.titulo`,a.nome)} description={a.resumo}/><div className="notice">As condições variam conforme serviço e unidade. Confirme requisitos e disponibilidade com o setor responsável.</div><div className="card-grid three">{selected.map(s=><CardService key={s.id} s={s}/>)}</div>{selected.length===0 && <div className="empty-state">Nenhuma opção publicada nesta categoria.</div>}<div className="bottom-actions"><Link href="/explorar" className="button secondary">Me ajude a encontrar →</Link><Link href="/contato" className="button">Encontrar um contato →</Link></div></div>;
}
function Health({c}:{c:Content}) {
  return <div className="container page-space"><Breadcrumb items={[["Serviços","/servicos"],["Saúde","/servicos/saude"]]}/><TitleSection eyebrow="CONSULTAS" title={t(c,"saude.titulo")} description={t(c,"saude.texto")}/><div className="notice warning">{t(c,"saude.aviso")}</div><Link href="/explorar" className="button spaced-link">Buscar uma especialidade por cidade →</Link><div className="card-grid three">{c.units.map(u=><div className="card" key={u.id}><div className="eyebrow">{u.cidade}</div><h2 className="card-heading">{u.nome}</h2><p className="muted">{u.endereco}</p><div className="tags">{u.especialidades.map(s=><Link key={s} href={`/servicos/saude/${slugify(s)}`} className="tag">{s}</Link>)}</div><Link className="arrow-link" href={`/unidades/${u.id}`}>Ver unidade e agendamento →</Link></div>)}</div></div>;
}
function Specialty({c,id}:{c:Content;id:string}) {
  const units=c.units.filter(u=>u.especialidades.some(s=>slugify(s)===id));
  const specialty=units.flatMap(u=>u.especialidades).find(s=>slugify(s)===id);
  if (!specialty) notFound();
  return <div className="container page-space"><Breadcrumb items={[["Serviços","/servicos"],["Saúde","/servicos/saude"],[specialty,`/servicos/saude/${id}`]]}/><TitleSection eyebrow="ESPECIALIDADE" title={specialty} description={`Veja em quais unidades há atendimento em ${specialty.toLowerCase()} e como solicitar uma consulta.`}/><div className="notice">A disponibilidade varia conforme a agenda da unidade. A Central informa as datas no momento da solicitação.</div><div className="card-grid two">{units.map(u=><div className="card" key={u.id}><h2>{u.nome}</h2><p>{u.endereco}</p><p className="muted">{u.horario}</p><TrackLink className="button" event="unit_selected" params={{unit_id:u.id,service_id:id}} href={`/como-funciona/consultas?especialidade=${encodeURIComponent(specialty)}&unidade=${u.id}`}>Ver como agendar →</TrackLink></div>)}</div></div>;
}
function ServiceDetails({c,category,id}:{c:Content;category:string;id:string}) {
  const s=c.services.find(x=>x.categoria===category&&x.id===id);
  if (!s) notFound();
  const area=c.categories.find(x=>x.id===category);
  const unitNames=s.unidades.split('|').map(x=>c.units.find(u=>u.id===x)?.nome || (x==='sede-campestre'?'Sede Campestre':x)).filter(Boolean);
  const contact=s.canal || (category==='odontologia'?'odonto':category==='orientacao-direitos'?'assistencia-social':'cpsi');
  return <div className="container narrow page-space"><Breadcrumb items={[["Serviços","/servicos"],[area?.nome||category,`/servicos/${category}`],[s.nome,serviceHref(s)]]}/><TitleSection eyebrow={area?.nome.toUpperCase()} title={s.nome} description={s.resumo}/><div className="detail-grid"><div className="info-block"><div className="detail-label">Para quem é</div><p>{s.publico}</p></div><div className="info-block"><div className="detail-label">Participação</div><p>{s.acesso}</p></div>{s.idade&&<div className="info-block"><div className="detail-label">Idade / público</div><p>{s.idade}</p></div>}<div className="info-block"><div className="detail-label">Requisitos e documentos</div><p>{s.requisitos}</p></div><div className="info-block"><div className="detail-label">Unidade ou local</div><p>{unitNames.join(', ')||'Confirmar com o setor responsável.'}</p></div><div className="info-block"><div className="detail-label">Agenda e vagas</div><p>{s.status}</p></div></div><div className="notice">Confirme as informações com a equipe antes de comparecer. Para condições financeiras, fale com o Comercial.</div><div className="button-row"><TrackLink className="button" event="requirements_view" params={{service_id:s.id}} href={contactHref(contact,s.nome)}>Ver requisitos e falar com a equipe →</TrackLink><Link href={contactHref("comercial",s.nome)} className="button secondary">Consultar condições com o Comercial</Link></div></div>;
}
function About({c}:{c:Content}) {
  return <div className="container narrow page-space"><TitleSection eyebrow="COMO FUNCIONA" title={t(c,"como.titulo")} description="Cada serviço tem regras próprias. Confira os pontos principais antes de entrar em contato."/><div className="stacked-cards"><div className="card"><h2>A AAPVR não é plano de saúde</h2><p>Oferece consultas ambulatoriais eletivas e outros serviços. Não oferece pronto atendimento, internação ou cirurgia hospitalar.</p></div><div className="card"><h2>Alguns serviços atendem não associados</h2><p>Há atividades abertas à comunidade e outras exclusivas para associados. Os requisitos aparecem em cada serviço.</p></div><div className="card"><h2>Agendas e vagas precisam de confirmação</h2><p>A disponibilidade depende da unidade, dos horários de cada profissional e da procura.</p></div><div className="card"><h2>Documentos variam conforme o atendimento</h2><p>Algumas atividades pedem atestado ou pedido médico. Confira antes de comparecer.</p></div></div><Link href="/como-funciona/consultas" className="button spaced-link">Entender agendamento de consultas →</Link></div>;
}
function Schedule({c,search}:{c:Content;search:Record<string,string|string[]|undefined>}) {
  const specialty=first(search,'especialidade'), unit=first(search,'unidade');
  const steps=["Escolha a especialidade e a unidade.","Confira se sua matrícula está ativa e se o período de carência já terminou.","Solicite pelo portal do associado ou pela Central de Agendamento.","A equipe informa a disponibilidade atual.","Confirme a consulta. Se não puder comparecer, solicite cancelamento ou transferência."];
  return <div className="container narrow page-space"><Breadcrumb items={[["Como funciona","/como-funciona"],["Consultas","/como-funciona/consultas"]]}/><TitleSection eyebrow="AGENDAMENTO" title={t(c,"consultas.titulo")} description={t(c,"consultas.texto")}/>{specialty&&<div className="notice"><strong>Escolha atual:</strong> {specialty}{unit?` · ${c.units.find(u=>u.id===unit)?.nome||unit}`:''}</div>}<ol className="steps">{steps.map((s,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{s}</p></li>)}</ol><div className="panel schedule-contact-panel"><h2>Por onde marcar?</h2><p><strong>Portal do associado:</strong> <a href="https://associado.aapvr.com.br/login?next=%2F" target="_blank" rel="noopener noreferrer">https://associado.aapvr.com.br/login?next=%2F</a></p><p><strong>Central:</strong> (24) 2102-1909, opção 7. Segunda a sexta, das 8h às 14h.</p><div className="button-row schedule-contact-actions"><div className="portal-action"><a href="https://associado.aapvr.com.br/login?next=%2F" target="_blank" rel="noopener noreferrer" className="button">Agendar pelo portal ↗</a><small>Exclusivo para associados</small></div><TrackLink href={`/contato?assunto=callcenter&especialidade=${encodeURIComponent(specialty)}&unidade=${encodeURIComponent(unit)}`} className="button secondary" event="schedule_external_click" params={{service_id:slugify(specialty),unit_id:unit}}>Falar com a Central →</TrackLink></div></div><div className="notice warning spaced-link"><strong>Por que a consulta pode demorar?</strong><p>A procura, a frequência de atendimento do profissional e a disponibilidade da unidade interferem no prazo.</p></div></div>;
}
function Association({c}:{c:Content}) {
  return <div className="container narrow page-space"><TitleSection eyebrow="TEM MAIS AQUI" title={t(c,"associacao.titulo")} description={t(c,"associacao.texto")}/><div className="stacked-cards"><div className="card"><h2>Precisa ser aposentado ou pensionista?</h2><p>Não. O titular pode ter 18 anos ou mais. Dependentes podem ser incluídos conforme idade, vínculo e documentação. A equipe Comercial confirma a categoria adequada.</p></div><div className="card"><h2>O que a associação permite utilizar?</h2><p>Com matrícula ativa, você pode acessar os serviços da sua categoria, conforme carência, agenda, vagas e requisitos.</p></div><div className="card"><h2>Quais documentos são necessários?</h2><p><strong>Titular:</strong> documento de identidade, CPF, comprovante de residência e cartão SUS.</p><p><strong>Dependentes:</strong> identidade, CPF, cartão SUS e documento de vínculo, quando aplicável.</p></div><div className="card"><h2>O que a AAPVR não oferece?</h2><p>Não é plano de saúde. Não oferece pronto atendimento, internação ou cirurgia hospitalar.</p></div><div className="card"><h2>Como funcionam os valores e a carência?</h2><p>As condições variam conforme a categoria e os serviços. Converse com o Comercial para confirmar as regras atuais antes da adesão.</p></div></div><TrackLink href="/contato?assunto=comercial" event="association_cta_click" className="button spaced-link">Consultar condições com o Comercial →</TrackLink></div>;
}
function Associated({c}:{c:Content}) {
  const acts=[
    ["Marcar consulta","Escolha a especialidade e acesse o portal ou a Central.","/como-funciona/consultas"],
    ["Confirmar, transferir ou cancelar consulta","Veja os canais do Call Center.",contactHref("callcenter")],
    ["Conhecer outros serviços","Descubra atividades e atendimentos que você pode ainda não conhecer.","/servicos"],
    ["Resolver boleto ou contribuição existente","Fale com a Secretaria.",contactHref("secretaria")],
    ["Consultar condições comerciais","Fale com o Comercial.",contactHref("comercial")],
    ["Atualizar cadastro ou carteira","Veja o canal da Secretaria.",contactHref("secretaria")],
    ["Fazer uma reclamação ou sugestão","Registre a demanda na Ouvidoria.",contactHref("ouvidoria")],
    ["Falar sobre permanência ou cancelamento","Converse com Relacionamento para entender os próximos passos.",contactHref("relacionamento")]
  ];
  const actions=["Agendar consulta","Acessar canais do Call Center","Explorar serviços","Falar com a Secretaria","Consultar condições comerciais","Atualizar cadastro","Falar com a Ouvidoria","Conversar com Relacionamento"];
  return <div className="container page-space"><TitleSection eyebrow="JÁ SOU ASSOCIADO" title={t(c,"associado.titulo")} description={t(c,"associado.texto")}/><div className="card-grid two">{acts.map(([title,body,href],index)=><SectionCard key={title} title={title} body={body} href={href} cta={actions[index]}/>)}</div></div>;
}
function FAQs({c}:{c:Content}) {
  return <div className="container narrow page-space"><TitleSection eyebrow="RESPOSTAS DIRETAS" title={t(c,"duvidas.titulo")}/><div className="faqs">{c.faqs.map(f=><details key={f.id}><summary>{f.pergunta}</summary><p>{f.resposta}</p></details>)}</div><Link className="button spaced-link" href="/contato">Minha dúvida é outra →</Link></div>;
}
function Units({c}:{c:Content}) {
  return <div className="container page-space"><TitleSection eyebrow="UNIDADES" title="Onde você quer ser atendido?" description="Compare endereços, horários gerais e especialidades informadas para cada unidade."/><div className="card-grid three">{c.units.map(u=><div key={u.id} className="card"><div className="eyebrow">{u.cidade}</div><h2>{u.nome}</h2><p>{u.endereco}</p><p className="muted">{u.horario}</p><Link href={`/unidades/${u.id}`} className="arrow-link">Ver especialidades →</Link></div>)}</div></div>;
}
function UnitDetails({c,unit}:{c:Content;unit:Unit}) {
  return <div className="container page-space"><Breadcrumb items={[["Unidades","/unidades"],[unit.nome,`/unidades/${unit.id}`]]}/><TitleSection eyebrow={unit.cidade.toUpperCase()} title={unit.nome} description={unit.endereco}/><div className="notice"><strong>Horário geral informado:</strong> {unit.horario}. Os horários das especialidades podem ser diferentes.</div><h2 className="section-heading">Especialidades informadas</h2><div className="card-grid three">{unit.especialidades.map(s=><Link className="card mini-card" key={s} href={`/servicos/saude/${slugify(s)}`}>{s}<span>→</span></Link>)}</div><Link className="button spaced-link" href="/como-funciona/consultas">Ver como agendar →</Link></div>;
}
function Contact({c,search}:{c:Content;search:Record<string,string|string[]|undefined>}) {
  return <div className="container narrow page-space"><TitleSection eyebrow="CONTATO" title={t(c,"contato.titulo")} description={t(c,"contato.texto")}/><ContactChooser contacts={c.contacts} initial={first(search,"assunto")} service={first(search,"servico")} specialty={first(search,"especialidade")} unit={first(search,"unidade")}/></div>;
}
export default async function CatchAll({params,searchParams}:PageArgs) {
  const [{slug=[]}, search, c] = await Promise.all([params,searchParams,getContent()]);
  if (!slug.length) return <Home c={c}/>;
  const path=slug.join('/');
  if (path==='explorar') return <Explorer content={c}/>;
  if (path==='servicos') return <AreaIndex c={c}/>;
  if (path==='como-funciona') return <About c={c}/>;
  if (path==='como-funciona/consultas') return <Schedule c={c} search={search}/>;
  if (path==='associacao') return <Association c={c}/>;
  if (path==='associado') return <Associated c={c}/>;
  if (path==='unidades') return <Units c={c}/>;
  if (path==='duvidas') return <FAQs c={c}/>;
  if (path==='contato') return <Contact c={c} search={search}/>;
  if (path==='historias') return <div className="container narrow page-space"><TitleSection eyebrow="HISTÓRIAS REAIS" title={t(c,'historias.titulo')} description={t(c,'historias.texto')}/><Link href="/explorar" className="button spaced-link">Encontrar um serviço →</Link></div>;
  if (slug[0]==='unidades' && slug.length===2) {
    const u=c.units.find(u=>u.id===slug[1]); if (!u) notFound();return <UnitDetails c={c} unit={u}/>;
  }
  if (slug[0]==='servicos' && slug.length===2) return <Area c={c} id={slug[1]}/>;
  if (slug[0]==='servicos' && slug.length===3) {
    if (slug[1]==='saude') return <Specialty c={c} id={slug[2]}/>;
    return <ServiceDetails c={c} category={slug[1]} id={slug[2]}/>;
  }
  notFound();
}
