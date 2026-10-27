/**
 * API pública do hub TEM MAIS AQUI.
 *
 * GET publica conteúdo marcado como SIM na planilha.
 * POST recebe sugestões do site e grava somente na aba SUGESTOES.
 *
 * Não inclua dados de pacientes, CPF, senhas ou informações privadas
 * nas abas destinadas ao site ou no formulário de sugestões.
 */

const SPREADSHEET_ID = '1RjfMmgwsT1M_XTuA1tz7NQSFERp-ruRA-HD9AwUUFWk';

function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    const read = (name) => {
      const sheet = ss.getSheetByName(name);

      if (!sheet) {
        throw new Error('Aba não encontrada: ' + name);
      }

      const values = sheet.getDataRange().getDisplayValues();

      if (values.length < 1) {
        return [];
      }

      const columns = values.shift().map(
        column => String(column).trim()
      );

      return values
        .filter(row =>
          row.some(cell => cell.trim() !== '')
        )
        .map(row =>
          Object.fromEntries(
            columns.map((column, index) => [
              column,
              row[index] || ''
            ])
          )
        )
        .filter(row =>
          String(row.publicado || '')
            .trim()
            .toUpperCase() === 'SIM'
        );
    };

    const texts = {};

    for (const row of read('TEXTOS')) {
      texts[row.chave] = row.texto;
    }

    const categories = read('AREAS').map(
      ({ id, nome, resumo, icone }) => ({
        id,
        nome,
        resumo,
        icone
      })
    );

    const services = read('SERVICOS').map(
      ({
        id,
        categoria,
        nome,
        resumo,
        publico,
        idade,
        acesso,
        requisitos,
        unidades,
        status,
        canal
      }) => ({
        id,
        categoria,
        nome,
        resumo,
        publico,
        idade,
        acesso,
        requisitos,
        unidades,
        status,
        canal
      })
    );

    const units = read('UNIDADES').map(
      ({
        id,
        nome,
        cidade,
        endereco,
        horario,
        especialidades
      }) => ({
        id,
        nome,
        cidade,
        endereco,
        horario,
        especialidades: String(especialidades || '')
          .split('|')
          .map(item => item.trim())
          .filter(Boolean)
      })
    );

    const contacts = read('CONTATOS').map(
      ({
        id,
        nome,
        telefone,
        whatsapp,
        observacao
      }) => ({
        id,
        nome,
        telefone,
        whatsapp,
        observacao
      })
    );

    const faqs = read('DUVIDAS').map(
      ({ id, pergunta, resposta }) => ({
        id,
        pergunta,
        resposta
      })
    );

    if (!categories.length || !units.length) {
      throw new Error(
        'Planilha sem dados básicos publicados em AREAS ou UNIDADES.'
      );
    }

    const data = {
      texts,
      categories,
      services,
      units,
      contacts,
      faqs
    };

    return jsonOutput(data);

  } catch (error) {
    console.error('Erro ao carregar hub: ' + error.message);
    return jsonOutput({ error: 'Conteúdo indisponível' });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    const body = JSON.parse(e && e.postData && e.postData.contents || '{}');

    if (body.action !== 'submitSuggestion') {
      return jsonOutput({ ok: false, error: 'Ação não reconhecida.' });
    }

    const suggestion = cleanPlainText(body.suggestion, 2000);
    const page = cleanPlainText(body.page, 500);

    if (suggestion.length < 5) {
      return jsonOutput({ ok: false, error: 'Escreva uma sugestão antes de enviar.' });
    }

    if (!lock.tryLock(5000)) {
      return jsonOutput({ ok: false, error: 'Tente novamente em instantes.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('SUGESTOES');

    if (!sheet) {
      throw new Error('Aba SUGESTOES não encontrada.');
    }

    const expectedHeaders = ['Data e hora', 'Sugestão', 'Página de origem'];
    const actualHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length)
      .getDisplayValues()[0]
      .map(value => String(value).trim());

    if (expectedHeaders.some((header, index) => actualHeaders[index] !== header)) {
      throw new Error('Cabeçalho inesperado na aba SUGESTOES.');
    }

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 2, 1, 2).setNumberFormat('@');
    sheet.getRange(nextRow, 1, 1, 3).setValues([[
      new Date(),
      suggestion,
      page
    ]]);

    return jsonOutput({ ok: true });

  } catch (error) {
    console.error('Erro ao salvar sugestão: ' + error.message);
    return jsonOutput({
      ok: false,
      error: 'Não foi possível salvar a sugestão agora.'
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function cleanPlainText(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
