import json, re, csv, unicodedata
from pathlib import Path
root=Path(__file__).resolve().parent.parent
src=(root/'docs'/'Especificacao_TEM_MAIS_AQUI.md').read_text(encoding='utf-8')

def slug(x):
    x=''.join(c for c in unicodedata.normalize('NFD',x.lower()) if unicodedata.category(c)!='Mn')
    return re.sub(r'[^a-z0-9]+','-',x).strip('-')

categories=[
 ('saude','Consultas e especialidades','Encontre a especialidade e veja em qual unidade há atendimento.','🩺'),
 ('odontologia','Odontologia','Conheça as áreas do Centro Odontológico e como solicitar atendimento.','🦷'),
 ('terapias-reabilitacao','Terapias e reabilitação','Veja fisioterapias, psicologia, acupuntura e outras formas de acompanhamento.','🌿'),
 ('movimento','Movimento','Encontre atividades para força, mobilidade, condicionamento e convivência.','🏃'),
 ('convivencia-aprendizado','Convivência e aprendizado','Conheça oficinas, projetos culturais, coral e inclusão digital.','🎭'),
 ('lazer','Lazer','Veja o que existe na Sede Campestre e quem pode utilizar.','🌳'),
 ('orientacao-direitos','Orientação e direitos','Descubra qual setor pode ajudar em cada assunto.','💬'),
]
cat=[dict(id=k,nome=n,resumo=d,icone=i) for k,n,d,i in categories]

def sp(text): return [x.strip() for x in text.split(',') if x.strip()]
units=[
 dict(id='aterrado',nome='Aterrado (CISA)',cidade='Volta Redonda',endereco='Rua 535, nº 835, Nossa Senhora das Graças, Volta Redonda, RJ',horario='Segunda a quinta, das 7h às 18h. Sexta, das 7h às 17h.',especialidades=sp('Alergologia, Angiologia, Cardiologia, Clínica Médica, Dermatologia, Endocrinologia, Fitoterapia, Gastroenterologia, Geriatria, Ginecologia, Hematologia, Homeopatia, Mastologia, Nefrologia, Neurologia, Nutrição Clínica, Nutrição Oncológica, Oftalmologia, Otorrinolaringologia, Ortopedia, Pediatria, Pequenas Cirurgias, Pneumologia, Proctologia, Psiquiatria, Reumatologia, Urologia'),publicado='SIM'),
 dict(id='barra-do-pirai',nome='Barra do Piraí',cidade='Barra do Piraí',endereco='Rua Cristiano Otoni, nº 206, Centro, Barra do Piraí, RJ',horario='Segunda a sexta, das 7h às 17h.',especialidades=sp('Alergologia, Angiologia, Cardiologia, Clínica Médica, Dermatologia, Endocrinologia, Enfermagem, Fisioterapia, Gastroenterologia, Geriatria, Ginecologia, Neurologia, Nutrição, Oftalmologia, Ortopedia, Pediatria, Proctologia, Psiquiatria, Reumatologia'),publicado='SIM'),
 dict(id='pinheiral',nome='Pinheiral',cidade='Pinheiral',endereco='Rua José Gomes da Silva Júnior, nº 135, Centro, Pinheiral, RJ',horario='Segunda a sexta, das 8h às 17h.',especialidades=sp('Cardiologia, Clínica Médica, Gastroenterologia, Geriatria, Ginecologia, Neurologia, Nutrição, Ortopedia'),publicado='SIM'),
]
services=[]
def add(category,nome,resumo,publico='Consulte o público com o setor.',idade='',acesso='Consulte as condições de participação.',requisitos='Confirme requisitos com o setor responsável.',unidades='',status='A confirmar',canal='',publicado='SIM'):
    services.append(dict(id=slug(nome),categoria=category,nome=nome,resumo=resumo,publico=publico,idade=idade,acesso=acesso,requisitos=requisitos,unidades=unidades,status=status,canal=canal,publicado=publicado))
# Tabelas do documento, preservando as copies originais.
def table_after(heading, end):
    s=src.split(heading,1)[1].split(end,1)[0]
    rows=[]
    for line in s.splitlines():
        if line.startswith('|') and not re.match(r'^\|\s*[-:| ]+\|$',line):
            parts=[x.strip() for x in line.strip('|').split('|')]
            if len(parts)==3 and parts[0] not in ['Serviço','Atividade']:
                rows.append(parts)
    return rows
for n,d in [
 ('Cirurgia Oral','Extrações em geral.'),('Dentística','Restaurações, obturações, clareamento, facetas e emergências odontológicas.'),
 ('Endodontia','Tratamento de canal.'),('Estomatologia','Prevenção e diagnóstico de doenças da boca, inclusive no acompanhamento de pacientes em radioterapia ou quimioterapia.'),
 ('Odontopediatria','Atendimento odontológico a partir dos 4 anos.'),('Ortodontia','Aparelhos fixos e móveis.'),('Oclusão','Avaliação e tratamento de DTM, bruxismo, estalos na articulação, ronco e apneia.'),
 ('Periodontia','Prevenção e tratamento da gengiva, com profilaxia e limpeza.'),('Prótese','Próteses totais e removíveis, coroas, pinos e blocos.'),('Implantodontia','Implantes dentários, conforme avaliação.')]:
    add('odontologia',n,d,'Associados e não associados','4 anos' if n=='Odontopediatria' else '', 'Associados e não associados','Menores acompanhados do responsável. Confirme avaliação e agenda.','aterrado','Confirmar agenda','odonto')
therapy=[
 ('Acupuntura','Aplicação de agulhas em pontos específicos, realizada como terapia complementar.','Associados e não associados de todas as idades. Não exige pedido médico. Há avaliação.'),
 ('Psicologia','Atendimento psicológico para diferentes fases da vida.','A partir de 8 anos. Não exige pedido médico.'),
 ('Fisioterapia traumato ortopédica','Acompanhamento voltado à recuperação de funções musculares e esqueléticas.','Exige pedido médico. Associados e não associados.'),
 ('Fisioterapia neurológica','Atendimento para alterações relacionadas às funções neurológicas.','Exige pedido médico. Associados e não associados.'),
 ('Fisioterapia respiratória','Exercícios específicos para condições que atingem o sistema respiratório.','Exige pedido médico. Confirmar público e agenda.'),
 ('Fisioterapia pélvica','Trabalho de fortalecimento do assoalho pélvico.','Exige pedido médico. Associados e não associados.'),
 ('Reabilitação labiríntica','Tratamento voltado à redução de tontura e desequilíbrio.','Não exige pedido médico no checklist. Associados e não associados.'),
 ('Osteopatia','Abordagem manual para o corpo e suas dores.','Não exige pedido médico. Associados e não associados.'),
 ('Hidroterapia','Exercícios terapêuticos em piscina aquecida.','A partir de 18 anos. Exige pedido médico e atestado dermatológico.'),
 ('Audiometria','Exame para avaliar a capacidade de ouvir e interpretar sons.','Exige pedido médico. Status e agenda precisam ser confirmados.'),
 ('Fonoaudiologia','Atendimento relacionado à comunicação humana.','Exige pedido médico. Status e agenda precisam ser confirmados.'),
]
for n,d,r in therapy:
    is_pending=n in ('Audiometria','Fonoaudiologia')
    add('terapias-reabilitacao',n,d,'Conforme requisitos do serviço','8 anos' if n=='Psicologia' else ('18 anos' if n=='Hidroterapia' else ''),'Associados e não associados, conforme regras' if n!='Fisioterapia respiratória' else 'Confirmar público',r,'aterrado','Status não confirmado' if is_pending else 'Confirmar disponibilidade','cpsi','NAO' if is_pending else 'SIM')
movement=[
 ('Hidroginástica','Exercício aeróbico na piscina para trabalhar condicionamento físico.','Exclusiva para associados acima de 18 anos.','18 anos','Associados','Atestado médico e atestado dermatológico originais. Vagas limitadas.'),
 ('Hidroterapia','Exercícios terapêuticos em piscina aquecida, com acompanhamento e finalidade de reabilitação.','Associados e não associados acima de 18 anos.','18 anos','Associados e não associados','Pedido médico e atestado dermatológico.'),
 ('Yoga','Prática que combina postura, respiração, meditação e relaxamento.','Associados acima de 18 anos.','18 anos','Associados','Atestado médico original.'),
 ('Ginástica','Atividade para trabalhar força, flexibilidade, equilíbrio e coordenação.','Associados acima de 18 anos.','18 anos','Associados','Atestado médico original.'),
 ('Pilates','Atividade voltada ao fortalecimento muscular e à elasticidade.','Associados e não associados acima de 18 anos.','18 anos','Associados e não associados','Atestado médico original.'),
 ('Musculação','Exercícios para condicionamento físico e fortalecimento muscular.','Associados acima de 18 anos.','18 anos','Associados','Atestado original do cardiologista.'),
 ('Futebol Arte','Treinos de futebol para associados, conforme regra da unidade.','Associados, conforme unidade.','','Associados','Atestado ou laudo de aptidão. Em Barra do Piraí, acima de 50 anos.'),
 ('Dança de salão','Aulas para aprender passos, praticar movimento e conviver.','Associados e não associados, conforme turma.','','Associados e não associados','Consultar inscrição, turma e disponibilidade.'),
]
for n,d,p,i,a,r in movement:
    add('movimento',n,d,p,i,a,r, 'aterrado|barra-do-pirai' if n in ('Ginástica','Futebol Arte','Dança de salão') else 'aterrado', 'Vagas limitadas. Confirmar com setor.' if n=='Hidroginástica' else 'Confirmar vagas','cpsi')
conv=[
 ('Serviço de Convivência e Fortalecimento de Vínculos','Encontros para convivência familiar, comunitária e intergeracional.','Associados, com inscrição e avaliação da Assistência Social.'),
 ('Oficina de Artesanato','Desenvolvimento de habilidades manuais, criatividade e produção artesanal.','Associados. Inscrição na Assistência Social.'),
 ('Oficina de Teclado','Aprendizado musical e desenvolvimento de coordenação.','Associados. Idade mínima de 12 anos, com responsável quando necessário.'),
 ('Coral Alvorada','Música, memória, expressão e convivência.','Associados com mais de 60 anos, após avaliação.'),
 ('Inclusão Digital e Educação Financeira','Apoio no uso de celulares, computadores e recursos digitais, com orientações financeiras.','Pessoas com 60 anos ou mais e alfabetizadas.'),
 ('Cultura Viva','Oficinas que valorizam saberes, talentos e tradições.','Aberto à população de qualquer idade. Menores com acompanhante.'),
 ('Memórias que Dançam','Oficinas, apresentações e conversas sobre danças culturais brasileiras.','Associados em dia.'),
 ('Tarde Cultural','Encontro cultural aberto ao público geral, conforme programação.','Confirmar data e regras de cada edição.'),
 ('Teatro','Aulas de expressão e prática teatral.','Associados e não associados, mediante inscrição e disponibilidade.'),
 ('Bordado','Aula prática de bordado em Barra do Piraí.','Associados e não associados, mediante inscrição e disponibilidade.'),
]
for n,d,r in conv:
    add('convivencia-aprendizado',n,d,'Conforme regras da atividade','','Consulte as condições',r,'barra-do-pirai' if n=='Bordado' else 'aterrado','Confirmar turmas','assistencia-social')
leisure=[
 ('Pesque e Pague','Pesca, preparo do pescado e opções de porções no local.','Associados têm entrada e pesca liberadas. Não associados pagam para pescar.'),
 ('Restaurante','Self service por peso nos fins de semana e feriados, conforme funcionamento.','Associados podem ter condição especial mediante apresentação da carteira.'),
 ('Parque Aquático','Duas piscinas disponíveis nos dias de funcionamento.','Associados têm entrada liberada. Visitantes acima de 10 anos pagam entrada. Crianças menores devem apresentar documento e estar acompanhadas.'),
 ('Parque Infantil','Brinquedos para crianças de até 12 anos.','Uso gratuito para associados e visitantes, conforme funcionamento da Sede.'),
 ('Campo de Futebol','Campo com marcações e rede, sujeito à disponibilidade e às locações do espaço.','Confirme disponibilidade antes de ir.'),
 ('Área do Lago','Espaço com churrasqueira, cozinha, palco e banheiros para encontros e eventos.','Utilização mediante disponibilidade, reunião e contrato.'),
 ('Pacotes para grupos e eventos','Pacotes personalizados para grupos, conforme número de pessoas, disponibilidade e contrato.','Consultar a administração.'),
]
for n,d,r in leisure: add('lazer',n,d,'Associados e visitantes','','Consulte as regras',r,'sede-campestre','Confirmar funcionamento','sede')
orient=[
 ('Assistência Social','Orientação, convivência, fortalecimento de vínculos, inscrições em atividades e acesso a informações sobre direitos e participação cidadã.','assistencia-social','Consultar público e triagem'),
 ('Jurídico','Orientação sobre golpes, empréstimos consignados, cobranças indevidas, transações não reconhecidas, direitos civis, benefícios previdenciários e isenção de Imposto de Renda.','juridico','Atendimento prioritário para associados, mediante triagem e agendamento.'),
 ('Previdenciário','Orientação sobre INSS, benefícios, tributos, Imposto de Renda e pendências ligadas à Previdência Social.','previdenciario','Gratuito para associados.'),
 ('Secretaria','Atualização cadastral, carteira, carnê, boleto, declarações, inclusão ou retirada de débito automático e outras demandas documentais.','secretaria','Consultar documentação necessária.'),
 ('Ouvidoria','Canal para informações, dúvidas, sugestões, elogios e reclamações, com registro e encaminhamento ao setor responsável.','ouvidoria','Consultar canal de atendimento.'),
]
for n,d,c,r in orient: add('orientacao-direitos',n,d,'Conforme tipo de demanda','','Consulte o setor',r,'aterrado','Atendimento por setor',c)

contacts=[
 ('callcenter','Central de Agendamento','(24) 2102-1909','(24) 2102-1952','Telefone: opção 7. WhatsApp: opção 5.','SIM'),
 ('odonto','Centro Odontológico','(24) 2102-1909','(24) 2102-1952','Opção 4 nos dois canais.','SIM'),
 ('cpsi','CPSI','(24) 2102-1988','(24) 99287-1721','','SIM'),
 ('assistencia-social','Assistência Social','(24) 2102-1951','(24) 98141-4445','','SIM'),
 ('sede','Sede Campestre','(24) 2102-1948','','','SIM'),
 ('juridico','Jurídico','(24) 2102-1918','(24) 2102-1952','WhatsApp: opção 6.','SIM'),
 ('previdenciario','Previdenciário','(24) 2102-1910','','','SIM'),
 ('secretaria','Secretaria','(24) 2102-1904','(24) 2102-1952','WhatsApp: opção 3.','SIM'),
 ('ouvidoria','Ouvidoria','(24) 2102-1970','(24) 2102-1952','WhatsApp: opção 7.','SIM'),
 ('comercial','Comercial','','','Contato oficial pendente de validação.','SIM'),
 ('relacionamento','Relacionamento','','(24) 2102-1952','WhatsApp: opção 2. Confirmar antes de divulgar.','NAO'),
]
contacts=[dict(id=i,nome=n,telefone=t,whatsapp=w,observacao=o,publicado=p) for i,n,t,w,o,p in contacts]
faqs=[
 ('Preciso ser aposentado para me associar?','Não. O titular pode ter 18 anos ou mais. Dependentes seguem regras de vínculo, idade e documentação.'),
 ('A AAPVR atende pessoas de outras idades?','Sim. Há consultas, odontologia, terapias e atividades para diferentes idades. A regra varia por serviço.'),
 ('A AAPVR é um plano de saúde?','Não. A AAPVR oferece atendimento ambulatorial eletivo e outros serviços próprios. Não oferece pronto atendimento, internação ou cirurgia hospitalar.'),
 ('Posso usar algum serviço sem ser associado?','Sim. Alguns serviços recebem não associados, conforme as regras de cada área. Outros são exclusivos para associados.'),
 ('Todos os serviços seguem a mesma condição de uso?','Não. Cada serviço tem regras específicas. Consulte os requisitos e as condições comerciais com o Comercial.'),
 ('Como marco uma consulta?','Pelo portal do associado ou pela Central de Agendamento. A data disponível depende da especialidade e da unidade.'),
 ('Quanto tempo demora para conseguir uma consulta?','Não existe um prazo único. A espera varia conforme a procura e a agenda profissional.'),
 ('Todas as especialidades existem em todas as unidades?','Não. Aterrado, Barra do Piraí e Pinheiral possuem listas diferentes.'),
 ('Preciso de pedido médico?','Depende do serviço. Algumas fisioterapias, exames e terapias exigem pedido ou atestado. Outras não.'),
 ('Como sei se há vaga em uma atividade?','As vagas mudam conforme a turma. Consulte o setor responsável antes de comparecer. Na hidroginástica, as vagas são limitadas.'),
 ('Onde faço uma reclamação ou sugestão?','Na Ouvidoria, por telefone, WhatsApp ou atendimento presencial.'),
]
faqs=[dict(id=f'faq-{i+1}',pergunta=q,resposta=a,publicado='SIM') for i,(q,a) in enumerate(faqs)]
texts={
 'nav.inicio':'Início','nav.explorar':'Encontrar um serviço','nav.servicos':'Serviços','nav.como':'Como funciona','nav.unidades':'Unidades','nav.duvidas':'Dúvidas','nav.associado':'Já sou associado','nav.associacao':'Quero me associar',
 'hero.selo':'TEM MAIS AQUI','hero.titulo':'Encontre o que você procura na AAPVR.',
 'hero.texto':'Consultas, odontologia, terapias, atividades físicas, cultura, lazer e orientação. Veja onde cada serviço acontece, quem pode participar e como dar o próximo passo.',
 'hero.nota':'As condições variam por serviço e unidade. Aqui você confere o caminho antes de falar com a equipe.',
 'home.titulo_opcoes':'O que você quer fazer hoje?','home.mais_titulo':'Saúde? Tem mais aqui.',
 'home.mais_texto':'Muita gente conhece a AAPVR por uma consulta. Depois descobre atividades, oficinas, espaços de convivência, lazer e orientação para diferentes momentos da vida.',
 'home.regras_titulo':'Antes de escolher, entenda como funciona.',
 'home.associacao_titulo':'Precisa ser aposentado para fazer parte da AAPVR?',
 'home.associacao_texto':'Não. O titular pode ter 18 anos ou mais. Também existem possibilidades para dependentes, conforme vínculo e documentação. A equipe Comercial confirma a categoria adequada para cada caso.',
 'home.card.1.titulo':'Preciso de uma consulta',
 'home.card.1.texto':'Veja as especialidades disponíveis em cada unidade e entenda como funciona o agendamento.',
 'home.card.2.titulo':'Quero cuidar do corpo e da mente',
 'home.card.2.texto':'Conheça fisioterapias, psicologia, acupuntura, osteopatia e outras possibilidades de cuidado.',
 'home.card.3.titulo':'Quero me movimentar',
 'home.card.3.texto':'Veja hidroginástica, Pilates, musculação, ginástica, yoga, futebol e dança.',
 'home.card.4.titulo':'Quero aprender e conviver',
 'home.card.4.texto':'Explore oficinas, coral, inclusão digital, Cultura Viva, teatro, bordado e encontros.',
 'home.card.5.titulo':'Quero aproveitar meu tempo livre',
 'home.card.5.texto':'Conheça a Sede Campestre, os bailes e outras opções de lazer.',
 'home.card.6.titulo':'Preciso de orientação',
 'home.card.6.texto':'Encontre Assistência Social, Jurídico, Previdenciário, Secretaria e Ouvidoria.',
 'home.historias_titulo':'Quem usa conta melhor.','home.historias_texto':'Conheça histórias reais de pessoas que encontraram diferentes formas de participar da AAPVR.',
 'explorar.titulo':'O que você quer resolver agora?', 'explorar.texto':'Escolha uma opção. A gente mostra os caminhos disponíveis e o que você precisa confirmar.',
 'servicos.titulo':'Tudo o que você pode encontrar na AAPVR.','servicos.texto':'Escolha uma área para ver serviços, público, requisitos, unidade e canal de atendimento.',
 'saude.titulo':'Qual especialidade você procura?','saude.texto':'Confira as especialidades por unidade. A agenda e a disponibilidade precisam ser confirmadas no momento da solicitação.',
 'saude.aviso':'As consultas são eletivas. Em caso de urgência ou emergência, procure o atendimento adequado da rede pública ou privada.',
 'odontologia.titulo':'Qual atendimento odontológico você procura?',
 'terapias-reabilitacao.titulo':'Terapias e reabilitação: veja o que existe e o que você precisa.',
 'movimento.titulo':'Qual atividade faz sentido para a sua rotina?',
 'convivencia-aprendizado.titulo':'Quer aprender, criar ou conhecer outras pessoas?',
 'lazer.titulo':'O que dá para fazer na Sede Campestre?',
 'orientacao-direitos.titulo':'Qual setor pode ajudar você?',
 'como.titulo':'Antes de escolher, entenda como funciona.',
 'consultas.titulo':'Como marcar uma consulta na AAPVR?',
 'consultas.texto':'O caminho é simples, mas a data disponível varia conforme a especialidade, a unidade, a agenda profissional e a procura.',
 'associacao.titulo':'Quer se associar? Entenda como funciona antes de decidir.',
 'associacao.texto':'A associação oferece acesso a consultas eletivas, serviços e atividades conforme categoria, carência, agenda e requisitos de cada área. Entenda o funcionamento e fale com o Comercial para conhecer as condições de adesão.',
 'associado.titulo':'O que você precisa resolver hoje?',
 'associado.texto':'Escolha o assunto. Você recebe o canal correto sem precisar descobrir qual setor procurar.',
 'duvidas.titulo':'Dúvidas frequentes',
 'contato.titulo':'Com qual assunto você precisa de ajuda?',
 'contato.texto':'Escolha uma opção para falar com o setor certo.',
 'historias.titulo':'Quem usa conta melhor.',
 'historias.texto':'Depoimentos reais e autorizados serão publicados aqui. Nenhum depoimento de demonstração será exibido.',
 'rodape.aviso':'As informações podem mudar. Confirme agenda, vagas e documentos com o setor responsável antes de comparecer. Para condições comerciais, fale com o Comercial.',
}
content={'texts':texts,'categories':cat,'services':services,'units':units,'contacts':[c for c in contacts if c['publicado']=='SIM'],'faqs':faqs}
(root/'lib'/'seed.json').write_text(json.dumps(content,ensure_ascii=False,indent=2),encoding='utf-8')
def rows(filename,fields,data):
    with (root/'cms'/filename).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.writer(f,delimiter=',');w.writerow(fields)
        for item in data:
            w.writerow(['|'.join(str(x) for x in item.get(col,'')) if isinstance(item.get(col),list) else item.get(col,'') for col in fields])
rows('TEXTOS.csv',['chave','texto','publicado'],[dict(chave=k,texto=v,publicado='SIM') for k,v in texts.items()])
rows('AREAS.csv',['id','nome','resumo','icone','publicado'],[{**x,'publicado':'SIM'} for x in cat])
rows('SERVICOS.csv',['id','categoria','nome','resumo','publico','idade','acesso','requisitos','unidades','status','canal','publicado'],services)
rows('UNIDADES.csv',['id','nome','cidade','endereco','horario','especialidades','publicado'],units)
rows('CONTATOS.csv',['id','nome','telefone','whatsapp','observacao','publicado'],contacts)
rows('DUVIDAS.csv',['id','pergunta','resposta','publicado'],faqs)
print(len(texts),'textos',len(services),'servicos',len(units),'unidades',len(faqs),'duvidas')
