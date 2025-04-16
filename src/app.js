// app.js
const express = require('express');
const pool = require('./config/db');
const app = express();

app.use(express.json());

// 1. Criar instituição: POST /instituicoes
app.post('/instituicoes', async (req, res) => {
  const { nome } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO instituicoes (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar instituição' });
  }
});

// 2. Criar conta para usuário: POST /usuarios/:id/contas
app.post('/usuarios/:id/contas', async (req, res) => {
  const usuario_id = req.params.id;
  const { instituicao_id, saldo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contas (usuario_id, instituicao_id, saldo) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, instituicao_id, saldo || 0]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

// 3. Adicionar transação: POST /usuarios/:id/transacoes
app.post('/usuarios/:id/transacoes', async (req, res) => {
  const usuario_id = req.params.id;
  const { conta_id, tipo, valor } = req.body;

  if (!['credito', 'debito'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de transação inválido' });
  }

  try {
    const contaResult = await pool.query(
      'SELECT * FROM contas WHERE id = $1 AND usuario_id = $2',
      [conta_id, usuario_id]
    );

    if (contaResult.rowCount === 0) {
      return res.status(404).json({ error: 'Conta não encontrada para este usuário' });
    }

    const transacaoResult = await pool.query(
      'INSERT INTO transacoes (conta_id, tipo, valor) VALUES ($1, $2, $3) RETURNING *',
      [conta_id, tipo, valor]
    );

    const operacao = tipo === 'credito' ? valor : -valor;
    await pool.query(
      'UPDATE contas SET saldo = saldo + $1 WHERE id = $2',
      [operacao, conta_id]
    );

    return res.status(201).json(transacaoResult.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar transação' });
  }
});

// 4. Obter saldo total do usuário ou por instituição: GET /usuarios/:id/saldo
app.get('/usuarios/:id/saldo', async (req, res) => {
  const usuario_id = req.params.id;
  const { instituicao } = req.query;
  try {
    let query;
    let params;
    if (instituicao) {
      query = `
        SELECT SUM(c.saldo) AS saldo_total
        FROM contas c
        JOIN instituicoes i ON c.instituicao_id = i.id
        WHERE c.usuario_id = $1 AND i.nome ILIKE $2
      `;
      params = [usuario_id, `%${instituicao}%`];
    } else {
      query = 'SELECT SUM(saldo) AS saldo_total FROM contas WHERE usuario_id = $1';
      params = [usuario_id];
    }
    const result = await pool.query(query, params);
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar saldo' });
  }
});

// 5. Obter extrato completo ou por instituição: GET /usuarios/:id/extrato
app.get('/usuarios/:id/extrato', async (req, res) => {
  const usuario_id = req.params.id;
  const { instituicao } = req.query;
  try {
    let query;
    let params;
    if (instituicao) {
      query = `
        SELECT t.*
        FROM transacoes t
        JOIN contas c ON t.conta_id = c.id
        JOIN instituicoes i ON c.instituicao_id = i.id
        WHERE c.usuario_id = $1 AND i.nome ILIKE $2
        ORDER BY t.data DESC
      `;
      params = [usuario_id, `%${instituicao}%`];
    } else {
      query = `
        SELECT t.*
        FROM transacoes t
        JOIN contas c ON t.conta_id = c.id
        WHERE c.usuario_id = $1
        ORDER BY t.data DESC
      `;
      params = [usuario_id];
    }
    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar extrato' });
  }
});

// Porta definida, podendo ser parametrizada via variável de ambiente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
