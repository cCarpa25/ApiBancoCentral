import Instituicao from "../models/Instituicao.js";

class InstituicaoController {
  // Lista todas as instituições
  async index(req, res) {
    try {
      const instituicoes = await Instituicao.findAll();
      return res.status(200).json(instituicoes);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar instituições." });
    }
  }

  // Mostra uma instituição específica
  async show(req, res) {
    const { id } = req.params;
    try {
      const instituicao = await Instituicao.findByPk(id);
      if (!instituicao) {
        return res.status(404).json({ error: "Instituição não encontrada." });
      }
      return res.status(200).json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar instituição." });
    }
  }

  // Cria uma nova instituição
  async store(req, res) {
    const { nome } = req.body;
    try {
      const instituicao = await Instituicao.create({ nome });
      return res.status(201).json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar instituição." });
    }
  }

  // Atualiza uma instituição
  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const instituicao = await Instituicao.findByPk(id);
      if (!instituicao) {
        return res.status(404).json({ error: "Instituição não encontrada." });
      }

      await instituicao.update({ nome });
      return res.status(200).json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar instituição." });
    }
  }

  // Deleta uma instituição
  async delete(req, res) {
    const { id } = req.params;

    try {
      const instituicao = await Instituicao.findByPk(id);
      if (!instituicao) {
        return res.status(404).json({ error: "Instituição não encontrada." });
      }

      await instituicao.destroy();
      return res.status(204).send(); // Sem conteúdo
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar instituição." });
    }
  }
}

export default new InstituicaoController();
