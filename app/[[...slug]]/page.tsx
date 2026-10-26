import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t, slugify, serviceHref, contactHref, type Content, type Service, type Unit } from "@/lib/data";
import { getContent } from "@/lib/cms";
import Explorer from "@/components/Explorer";
import ContactChooser from "@/components/ContactChooser";
import TrackLink from "@/components/TrackLink";

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
  const paths = [
    ["SAÚDE", "/servicos/saude"],
    ["MOVIMENTO", "/servicos/movimento"],
    ["CULTURA", "/servicos/convivencia-aprendizado"],
    ["LAZER", "/servicos/lazer"],
    ["ORIENTAÇÃO", "/servicos/orientacao-direitos"],
    ["CONVIVÊNCIA", "/servicos/convivencia-aprendizado"],
  ];
  const cards = [
    ["Preciso de uma consulta","Veja as especialidades disponíveis em cada unidade e entenda como funciona o agendamento.","/servicos/saude","Ver especialidades"],
    ["Quero cuidar do corpo e da mente","Conheça fisioterapias, psicologia, acupuntura, osteopatia e outras possibilidades de cuidado.","/servicos/terapias-reabilitacao","Ver terapias e reabilitação"],
    ["Quero me movimentar","Veja hidroginástica, Pilates, musculação, ginástica, yoga, futebol e dança.","/servicos/movimento","Ver atividades"],
    ["Quero aprender e conviver","Explore oficinas, coral, inclusão digital, Cultura Viva, teatro, bordado e encontros.","/servicos/convivencia-aprendizado","Ver oficinas e projetos"],
    ["Quero aproveitar meu tempo livre","Conheça a Sede Campestre, os bailes e outras opções de lazer.","/servicos/lazer","Ver lazer"],
    ["Preciso de orientação","Encontre Assistência Social, Jurídico, Previdenciário, Secretaria e Ouvidoria.","/servicos/orientacao-direitos","Encontrar orientação"],
  ];
  return <>
    <section className="hero"><div className="container hero-inner"><div className="hero-copy"><div className="eyebrow">{t(c,"hero.selo")}</div><h1>{t(c,"hero.titulo")}</h1><p className="lead">{t(c,"hero.texto")}</p><div className="button-row"><TrackLink href="/explorar" event="interest_selected" params={{source:"homepage"}} className="button">Encontrar um serviço <span>→</span></TrackLink><Link href="/associacao" className="button secondary">Entender a associação</Link></div><p className="hero-note">{t(c,"hero.nota")}</p></div><div className="hero-visual"><span className="hero-art-kicker" aria-hidden="true">AAPVR · TEM MAIS AQUI</span><div className="hero-art-orbit" aria-label="Explorar por área">{paths.map(([name,href])=><Link key={name} href={href}>{name}</Link>)}</div><span className="hero-art-plus" aria-hidden="true">+</span><span className="hero-art-caption" aria-hidden="true">Diferentes caminhos.<br/>Um lugar para começar.</span></div></div></section>
    <section className="container section-space home-options"><div className="section-header"><span className="eyebrow">POR ONDE COMEÇAR</span><h2>{t(c,"home.titulo_opcoes")}</h2><p>Escolha pelo que você precisa. Cada caminho mostra as condições e o próximo passo.</p></div><div className="card-grid three">{cards.map(([title,body,href,cta],i)=><div className="home-option" key={href}><span className="home-option-number" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><SectionCard title={t(c,`home.card.${i+1}.titulo`,title)} body={t(c,`home.card.${i+1}.texto`,body)} href={href} cta={cta}/></div>)}</div></section>
    <section className="soft-section"><div className="container split-callout"><div><span className="eyebrow">DESCUBRA OUTRAS POSSIBILIDADES</span><h2>{t(c,"home.mais_titulo")}</h2><p>{t(c,"home.mais_texto")}</p></div><Link className="button" href="/servicos">Conhecer tudo o que existe →</Link></div></section>
    <section className="container section-space"><div className="section-header"><span className="eyebrow">INFORMAÇÃO CLARA</span><h2>{t(c,"home.regras_titulo")}</h2></div><div className="card-grid two">
      <div className="card"><h3>A AAPVR não é plano de saúde</h3><p>O atendimento é ambulatorial e eletivo. Não oferece pronto atendimento, internação ou cirurgia hospitalar.</p></div>
      <div className="card"><h3>A agenda varia</h3><p>O prazo depende da especialidade, da unidade, da agenda profissional e da procura.</p></div>
      <div className="card"><h3>Cada serviço tem suas regras</h3><p>Alguns exigem pedido médico, atestado, idade mínima ou matrícula ativa.</p></div>
      <div className="card"><h3>Nem tudo é exclusivo para associados</h3><p>Há atendimentos e atividades abertos a não associados. Consulte cada serviço.</p></div>
    </div><Link className="arrow-link spaced-link" href="/como-funciona">Ver como funciona →</Link></section>
    <section className="container section-space bottom-spacer"><div className="panel association-panel"><div><span className="eyebrow">ASSOCIAÇÃO</span><h2>{t(c,"home.associacao_titulo")}</h2><p>{t(c,"home.associacao_texto")}</p><Link className="button" href="/associacao">Entender a associação →</Link></div><div className="panel-icon" aria-hidden="true">18+</div></div></section>
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
  const selected=c.services.filter(s=>s.categoria===id);
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
  return <div className="container narrow page-space"><Breadcrumb items={[["Como funciona","/como-funciona"],["Consultas","/como-funciona/consultas"]]}/><TitleSection eyebrow="AGENDAMENTO" title={t(c,"consultas.titulo")} description={t(c,"consultas.texto")}/>{specialty&&<div className="notice"><strong>Escolha atual:</strong> {specialty}{unit?` · ${c.units.find(u=>u.id===unit)?.nome||unit}`:''}</div>}<ol className="steps">{steps.map((s,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{s}</p></li>)}</ol><div className="panel"><h2>Por onde marcar?</h2><p><strong>Portal do associado:</strong> disponível pela internet.</p><p><strong>Central:</strong> (24) 2102-1909, opção 7. Atendimento informado: segunda a sexta, das 8h às 14h.</p><div className="button-row"><a href="https://associado.aapvr.com.br/" target="_blank" rel="noopener noreferrer" className="button">Agendar pelo portal ↗</a><TrackLink href={`/contato?assunto=callcenter&especialidade=${encodeURIComponent(specialty)}&unidade=${encodeURIComponent(unit)}`} className="button secondary" event="schedule_external_click" params={{service_id:slugify(specialty),unit_id:unit}}>Falar com a Central →</TrackLink></div></div><div className="notice warning spaced-link"><strong>Por que a consulta pode demorar?</strong><p>A procura, a frequência de atendimento do profissional e a disponibilidade da unidade interferem no prazo.</p></div></div>;
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
  return <div className="container page-space"><TitleSection eyebrow="JÁ SOU ASSOCIADO" title={t(c,"associado.titulo")} description={t(c,"associado.texto")}/><div className="card-grid two">{acts.map(([title,body,href])=><SectionCard key={title} title={title} body={body} href={href} cta="Ver caminho"/>)}</div></div>;
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
