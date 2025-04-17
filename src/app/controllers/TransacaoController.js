// src/app/controllers/TransacaoController.js
import Transacao from "../models/Transacao.js";
import Conta from "../models/Conta.js";

class TransacaoController {
  // Criar uma transação
  async store(req, res) {
    const { tipo, valor, conta_id } = req.body;
    try {
      const conta = await Conta.findByPk(conta_id);
      if (!conta) {
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      // Atualiza o saldo da conta
      let novoSaldo = conta.saldo;
      if (tipo === "credito") {
        novoSaldo += valor;
      } else if (tipo === "debito") {
        novoSaldo -= valor;
      }

      await conta.update({ saldo: novoSaldo });

      // Cria a transação
      const transacao = await Transacao.create({ tipo, valor, conta_id });
      return res.status(201).json({
        id: transacao.id,
        tipo: transacao.tipo,
        valor: transacao.valor,
        conta_id: transacao.conta_id
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar transação." });
    }
  }
}

export default new TransacaoController();
