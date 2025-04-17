import Instituicao from '../models/Instituicao.js';

class InstituicaoController {
  // Listar todas as instituições
  async index(req, res) {
    try {
      const instituicoes = await Instituicao.findAll();
      return res.status(200).json(instituicoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar instituições.' });
    }
  }

  // Buscar uma instituição pelo ID
  async show(req, res) {
    const { id } = req.params;

    try {
      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      return res.status(200).json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar instituição.' });
    }
  }

  // Criar uma nova instituição
  async store(req, res) {
    const { nome } = req.body;
  
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
  
    try {
      await Instituicao.create({ nome });
      return res.status(201).json({
        mensagem: "Instituição criada com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar instituição.' });
    }
  }

  // Atualizar uma instituição existente
  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      await instituicao.update({ nome });
      return res.status(200).json(instituicao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar instituição.' });
    }
  }

  // Remover uma instituição
  async delete(req, res) {
    const { id } = req.params;

    try {
      const instituicao = await Instituicao.findByPk(id);

      if (!instituicao) {
        return res.status(404).json({ error: 'Instituição não encontrada.' });
      }

      await instituicao.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar instituição.' });
    }
  }
}

export default new InstituicaoController();
