import Sequelize from "sequelize";
import Conta from "../models/Conta.js";
import Transacao from "../models/Transacao.js";

const { Op } = Sequelize;

class TransacaoController {
  // Criar uma nova transação
  async store(req, res) {
    const { tipo, valor, descricao, conta_id } = req.body;

    // Verificando se todos os campos necessários foram enviados
    if (!tipo || !valor || !conta_id) {
      return res.status(400).json({ error: "Tipo, valor e conta_id são obrigatórios." });
    }

    // Verificar se o tipo de transação é válido
    if (!["debito", "credito"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo de transação inválido." });
    }

    // Verificar se o valor é válido (deve ser positivo)
    if (valor <= 0) {
      return res.status(400).json({ error: "Valor deve ser maior que 0." });
    }

    try {
      // Iniciar a transação do Sequelize
      const t = await Conta.sequelize.transaction();

      // Encontrar a conta associada
      const conta = await Conta.findByPk(conta_id, { transaction: t });

      if (!conta) {
        await t.rollback();
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      // Verificar se o saldo da conta é suficiente para um débito
      if (tipo === "debito" && conta.saldo < valor) {
        await t.rollback();
        return res.status(400).json({ error: "Saldo insuficiente para débito." });
      }

      // Realizar a transação
      if (tipo === "debito") {
        conta.saldo -= valor; // Reduz o saldo para débito
      } else {
        conta.saldo += valor; // Aumenta o saldo para crédito
      }

      // Salvar a nova conta com o saldo atualizado
      await conta.save({ transaction: t });

      // Criar a transação
      await Transacao.create(
        {
          tipo,
          valor,
          descricao,
          conta_id,
        },
        { transaction: t }
      );

      // Commitar a transação
      await t.commit();

      // Retornar a resposta de sucesso
      return res.status(201).json({ mensagem: "Transação realizada com sucesso!" });
    } catch (error) {
      // Caso algo dê errado, faz o rollback da transação
      console.error("Erro ao realizar transação:", error);
      return res.status(500).json({ error: "Erro ao realizar transação." });
    }
  }
}

export default new TransacaoController();
