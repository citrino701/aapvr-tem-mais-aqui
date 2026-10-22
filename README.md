# AAPVR | TEM MAIS AQUI

Projeto inicial de hub interativo baseado na especificação editorial da AAPVR. O visitante descobre os serviços por necessidade e é encaminhado ao canal correto. Sem cadastro ou login de visitantes.

> **ESTADO:** protótipo funcional de código-fonte, não publicado. Fontes: `docs/Especificacao_TEM_MAIS_AQUI.md` e Checklist de Serviços 2026. Vários dados operacionais ainda carecem de validação. A publicação institucional depende de testes e aprovação.

## 1) Como funciona

```text
VISITANTE
  -> Next.js (paginas, busca de especialidades, explorador e contatos)
     -> API de LEITURA do Apps Script
        -> Google Sheets (textos, categorias, servicos, unidades, contatos, duvidas)

EQUIPE AAPVR
  -> edita a planilha Google Sheets (permissoes restritas a editores)
  -> atualizacao aparece no site depois do cache

DESENVOLVEDOR
  -> altera codigo no GitHub
  -> Vercel gera nova implantacao automaticamente
```

A planilha não precisa ser pública. O endpoint do Apps Script entrega somente as linhas com `publicado=SIM`, e nunca recebe requisições para edição.

## 2) Executar no computador

**Requisito:** Node.js 20.9+.

1. Descompacte o ZIP.
2. Abra um terminal dentro da pasta `tem-mais-aqui-starter`.
3. Rode:

```bash
npm install
npm run dev
```

4. Acesse `http://localhost:3000`.

Sem a API do Google Sheets, a aplicação mostra os dados de demonstração de `lib/seed.json` e um aviso amarelo. Esse comportamento é intencional.

Para conferir se compila:

```bash
npm run build
```

## 3) Criar o editor de textos no Google Sheets

1. Faça upload do arquivo `AAPVR_Tem_Mais_Aqui_CMS.xlsx` no Google Drive.
2. Abra com Google Sheets e use **Arquivo > Salvar como Planilhas Google** (crie a versão nativa).
3. Garanta que todas as abas existam com estes nomes exatos: `TEXTOS`, `AREAS`, `SERVICOS`, `UNIDADES`, `CONTATOS`, `DUVIDAS`.
4. As colunas `chave`/`id` são identificadores técnicos. **Não modifique** para evitar links quebrados. Mude as demais colunas à vontade.
5. A coluna `publicado` aceita `SIM` e `NAO`: se `NAO`, a linha não entra na API. Os registros de Audiometria e Fonoaudiologia foram deixados como `NAO` até confirmação.
6. Restrinja quem pode editar a planilha. Não armazene nela informações pessoais dos pacientes.

### Como editar uma copy

Exemplo: para alterar o título inicial, encontre `hero.titulo` na aba `TEXTOS`, edite a coluna `texto` e mantenha `publicado=SIM`.

### Como pausar uma atividade

Vá até `SERVICOS`, localize o ID da atividade. Troque `publicado` para `NAO` se ela não deve aparecer; se só as vagas estão esgotadas, altere `status` para `Sem vagas no momento (confirme com o setor)` e mantenha publicado.

### Como mudar telefones

Na aba `CONTATOS`, altere o telefone ou WhatsApp do setor. Para não exibir um contato pendente, ajuste `publicado=NAO`. **Atenção:** `comercial` está sem número até aprovação.

## 4) Ativar a API de leitura do Apps Script

1. Abra a planilha nativa, vá em **Extensões > Apps Script**.
2. Abra `cms/apps-script/Code.gs` do projeto e copie todo o código para o editor do Apps Script.
3. Substitua `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID da URL da Planilha Google, que aparece entre `/d/` e `/edit`.
4. Clique em **Implantar > Nova implantação**.
5. Selecione **Aplicativo da web**.
6. Selecione **Executar como: Eu** e **Quem tem acesso: Qualquer pessoa** (acesso **só de leitura ao JSON publicado**). O Google pode solicitar autorização.
7. Copie a URL de implantação que termina em `/exec` e abra em navegador. Ela deve mostrar um objeto JSON com `texts`, `categories`, `services`, `units`, `contacts` e `faqs`.

**Segurança:** qualquer pessoa poderá consultar os dados publicados pelo endpoint. Por isso não publique informações internas/sigilosas. Não existe `doPost` nem rota de edição no script, e a planilha continua privada.

**Se alterar o código do Apps Script no futuro**, crie uma nova versão na gestão de implantações. **Se alterar só as células da planilha**, não precisa implantar o Apps Script novamente.

## 5) Conectar o site à planilha

No computador, copie `.env.example` para `.env.local` e preencha:

```env
GOOGLE_CONTENT_API_URL=https://script.google.com/macros/s/SEU_DEPLOYMENT_ID/exec
```

Reinicie `npm run dev`. O aviso de demonstração some se a resposta JSON for válida. Como usamos `next: { revalidate: 120 }`, as edições levam até cerca de 2 minutos ou eventualmente mais para ficarem visíveis, dependendo do cache de rotas e distribuição da plataforma.

## 6) Subir para o GitHub

Crie um repositório **novo e separado**, por exemplo `aapvr-tem-mais-aqui`, depois rode na pasta do projeto:

```bash
git init
git add .
git commit -m "feat: primeira versão do TEM MAIS AQUI"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/aapvr-tem-mais-aqui.git
git push -u origin main
```

Se você não utiliza Git no terminal, pode usar **Add file > Upload files** na interface do GitHub e enviar os arquivos **de dentro** da pasta do projeto, mantendo as subpastas. Não inclua `.env.local`.

## 7) Publicar na Vercel

1. Acesse `vercel.com`, conecte sua conta GitHub e use **Add New > Project**.
2. Importe o repositório `aapvr-tem-mais-aqui`.
3. O framework Next.js deverá ser detectado automaticamente.
4. Adicione a variável `GOOGLE_CONTENT_API_URL` ao projeto em **Settings > Environment Variables** (Production e Preview, quando aplicável).
5. Clique em **Deploy**. Quando precisar editar código, faça push no GitHub para uma nova implantação.

**Plano Vercel:** o plano gratuito Hobby é destinado a projetos pessoais não comerciais. Para publicação institucional da AAPVR, avalie um plano adequado ou outra hospedagem cujos termos permitam o uso pretendido.

## 8) Rotas disponíveis no código

- `/`: homepage e descoberta.
- `/explorar`: explorador por categoria, cidade e especialidade.
- `/servicos`: índice de categorias.
- `/servicos/saude`: especialidades por unidade.
- `/servicos/saude/[especialidade]`: unidades por especialidade.
- `/servicos/[categoria]`: catálogo da categoria.
- `/servicos/[categoria]/[servico]`: detalhes do serviço, requisitos e CTA.
- `/como-funciona`, `/como-funciona/consultas`: regras e caminho para agendamento.
- `/associacao`, `/associado`: adesão e demandas de associados.
- `/unidades`, `/unidades/[id]`: endereços, horários e especialidades.
- `/duvidas`, `/contato`: FAQ e direcionamento por setor.
- `/historias`: página reservada, sem depoimentos inventados.

O portal `https://associado.aapvr.com.br/` continua responsável pelos agendamentos. **O hub não agenda nem confirma vagas.**

## 9) O que editar em cada arquivo

| Arquivo | Responsabilidade |
| --- | --- |
| `app/[[...slug]]/page.tsx` | Páginas e estrutura do site |
| `app/globals.css` | Estilo, layout e responsividade |
| `components/Explorer.tsx` | Fluxo guiado de descoberta |
| `components/ContactChooser.tsx` | Setores e links de contato |
| `lib/data.ts` | Leitura da API e cache |
| `lib/seed.json` | Dados de demonstração locais |
| `cms/apps-script/Code.gs` | Leitor público da planilha |
| `docs/Especificacao_TEM_MAIS_AQUI.md` | Documento de referência |

Os textos principais e os registros de serviços foram preparados para edição pela planilha; alguns textos de interface e fluxos fixos ainda residem no código. Para uma fase posterior, vale externalizar o restante do microtexto e construir um painel de pré-visualização/aprovação.

## 10) Eventos, UTMs e privacidade

A base já contém a função `track()` para eventos de descoberta e contato, com nomes como `interest_selected`, `city_selected`, `service_search`, `service_view`, `whatsapp_click` e `association_cta_click`. **Ainda não há serviço de analytics instalado:** os eventos só serão enviados quando você configurar GA4 ou GTM. A lista completa de 13 eventos da especificação ainda depende de instrumentação e testes.

UTMs nas URLs de entrada devem ser preservadas e lidas pela futura integração com analytics, e o Link Tageado pode ser incorporado em uma etapa posterior para rastrear saídas. Antes disso, defina a política de privacidade, consentimento quando necessário, retenção e tratamento adequado conforme a LGPD. Não registre dados de saúde ou informações de pacientes nos eventos.

## 11) Pendências antes da publicação pública

- **Pinheiral:** confirmar Endocrinologia. Há conflito entre checklist textual e material visual, então deixamos a especialidade fora da lista inicial da unidade.
- **Audiometria e Fonoaudiologia:** ambas vêm com status antigo de pausa/retorno; `publicado=NAO` até confirmar.
- **Hidroginástica:** vagas limitadas, sem afirmação de disponibilidade em tempo real.
- **Comercial:** confirmar WhatsApp oficial. O telefone não foi preenchido na planilha base.
- **Associação:** confirmar categorias, prazos de carência, critérios e documentos.
- **Unidades:** validar endereços, horários, nomes e especialidades atuais.
- **Sede Campestre:** consultar dias e horários, principalmente nos feriados.
- **Design:** substituir o símbolo temporário `A` pelo logo oficial autorizado e revisar acessibilidade em diferentes aparelhos.
- **Técnico:** testar rotas, busca, filtros, links de telefone/WhatsApp e `npm run build` num ambiente com dependências instaladas.

## Fontes oficiais técnicas

- Next.js App Router: https://nextjs.org/docs/app
- Next.js `fetch` e cache: https://nextjs.org/docs/app/api-reference/functions/fetch
- Vercel Deployments: https://vercel.com/docs/deployments/overview
- Vercel Hobby: https://vercel.com/docs/plans/hobby
- Apps Script Web Apps: https://developers.google.com/apps-script/guides/web
- Quotas Apps Script: https://developers.google.com/apps-script/guides/services/quotas
