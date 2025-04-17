import Conta from "../models/Conta.js";
import User from "../models/User.js";
import Instituicao from "../models/Instituicao.js";

class ContaController {
  // Listar todas as contas
  async index(req, res) {
    try {
      const contas = await Conta.findAll({
        include: [
          { model: User, as: "user", attributes: ["id", "nome", "email"] },
          { model: Instituicao, as: "instituicao", attributes: ["id", "nome"] },
        ],
      });
      return res.status(200).json(contas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar contas." });
    }
  }

  // Buscar conta por ID
  async show(req, res) {
    const { id } = req.params;

    try {
      const conta = await Conta.findByPk(id, {
        include: [
          { model: User, as: "user", attributes: ["id", "nome", "email"] },
          { model: Instituicao, as: "instituicao", attributes: ["id", "nome"] },
        ],
      });

      if (!conta) {
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      return res.status(200).json(conta);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar conta." });
    }
  }

  // Criar uma nova conta
  async store(req, res) {
    const { saldo, usuario_id, instituicao_id } = req.body;

    if (saldo === undefined || usuario_id === undefined || instituicao_id === undefined) {
      return res.status(400).json({ error: "Saldo, usuário e instituição são obrigatórios." });
    }

    try {
      const conta = await Conta.create({ saldo, usuario_id, instituicao_id });

      return res.status(201).json({ mensagem: "Conta criada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar conta." });
    }
  }

  // Atualizar uma conta
  async update(req, res) {
    const { id } = req.params;
    const { saldo } = req.body;

    try {
      const conta = await Conta.findByPk(id);
      if (!conta) {
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      await conta.update({ saldo });

      return res.status(200).json({ mensagem: "Conta atualizada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar conta." });
    }
  }

  // Deletar uma conta
  async delete(req, res) {
    const { id } = req.params;

    try {
      const conta = await Conta.findByPk(id);
      if (!conta) {
        return res.status(404).json({ error: "Conta não encontrada." });
      }

      await conta.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar conta." });
    }
  }
}

export default new ContaController();
