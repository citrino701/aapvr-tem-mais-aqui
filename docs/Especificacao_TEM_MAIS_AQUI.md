# AAPVR | TEM MAIS AQUI

## Especificação de copy, rotas e jornada do hub

Versão de trabalho para desenvolvimento do aplicativo web.

## 1. Decisão central do produto

O hub não deve funcionar como um catálogo de departamentos. Ele deve começar pela necessidade da pessoa, explicar as condições reais e encaminhar ao setor correto.

O produto precisa cumprir quatro funções:

1. Mostrar que a AAPVR reúne saúde, movimento, convivência, aprendizado, lazer e orientação.
2. Ajudar a pessoa a encontrar um serviço sem precisar conhecer a estrutura interna da AAPVR.
3. Explicar associação, agendamento, requisitos, vagas e limites com transparência.
4. Transformar interesse em uma ação rastreável, como consultar um serviço, acessar o agendamento ou falar com a equipe.

### Mensagem principal

**TEM MAIS AQUI**

### Usos autorizados do mote

1. **TEM MAIS AQUI**
2. **Saúde? Tem mais aqui.**
3. **Tem mais aqui além da saúde.**

Não criar novas variações do mote sem aprovação.

## 2. Princípios de experiência

### Começar pela pessoa

Em vez de abrir com setores como CPSI, CISA ou Assistência Social, o hub pergunta o que a pessoa quer resolver.

### Mostrar condições antes do contato

Cada serviço deve informar, quando aplicável:

1. Para quem é.
2. Faixa etária.
3. Se atende não associados.
4. Se exige pedido ou atestado.
5. Onde consultar as condições comerciais, quando necessário.
6. Em qual unidade acontece.
7. Como consultar vagas ou agenda.

### Não prometer acesso imediato

A existência de uma especialidade ou atividade não significa vaga imediata. A disponibilidade depende da agenda, da unidade, da procura e das regras de cada serviço.

### Não esconder limites

A AAPVR não é plano de saúde. Não oferece pronto atendimento, internação ou cirurgia hospitalar. Há pequenas cirurgias ambulatoriais, conforme indicação, agenda e regras do serviço.

### Condições comerciais

As condições variam conforme o serviço e a categoria de associação. O hub apresenta os requisitos de uso e encaminha dúvidas financeiras ao Comercial.

## 3. Navegação principal

### Menu do cabeçalho

| Rótulo | Destino |
|---|---|
| Início | `/` |
| Encontrar um serviço | `/explorar` |
| Serviços | `/servicos` |
| Como funciona | `/como-funciona` |
| Unidades | `/unidades` |
| Dúvidas | `/duvidas` |
| Já sou associado | `/associado` |
| Quero me associar | `/associacao` |

### CTA fixo no celular

**Encontrar um serviço**

Destino: `/explorar`

## 4. Mapa de rotas

| Rota | Função |
|---|---|
| `/` | Apresentar o ecossistema e iniciar a descoberta. |
| `/explorar` | Guiar a pessoa pela necessidade, cidade e condição de acesso. |
| `/servicos` | Exibir todas as áreas disponíveis. |
| `/servicos/saude` | Especialidades médicas por unidade. |
| `/servicos/saude/[especialidade]` | Mostrar unidades e caminho de agendamento. |
| `/servicos/odontologia` | Apresentar tratamentos odontológicos e forma de contato. |
| `/servicos/terapias-reabilitacao` | Reunir terapias, psicologia e fisioterapias. |
| `/servicos/movimento` | Reunir atividades físicas e práticas corporais. |
| `/servicos/convivencia-aprendizado` | Reunir oficinas, projetos culturais e grupos. |
| `/servicos/lazer` | Apresentar a Sede Campestre e seus espaços. |
| `/servicos/orientacao-direitos` | Reunir Assistência Social, Jurídico, Previdenciário, Secretaria e Ouvidoria. |
| `/como-funciona` | Explicar as regras gerais de uso. |
| `/como-funciona/consultas` | Explicar a jornada de agendamento. |
| `/associacao` | Explicar quem pode se associar, documentos, condições e limites. |
| `/unidades` | Comparar unidades, endereços, horários e especialidades. |
| `/unidades/aterrado` | Detalhar a unidade Aterrado. |
| `/unidades/barra-do-pirai` | Detalhar a unidade Barra do Piraí. |
| `/unidades/pinheiral` | Detalhar a unidade Pinheiral. |
| `/associado` | Resolver demandas de quem já é associado. |
| `/duvidas` | Responder dúvidas frequentes. |
| `/contato` | Direcionar ao setor correto. |
| `/historias` | Reunir depoimentos reais e autorizados. |

## 5. Página inicial

### Cabeçalho principal

**Selo**

TEM MAIS AQUI

**H1**

Encontre o que você procura na AAPVR.

**Texto**

Consultas, odontologia, terapias, atividades físicas, cultura, lazer e orientação. Veja onde cada serviço acontece, quem pode participar e como dar o próximo passo.

**CTA principal**

Encontrar um serviço

Destino: `/explorar`

**CTA secundário**

Entender a associação

Destino: `/associacao`

**Nota de transparência**

As condições variam por serviço e unidade. Aqui você confere o caminho antes de falar com a equipe.

### Bloco: Por onde você quer começar?

**Título**

O que você quer fazer hoje?

**Card 1**

Título: Preciso de uma consulta

Texto: Veja as especialidades disponíveis em cada unidade e entenda como funciona o agendamento.

CTA: Ver especialidades

Destino: `/servicos/saude`

**Card 2**

Título: Quero cuidar do corpo e da mente

Texto: Conheça fisioterapias, psicologia, acupuntura, osteopatia e outras possibilidades de cuidado.

CTA: Ver terapias e reabilitação

Destino: `/servicos/terapias-reabilitacao`

**Card 3**

Título: Quero me movimentar

Texto: Veja hidroginástica, Pilates, musculação, ginástica, yoga, futebol e dança.

CTA: Ver atividades

Destino: `/servicos/movimento`

**Card 4**

Título: Quero aprender e conviver

Texto: Explore oficinas, coral, inclusão digital, Cultura Viva, teatro, bordado e encontros.

CTA: Ver oficinas e projetos

Destino: `/servicos/convivencia-aprendizado`

**Card 5**

Título: Quero aproveitar meu tempo livre

Texto: Conheça a Sede Campestre, os bailes e outras opções de lazer.

CTA: Ver lazer

Destino: `/servicos/lazer`

**Card 6**

Título: Preciso de orientação

Texto: Encontre Assistência Social, Jurídico, Previdenciário, Secretaria e Ouvidoria.

CTA: Encontrar orientação

Destino: `/servicos/orientacao-direitos`

### Bloco: Saúde? Tem mais aqui.

**Título**

Saúde? Tem mais aqui.

**Texto**

Muita gente conhece a AAPVR por uma consulta. Depois descobre atividades, oficinas, espaços de convivência, lazer e orientação para diferentes momentos da vida.

**CTA**

Conhecer tudo o que existe

Destino: `/servicos`

### Bloco de transparência

**Título**

Antes de escolher, entenda como funciona.

**Item 1**

Título: AAPVR não é plano de saúde

Texto: O atendimento é ambulatorial e eletivo. A associação não oferece pronto atendimento, internação ou cirurgia hospitalar.

**Item 2**

Título: A agenda varia

Texto: O prazo depende da especialidade, da unidade, da agenda profissional e da procura.

**Item 3**

Título: Cada serviço tem suas regras

Texto: Alguns serviços exigem pedido médico, atestado, idade mínima ou matrícula ativa. Condições comerciais devem ser consultadas com o Comercial.

**Item 4**

Título: Nem todo serviço é exclusivo para associados

Texto: Há atendimentos e atividades abertos a não associados. Consulte a regra de cada opção.

**CTA**

Ver como funciona

Destino: `/como-funciona`

### Bloco de associação

**Título**

Precisa ser aposentado para fazer parte da AAPVR?

**Resposta**

Não. O titular pode ter 18 anos ou mais. Também existem possibilidades para dependentes, conforme vínculo e documentação. A equipe Comercial confirma a categoria adequada para cada caso.

**CTA**

Entender a associação

Destino: `/associacao`

### Bloco de histórias

**Título**

Quem usa conta melhor.

**Texto**

Conheça histórias reais de pessoas que encontraram diferentes formas de participar da AAPVR.

**CTA**

Ver histórias

Destino: `/historias`

Não publicar depoimentos inventados. Cada fala precisa ter autorização e preservar o sentido original.

## 6. Explorador guiado

### Tela 1

**H1**

O que você quer resolver agora?

**Texto**

Escolha uma opção. A gente mostra os caminhos disponíveis e o que você precisa confirmar.

**Opções**

1. Encontrar uma consulta.
2. Cuidar do corpo e da mente.
3. Praticar uma atividade.
4. Aprender ou conviver.
5. Aproveitar a Sede Campestre.
6. Buscar orientação.
7. Entender a associação.
8. Resolver algo como associado.

### Caminho: Encontrar uma consulta

**Pergunta 1**

Em qual cidade você quer atendimento?

Opções: Volta Redonda, Barra do Piraí, Pinheiral, Ainda não sei.

**Pergunta 2**

Qual especialidade você procura?

Campo: busca por nome da especialidade.

**Resultado**

Título: Encontramos estas opções.

Texto: A disponibilidade depende da agenda atual. Escolha uma unidade para ver como solicitar o atendimento.

CTA por resultado: Ver unidade e agendamento.

**Estado sem resultado**

Título: Esta especialidade não aparece na unidade escolhida.

Texto: Tente outra unidade ou fale com a Central para confirmar alternativas.

CTAs: Ver outras unidades / Falar com a Central.

### Caminho: Cuidar do corpo e da mente

**Pergunta**

O que você procura?

Opções: Fisioterapia, Psicologia, Acupuntura, Osteopatia, Reabilitação labiríntica, Hidroterapia, Audiometria, Fonoaudiologia, Ainda não sei.

**Resultado**

Título: Veja o que precisa para participar.

Texto: Confira público, documentos, pedido médico e canal de agendamento antes de entrar em contato. Para condições comerciais, fale com o Comercial.

CTA: Ver detalhes.

### Caminho: Praticar uma atividade

**Pergunta 1**

Qual atividade combina com o que você procura?

Opções: Hidroginástica, Pilates, Musculação, Ginástica, Yoga, Futebol, Dança de salão, Teatro, Outra atividade.

**Pergunta 2**

Você já é associado?

Opções: Sim, Ainda não, Quero entender as condições.

**Resultado**

Título: Confira a forma de participação.

Texto: Algumas atividades são exclusivas para associados. Outras também recebem não associados. Vagas, horários e documentos precisam ser confirmados com o setor responsável.

CTA: Ver como participar.

### Caminho: Buscar orientação

**Pergunta**

Qual assunto você precisa resolver?

| Escolha | Destino |
|---|---|
| Direitos do consumidor, golpes, cobranças ou empréstimos | Jurídico |
| INSS, benefícios, tributos ou Imposto de Renda | Previdenciário |
| Oficinas, convivência, vínculos ou avaliação social | Assistência Social |
| Cadastro, carteira, carnê, boleto ou débito automático | Secretaria |
| Reclamação, elogio, sugestão ou dúvida | Ouvidoria |

## 7. Página de serviços

### Abertura

**H1**

Tudo o que você pode encontrar na AAPVR.

**Texto**

Escolha uma área para ver serviços, público, requisitos, unidade e canal de atendimento.

### Categorias

| Categoria | Copy do card | Destino |
|---|---|---|
| Consultas e especialidades | Encontre a especialidade e veja em qual unidade há atendimento. | `/servicos/saude` |
| Odontologia | Conheça as áreas do Centro Odontológico e como solicitar atendimento. | `/servicos/odontologia` |
| Terapias e reabilitação | Veja fisioterapias, psicologia, acupuntura e outras formas de acompanhamento. | `/servicos/terapias-reabilitacao` |
| Movimento | Encontre atividades para força, mobilidade, condicionamento e convivência. | `/servicos/movimento` |
| Convivência e aprendizado | Conheça oficinas, projetos culturais, coral e inclusão digital. | `/servicos/convivencia-aprendizado` |
| Lazer | Veja o que existe na Sede Campestre e quem pode utilizar. | `/servicos/lazer` |
| Orientação e direitos | Descubra qual setor pode ajudar em cada assunto. | `/servicos/orientacao-direitos` |

## 8. Consultas e especialidades

### Abertura

**H1**

Qual especialidade você procura?

**Texto**

Confira as especialidades por unidade. A agenda e a disponibilidade precisam ser confirmadas no momento da solicitação.

**Aviso**

As consultas são eletivas. Em caso de urgência ou emergência, procure o atendimento adequado da rede pública ou privada.

### Unidade Aterrado

**Endereço**

Rua 535, nº 835, Nossa Senhora das Graças, Volta Redonda.

**Horário geral informado**

Segunda a quinta, das 7h às 18h. Sexta, das 7h às 17h.

**Especialidades**

Alergologia, Angiologia, Cardiologia, Clínica Médica, Dermatologia, Endocrinologia, Fitoterapia, Gastroenterologia, Geriatria, Ginecologia, Hematologia, Homeopatia, Mastologia, Nefrologia, Neurologia, Nutrição Clínica, Nutrição Oncológica, Oftalmologia, Otorrinolaringologia, Ortopedia, Pediatria, Pequenas Cirurgias, Pneumologia, Proctologia, Psiquiatria, Reumatologia e Urologia.

CTA: Ver como agendar.

### Unidade Barra do Piraí

**Endereço**

Rua Cristiano Otoni, nº 206, Centro, Barra do Piraí.

**Horário geral informado**

Segunda a sexta, das 7h às 17h.

**Especialidades e atendimentos**

Alergologia, Angiologia, Cardiologia, Clínica Médica, Dermatologia, Endocrinologia, Enfermagem, Fisioterapia, Gastroenterologia, Geriatria, Ginecologia, Neurologia, Nutrição, Oftalmologia, Ortopedia, Pediatria, Proctologia, Psiquiatria e Reumatologia.

CTA: Ver como agendar.

### Unidade Pinheiral

**Endereço**

Rua José Gomes da Silva Júnior, nº 135, Centro, Pinheiral.

**Horário geral informado**

Segunda a sexta, das 8h às 17h.

**Especialidades**

Cardiologia, Clínica Médica, Endocrinologia, Gastroenterologia, Geriatria, Ginecologia, Neurologia, Nutrição e Ortopedia.

CTA: Ver como agendar.

### Página de cada especialidade

Rota: `/servicos/saude/[especialidade]`

**H1**

{Nome da especialidade}

**Texto**

Veja em quais unidades há atendimento em {nome da especialidade} e como solicitar uma consulta.

**Bloco por unidade**

1. Nome da unidade.
2. Endereço.
3. Público atendido.
4. Como solicitar agendamento.
5. Aviso de disponibilidade.

**Aviso padrão**

A disponibilidade varia conforme a agenda da unidade. A Central informa as datas no momento da solicitação.

**CTA**

Solicitar agendamento.

Destino: `/como-funciona/consultas?especialidade={slug}&unidade={slug}`

## 9. Como funciona o agendamento de consultas

### Abertura

**H1**

Como marcar uma consulta na AAPVR?

**Texto**

O caminho é simples, mas a data disponível varia conforme a especialidade, a unidade, a agenda profissional e a procura.

### Passos

**Passo 1**

Escolha a especialidade e a unidade.

**Passo 2**

Confira se sua matrícula está ativa e se o período de carência já terminou.

**Passo 3**

Solicite pelo portal do associado ou pela Central de Agendamento.

**Passo 4**

A equipe informa a disponibilidade atual.

**Passo 5**

Confirme a consulta. Se não puder comparecer, solicite cancelamento ou transferência para que a agenda possa ser reorganizada.

### Canais

**Portal do associado**

Texto do botão: Agendar pelo portal.

Destino externo: `https://associado.aapvr.com.br/`

**Telefone**

(24) 2102-1909, opção 7.

Atendimento informado: segunda a sexta, das 8h às 14h.

**WhatsApp de suporte ao Call Center**

(24) 2102-1952, opção 5.

### Mensagem de transparência

**Título**

Por que a consulta pode demorar?

**Texto**

Cada especialidade tem uma agenda própria. A procura, a frequência de atendimento do profissional e a disponibilidade da unidade interferem no prazo. Por isso, a AAPVR não deve prometer atendimento imediato. A Central informa a opção disponível no momento do contato.

## 10. Odontologia

### Abertura

**H1**

Qual atendimento odontológico você procura?

**Texto**

O Centro Odontológico atende associados e não associados. Veja as áreas disponíveis e confirme avaliação e agenda com a equipe.

### Especialidades

| Serviço | Copy curta |
|---|---|
| Cirurgia Oral | Extrações em geral. |
| Dentística | Restaurações, obturações, clareamento, facetas e emergências odontológicas. |
| Endodontia | Tratamento de canal. |
| Estomatologia | Prevenção e diagnóstico de doenças da boca, inclusive no acompanhamento de pacientes em radioterapia ou quimioterapia. |
| Odontopediatria | Atendimento odontológico a partir dos 4 anos. |
| Ortodontia | Aparelhos fixos e móveis. |
| Oclusão | Avaliação e tratamento de DTM, bruxismo, estalos na articulação, ronco e apneia. |
| Periodontia | Prevenção e tratamento da gengiva, com profilaxia e limpeza. |
| Prótese | Próteses totais e removíveis, coroas, pinos e blocos. |
| Implantodontia | Implantes dentários, conforme avaliação. |

### Condições

Texto: Menores devem estar acompanhados pelo responsável. Confirme avaliação e disponibilidade com o Centro Odontológico. Para condições comerciais, fale com o Comercial.

**CTA**

Falar com o Centro Odontológico.

**Canais informados**

Telefone: (24) 2102-1909, opção 4.

Telefone: (24) 2102-1945, opção 4.

WhatsApp: (24) 2102-1952, opção 4.

## 11. Terapias e reabilitação

### Abertura

**H1**

Terapias e reabilitação: veja o que existe e o que você precisa.

**Texto**

Cada atendimento tem requisitos próprios. Consulte o público, os documentos e a agenda antes de solicitar uma vaga. O Comercial informa as condições financeiras.

### Cards

| Serviço | Copy curta | Informação essencial |
|---|---|---|
| Acupuntura | Aplicação de agulhas em pontos específicos, realizada como terapia complementar. | Associados e não associados de todas as idades. Não exige pedido médico. Há avaliação. |
| Psicologia | Atendimento psicológico para diferentes fases da vida. | A partir de 8 anos. Não exige pedido médico. |
| Fisioterapia traumato ortopédica | Acompanhamento voltado à recuperação de funções musculares e esqueléticas. | Exige pedido médico. Associados e não associados. |
| Fisioterapia neurológica | Atendimento para alterações relacionadas às funções neurológicas. | Exige pedido médico. Associados e não associados. |
| Fisioterapia respiratória | Exercícios específicos para condições que atingem o sistema respiratório. | Exige pedido médico. Confirmar público e agenda. |
| Fisioterapia pélvica | Trabalho de fortalecimento do assoalho pélvico. | Exige pedido médico. Associados e não associados. |
| Reabilitação labiríntica | Tratamento voltado à redução de tontura e desequilíbrio. | Não exige pedido médico no checklist. Associados e não associados. |
| Osteopatia | Abordagem manual para o corpo e suas dores. | Não exige pedido médico. Associados e não associados. |
| Hidroterapia | Exercícios terapêuticos em piscina aquecida. | A partir de 18 anos. Exige pedido médico e atestado dermatológico. |
| Audiometria | Exame para avaliar a capacidade de ouvir e interpretar sons. | Exige pedido médico. Status e agenda precisam ser confirmados. |
| Fonoaudiologia | Atendimento relacionado à comunicação humana. | Exige pedido médico. Status e agenda precisam ser confirmados. |

**CTA padrão**

Ver requisitos e consultar agenda.

**Contato do CPSI informado**

Telefone: (24) 2102-1988.

WhatsApp: (24) 99287-1721.

## 12. Movimento

### Abertura

**H1**

Qual atividade faz sentido para a sua rotina?

**Texto**

Compare objetivo, público, documentos e forma de participação. A disponibilidade depende das turmas e vagas atuais.

### Cards

**Hidroginástica**

Texto: Exercício aeróbico na piscina para trabalhar condicionamento físico.

Condição: Exclusiva para associados acima de 18 anos. Exige atestado médico e atestado dermatológico originais.

Aviso obrigatório: **As vagas são limitadas. Consulte a disponibilidade antes de separar a documentação.**

CTA: Consultar vagas da hidroginástica.

**Hidroterapia**

Texto: Exercícios terapêuticos em piscina aquecida, com acompanhamento e finalidade de reabilitação.

Condição: Associados e não associados acima de 18 anos. Exige pedido médico e atestado dermatológico.

CTA: Ver requisitos da hidroterapia.

**Comparativo curto**

Título: Hidroginástica ou hidroterapia: qual faz mais sentido para você?

Texto: A hidroginástica é uma atividade física coletiva. A hidroterapia tem finalidade terapêutica e exige pedido médico. Em ambas, é preciso confirmar documentação, agenda e vagas.

**Yoga**

Texto: Prática que combina postura, respiração, meditação e relaxamento.

Condição: Associados acima de 18 anos. Exige atestado médico original.

**Ginástica**

Texto: Atividade para trabalhar força, flexibilidade, equilíbrio e coordenação.

Condição: Associados acima de 18 anos. Exige atestado médico original.

**Pilates**

Texto: Atividade voltada ao fortalecimento muscular e à elasticidade.

Condição: Associados e não associados acima de 18 anos. Exige atestado médico original.

**Musculação**

Texto: Exercícios para condicionamento físico e fortalecimento muscular.

Condição: Associados acima de 18 anos. Exige atestado original do cardiologista.

**Futebol Arte**

Texto: Treinos de futebol para associados, conforme regra da unidade.

Condição: Exige atestado ou laudo de aptidão. Em Barra do Piraí, a regra informada é acima de 50 anos.

**Dança de salão**

Texto: Aulas para aprender passos, praticar movimento e conviver.

Condição: Há turmas em Volta Redonda e Barra do Piraí. Associados e não associados podem consultar inscrição e disponibilidade. O Comercial informa as condições financeiras.

## 13. Convivência e aprendizado

### Abertura

**H1**

Quer aprender, criar ou conhecer outras pessoas?

**Texto**

Veja oficinas, projetos e encontros. Algumas atividades são exclusivas para associados. Outras são abertas à comunidade.

### Cards

| Atividade | Copy curta | Regra principal |
|---|---|---|
| Serviço de Convivência e Fortalecimento de Vínculos | Encontros para convivência familiar, comunitária e intergeracional. | Associados, com inscrição e avaliação da Assistência Social. |
| Oficina de Artesanato | Desenvolvimento de habilidades manuais, criatividade e produção artesanal. | Associados. Inscrição na Assistência Social. |
| Oficina de Teclado | Aprendizado musical e desenvolvimento de coordenação. | Associados. Idade mínima de 12 anos, com responsável quando necessário. |
| Coral Alvorada | Música, memória, expressão e convivência. | Associados com mais de 60 anos, após avaliação. |
| Inclusão Digital e Educação Financeira | Apoio no uso de celulares, computadores e recursos digitais, com orientações financeiras. | Pessoas com 60 anos ou mais e alfabetizadas. |
| Cultura Viva | Oficinas que valorizam saberes, talentos e tradições. | Aberto à população de qualquer idade. Menores com acompanhante. |
| Memórias que Dançam | Oficinas, apresentações e conversas sobre danças culturais brasileiras. | Associados em dia. |
| Tarde Cultural | Encontro cultural aberto ao público geral, conforme programação. | Confirmar data e regras de cada edição. |
| Teatro | Aulas de expressão e prática teatral. | Associados e não associados, mediante inscrição e disponibilidade. |
| Bordado | Aula prática de bordado em Barra do Piraí. | Associados e não associados, mediante inscrição e disponibilidade. |

**CTA padrão**

Ver como participar.

**Contato da Assistência Social informado**

Telefone: (24) 2102-1951.

WhatsApp: (24) 98141-4445.

## 14. Lazer e Sede Campestre

### Abertura

**H1**

O que dá para fazer na Sede Campestre?

**Texto**

Associados e visitantes encontram opções de lazer, alimentação e espaços para grupos. Veja as regras de cada atividade antes de ir.

### Cards

**Pesque e Pague**

Texto: Pesca, preparo do pescado e opções de porções no local.

Regra: Associados têm entrada e pesca liberadas. Não associados pagam para pescar. Confirmar funcionamento antes da visita.

**Restaurante**

Texto: Self service por peso nos fins de semana e feriados, conforme funcionamento.

Regra: Associados podem ter condição especial mediante apresentação da carteira.

**Parque Aquático**

Texto: Duas piscinas disponíveis nos dias de funcionamento.

Regra: Associados têm entrada liberada. Visitantes acima de 10 anos pagam entrada. Crianças menores devem apresentar documento e estar acompanhadas.

**Parque Infantil**

Texto: Brinquedos para crianças de até 12 anos.

Regra: Uso gratuito para associados e visitantes, conforme funcionamento da Sede.

**Campo de Futebol**

Texto: Campo com marcações e rede, sujeito à disponibilidade e às locações do espaço.

**Área do Lago**

Texto: Espaço com churrasqueira, cozinha, palco e banheiros para encontros e eventos.

Regra: Utilização mediante disponibilidade, reunião e contrato.

**Pacotes para grupos e eventos**

Texto: Pacotes personalizados para grupos, conforme número de pessoas, disponibilidade e contrato.

**CTA principal**

Consultar funcionamento e disponibilidade.

**Contato informado**

Telefone: (24) 2102-1948.

## 15. Orientação e direitos

### Abertura

**H1**

Qual setor pode ajudar você?

**Texto**

Escolha o assunto. O hub indica o setor e o canal correto.

### Cards

**Assistência Social**

Texto: Orientação, convivência, fortalecimento de vínculos, inscrições em atividades e acesso a informações sobre direitos e participação cidadã.

CTA: Falar com a Assistência Social.

**Jurídico**

Texto: Orientação sobre golpes, empréstimos consignados, cobranças indevidas, transações não reconhecidas, direitos civis, benefícios previdenciários e isenção de Imposto de Renda.

Condição: Atendimento prioritário para associados, mediante triagem e agendamento.

CTA: Solicitar orientação jurídica.

Telefone: (24) 2102-1918.

WhatsApp: (24) 2102-1952, opção 6.

**Previdenciário**

Texto: Orientação sobre INSS, benefícios, tributos, Imposto de Renda e pendências ligadas à Previdência Social.

Condição: Gratuito para associados.

CTA: Falar com o Previdenciário.

Telefone: (24) 2102-1910.

**Secretaria**

Texto: Atualização cadastral, carteira, carnê, boleto, declarações, inclusão ou retirada de débito automático e outras demandas documentais.

CTA: Falar com a Secretaria.

Telefone: (24) 2102-1904.

WhatsApp: (24) 2102-1952, opção 3.

**Ouvidoria**

Texto: Canal para informações, dúvidas, sugestões, elogios e reclamações, com registro e encaminhamento ao setor responsável.

CTA: Falar com a Ouvidoria.

Telefones: (24) 2102-1970 e (24) 2102-1946.

WhatsApp: (24) 2102-1952, opção 7.

## 16. Associação

### Abertura

**Selo**

TEM MAIS AQUI

**H1**

Quer se associar? Entenda como funciona antes de decidir.

**Texto**

A associação oferece acesso a consultas eletivas, serviços e atividades conforme categoria, carência, agenda e requisitos de cada área. Entenda o funcionamento e fale com o Comercial para conhecer as condições de adesão.

### Quem pode se associar

**Título**

Precisa ser aposentado ou pensionista?

**Resposta**

Não. O titular pode ter 18 anos ou mais. Dependentes podem ser incluídos conforme idade, vínculo e documentação. A equipe Comercial confirma a categoria adequada.

### O que a associação permite conhecer e utilizar

**Texto**

Com a matrícula ativa, o associado pode utilizar os serviços destinados à sua categoria, conforme carência, agenda, vagas e requisitos. Consulte as regras de cada serviço. O Comercial explica as condições de adesão e os custos aplicáveis.

### O que a AAPVR não é

**Texto**

A AAPVR não é plano de saúde. Não oferece pronto atendimento, internação ou cirurgia hospitalar. Quem busca exclusivamente cobertura hospitalar precisa avaliar outra solução.

### Disponibilidade

**Texto**

Ter uma especialidade na rede não garante vaga imediata. A data depende da unidade, da agenda profissional e da procura. O prazo é informado pela Central no momento da solicitação.

### Documentos do titular

1. Documento de identidade.
2. CPF.
3. Comprovante de residência.
4. Cartão SUS.

### Documentos de dependentes

1. Documento de identidade.
2. CPF.
3. Cartão SUS.
4. Documento que comprove o vínculo, quando aplicável.
5. Comprovante de curso superior para filhos de 21 a 24 anos, quando aplicável.

### Condições de adesão

**Copy pública**

Quer entender as condições para você e seus dependentes? Fale com o Comercial. A equipe explica as categorias e responde às dúvidas antes da adesão.

**CTA**

Consultar condições com o Comercial.

Destino: `/contato?assunto=condicoes-comerciais`

### CTA

**Botão**

Falar com a equipe Comercial.

Destino: `/contato?assunto=associacao`

**Mensagem pronta para WhatsApp**

Olá. Conheci a AAPVR pelo hub TEM MAIS AQUI e quero entender as categorias, as condições de adesão e como funciona a associação.

## 17. Área de quem já é associado

### Abertura

**H1**

O que você precisa resolver hoje?

**Texto**

Escolha o assunto. Você recebe o canal correto sem precisar descobrir qual setor procurar.

### Opções

| Opção | Copy | Destino |
|---|---|---|
| Marcar consulta | Escolha a especialidade e acesse o portal ou a Central. | `/como-funciona/consultas` |
| Confirmar, transferir ou cancelar consulta | Veja os canais do Call Center. | `/contato?assunto=consulta` |
| Conhecer outros serviços | Descubra atividades e atendimentos que você pode ainda não conhecer. | `/servicos` |
| Resolver boleto ou contribuição existente | Fale com a Secretaria sobre carnê, boleto, débito ou status financeiro. | `/contato?assunto=financeiro` |
| Consultar condições comerciais | Fale com o Comercial sobre adesão e custos dos serviços. | `/contato?assunto=condicoes-comerciais` |
| Atualizar cadastro ou carteira | Veja o canal da Secretaria. | `/contato?assunto=secretaria` |
| Fazer uma reclamação ou sugestão | Registre a demanda na Ouvidoria. | `/contato?assunto=ouvidoria` |
| Falar sobre permanência ou cancelamento | Converse com o Relacionamento para entender sua situação e os próximos passos. | `/contato?assunto=relacionamento` |

## 18. Dúvidas frequentes

### Preciso ser aposentado para me associar?

Não. O titular pode ter 18 anos ou mais. Dependentes seguem regras de vínculo, idade e documentação.

### A AAPVR atende pessoas de outras idades?

Sim. Há consultas, odontologia, terapias e atividades para diferentes idades. A regra varia por serviço, então a página de cada opção informa o público correto.

### A AAPVR é um plano de saúde?

Não. A AAPVR oferece atendimento ambulatorial eletivo e outros serviços próprios. Não oferece pronto atendimento, internação ou cirurgia hospitalar.

### Posso usar algum serviço sem ser associado?

Sim. Alguns serviços recebem não associados, conforme as regras de cada área. Outros são exclusivos para associados. O Comercial informa as condições financeiras.

### Todos os serviços seguem a mesma condição de uso?

Não. Cada serviço tem regras específicas. Veja os requisitos na página correspondente e fale com o Comercial para conhecer as condições financeiras.

### Como marco uma consulta?

Pelo portal do associado ou pela Central de Agendamento. A data disponível depende da especialidade e da unidade.

### Quanto tempo demora para conseguir uma consulta?

Não existe um prazo único. A espera varia conforme a procura, a agenda profissional e a frequência de atendimento de cada especialidade.

### Todas as especialidades existem em todas as unidades?

Não. Aterrado, Barra do Piraí e Pinheiral possuem listas diferentes. Consulte a especialidade antes de escolher a unidade.

### Preciso de pedido médico?

Depende do serviço. Algumas fisioterapias, exames e terapias exigem pedido ou atestado. Outras não. A exigência aparece na página de cada opção.

### Como sei se há vaga em uma atividade?

As vagas mudam conforme a turma. Consulte o setor responsável antes de comparecer. Na hidroginástica, as vagas são limitadas.

### Onde faço uma reclamação ou sugestão?

Na Ouvidoria, por telefone, WhatsApp ou atendimento presencial.

## 19. Página de contato

### Abertura

**H1**

Com qual assunto você precisa de ajuda?

**Texto**

Escolha uma opção para falar com o setor certo.

### Roteamento

| Assunto | Destino | CTA |
|---|---|---|
| Consulta médica | Call Center | Ver canais de agendamento |
| Odontologia | Centro Odontológico | Falar com a Odonto |
| Terapias, fisioterapia e atividades do CPSI | CPSI | Consultar requisitos e vagas |
| Oficinas e Assistência Social | Assistência Social | Falar com a equipe |
| Sede Campestre | Administração da Sede | Consultar funcionamento |
| Jurídico | Setor Jurídico | Solicitar triagem |
| Previdenciário | Setor Previdenciário | Solicitar orientação |
| Cadastro, carteira, carnê ou boleto | Secretaria | Resolver com a Secretaria |
| Reclamação, elogio ou sugestão | Ouvidoria | Registrar manifestação |
| Associação | Comercial | Entender a associação |
| Condições comerciais de qualquer serviço | Comercial | Consultar condições |

### Mensagens prontas

**Consulta**

Olá. Vim pelo hub TEM MAIS AQUI e quero saber como solicitar uma consulta de {especialidade} na unidade {unidade}.

**Odontologia**

Olá. Vim pelo hub TEM MAIS AQUI e quero informações sobre avaliação e disponibilidade para {serviço odontológico}.

**Atividade ou terapia**

Olá. Vim pelo hub TEM MAIS AQUI e quero saber os requisitos e a disponibilidade para {serviço}.

**Associação**

Olá. Vim pelo hub TEM MAIS AQUI e quero entender as categorias, as condições de adesão, os documentos e como funciona a associação.

**Condições comerciais**

Olá. Vim pelo hub TEM MAIS AQUI e quero entender as condições comerciais de {serviço}.

**Ouvidoria**

Olá. Quero registrar uma {dúvida, sugestão, elogio ou reclamação} sobre {assunto}.

## 20. Modelo da página de serviço

Cada serviço deve usar a mesma estrutura de dados e de copy.

### Ordem recomendada

1. Nome do serviço.
2. Resumo em uma frase.
3. Para quem é.
4. Idade mínima ou público específico.
5. Associado, não associado ou ambos.
6. O que precisa levar.
7. Se exige pedido médico ou atestado.
8. CTA para o Comercial quando houver dúvida sobre condições financeiras.
9. Unidade.
10. Dias e horários, quando confirmados.
11. Disponibilidade ou vagas.
12. Canal responsável.
13. Data da última atualização.

### Copy do aviso dinâmico

As informações podem mudar. Confirme agenda, vagas e documentos com o setor responsável antes de comparecer. Para condições comerciais, fale com o Comercial.

### CTA dinâmico

Ver requisitos e falar com a equipe.

### CTA secundário para qualquer serviço

Consultar condições com o Comercial.

Destino: `/contato?assunto=condicoes-comerciais&servico={slug}`

## 21. Jornada do usuário

### Jornada 1: Pessoa chega procurando médico

Conteúdo ou anúncio > página inicial > Preciso de uma consulta > cidade > especialidade > unidade > como funciona o agendamento > portal ou Central.

Durante o caminho, o hub também apresenta outros serviços relacionados ao interesse, sem esconder as condições de acesso.

### Jornada 2: Associado conhece pouco do ecossistema

Stories, grupo ou QR Code > página inicial > Já sou associado > Conhecer outros serviços > categoria > página do serviço > setor responsável.

### Jornada 3: Pessoa considera se associar

Anúncio de consideração > `/associacao` > quem pode entrar > o que oferece > limites > documentos > condições de adesão com o Comercial.

### Jornada 4: Pessoa quer uma atividade

Conteúdo orgânico > página específica > público e requisitos > vagas > contato do setor.

### Jornada 5: Associado insatisfeito ou com dúvida

Grupo, busca ou menu > Já sou associado > assunto > regra clara > setor correto > registro ou solução.

## 22. Direcionamento por canal

| Canal | Destino recomendado |
|---|---|
| Link da bio | `/` |
| Stories de descoberta | Página do assunto ou `/explorar` |
| Grupo de WhatsApp | Página específica do serviço citado |
| Tráfego pago de topo | Conteúdo ou página específica, sem abrir direto no WhatsApp |
| Tráfego pago de consideração | `/como-funciona`, `/servicos/[categoria]` ou `/associacao` |
| Tráfego pago de conversão | `/associacao` com CTA para o Comercial |
| QR Code em unidade ou evento | Página relacionada à ação ou `/explorar` |

## 23. Rastreamento recomendado

### UTMs

**Instagram Stories**

`?utm_source=instagram&utm_medium=stories&utm_campaign=tem_mais_aqui&utm_content={nome_do_conteudo}`

**Link da bio**

`?utm_source=instagram&utm_medium=bio&utm_campaign=tem_mais_aqui`

**Grupo de WhatsApp**

`?utm_source=whatsapp&utm_medium=grupo&utm_campaign=tem_mais_aqui&utm_content={nome_do_conteudo}`

**Tráfego pago**

`?utm_source=meta&utm_medium=paid_social&utm_campaign=tem_mais_aqui&utm_content={criativo}`

### Eventos

1. `hub_view`
2. `audience_selected`
3. `interest_selected`
4. `city_selected`
5. `service_search`
6. `service_view`
7. `unit_selected`
8. `requirements_view`
9. `faq_open`
10. `schedule_external_click`
11. `whatsapp_click`
12. `association_cta_click`
13. `contact_department_selected`

Registrar também `service_id`, `unit_id`, `source`, `campaign` e `content` quando existirem.

## 24. Campos que precisam ser atualizáveis

Não deixar estes dados presos na copy do código:

1. Dias e horários.
2. Vagas.
3. Status ativo ou pausado.
4. Especialidades por unidade.
5. Telefones e WhatsApps.
6. Documentos exigidos.
7. Período de carência.
8. Público e idade mínima.
9. Data da última conferência.
10. Link ou telefone oficial do Comercial para condições financeiras.

## 25. Pendências para validação antes da publicação

1. Pinheiral: a imagem inclui Endocrinologia, mas a lista textual do checklist não inclui.
2. Audiometria e Fonoaudiologia: o checklist registra retorno em maio, mas não confirma o status em outubro.
3. Hidroginástica: manter “vagas limitadas” e confirmar disponibilidade com o setor.
4. Comercial: confirmar o WhatsApp oficial que receberá pedidos de adesão e de condições financeiras.
5. Associação: confirmar carência e categorias.
6. Cultura, esporte e turismo: confirmar contatos e horários atuais antes de exibir.
7. Sede Campestre: confirmar funcionamento antes de cada fim de semana ou feriado.

## 26. Regras de voz dentro do produto

1. Falar de adulto para adulto.
2. Usar perguntas reais e respostas diretas.
3. Explicar uma condição sem tom defensivo.
4. Não usar medo, culpa ou urgência falsa.
5. Não prometer rapidez, vaga, gratuidade ou inclusão sem confirmação.
6. Não diagnosticar pela navegação.
7. Usar o mote somente quando houver uma descoberta concreta.
8. Evitar frases genéricas de propaganda.
9. Usar um CTA principal por tela.
10. Não usar travessão nas copies.

## 27. Resumo do MVP

O primeiro lançamento pode funcionar bem com estas rotas:

1. `/`
2. `/explorar`
3. `/servicos`
4. `/servicos/saude`
5. `/servicos/odontologia`
6. `/servicos/terapias-reabilitacao`
7. `/servicos/movimento`
8. `/servicos/convivencia-aprendizado`
9. `/servicos/lazer`
10. `/servicos/orientacao-direitos`
11. `/como-funciona/consultas`
12. `/associacao`
13. `/associado`
14. `/unidades`
15. `/duvidas`
16. `/contato`

O MVP já resolve descoberta, transparência, orientação e conversão sem exigir login próprio. O portal atual continua responsável pelo agendamento de consultas.
