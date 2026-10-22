/**
 * API publica SOMENTE DE LEITURA do hub TEM MAIS AQUI.
 * ID da planilha nativa do Google Sheets usada pelo site.
 * Editores alteram os conteudos diretamente na planilha compartilhada.
 * Nunca inclua CPF, pacientes, dados privados, senhas ou chaves nas abas publicas.
 */
const SPREADSHEET_ID = '1RjfMmgwsT1M_XTuA1tz7NQSFERp-ruRA-HD9AwUUFWk';

function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const read = (name) => {
      const sheet = ss.getSheetByName(name);
      if (!sheet) throw new Error('Aba nao encontrada: ' + name);
      const values = sheet.getDataRange().getDisplayValues();
      if (values.length < 1) return [];
      const columns = values.shift().map(s => String(s).trim());
      return values
        .filter(row => row.some(cell => cell.trim() !== ''))
        .map(row => Object.fromEntries(columns.map((col,i) => [col, row[i] || ''])))
        .filter(row => String(row.publicado || '').trim().toUpperCase() === 'SIM');
    };
    const texts = {};
    for (const row of read('TEXTOS')) texts[row.chave] = row.texto;
    const categories = read('AREAS').map(({id,nome,resumo,icone}) => ({id,nome,resumo,icone}));
    const services = read('SERVICOS').map(({id,categoria,nome,resumo,publico,idade,acesso,requisitos,unidades,status,canal}) =>
      ({id,categoria,nome,resumo,publico,idade,acesso,requisitos,unidades,status,canal}));
    const units = read('UNIDADES').map(({id,nome,cidade,endereco,horario,especialidades}) =>
      ({id,nome,cidade,endereco,horario,especialidades: especialidades.split('|').map(x=>x.trim()).filter(Boolean)}));
    const contacts = read('CONTATOS').map(({id,nome,telefone,whatsapp,observacao}) => ({id,nome,telefone,whatsapp,observacao}));
    const faqs = read('DUVIDAS').map(({id,pergunta,resposta}) => ({id,pergunta,resposta}));
    if (!categories.length || !units.length) throw new Error('Planilha sem dados basicos');
    const data = { texts, categories, services, units, contacts, faqs };
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    // O erro nao expoe a planilha privada. O Next.js faz fallback para demonstracao.
    console.error('Erro ao carregar hub: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({error:'Conteudo indisponivel'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
