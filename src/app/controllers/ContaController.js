// src/app/controllers/ContaController.js
import Conta from "../models/Conta.js";
import Instituicao from "../models/Instituicao.js";
import User from "../models/User.js";

class ContaController {
  // Cadastrar uma nova conta
  async store(req, res) {
    const { usuario_id, instituicao_id } = req.body;
    try {
      const user = await User.findByPk(usuario_id);
      const instituicao = await Instituicao.findByPk(instituicao_id);

      if (!user || !instituicao) {
        return res.status(404).json({ error: "Usuário ou Instituição não encontrados." });
      }

      const conta = await Conta.create({ usuario_id, instituicao_id: instituicao.id });
      return res.status(201).json({
        id: conta.id,
        usuario_id: conta.usuario_id,
        instituicao_id: conta.instituicao_id
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar conta." });
    }
  }

  // Obter saldo total de um usuário
  async saldoTotal(req, res) {
    const { usuario_id } = req.params;
    try {
      const contas = await Conta.findAll({ where: { usuario_id } });
      const saldoTotal = contas.reduce((total, conta) => total + conta.saldo, 0);
      return res.status(200).json({ saldoTotal });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter saldo total." });
    }
  }

  // Obter saldo por instituição
  async saldoPorInstituicao(req, res) {
    const { id } = req.params; // Pega o ID do usuário
    const { instituicao } = req.query; // Pega o nome da instituição da query string
    
    try {
      const instituicaoData = await Instituicao.findOne({ where: { nome: instituicao } });
  
      if (!instituicaoData) {
        return res.status(404).json({ error: "Instituição não encontrada." });
      }
  
      const contas = await Conta.findAll({ where: { usuario_id: id, instituicao_id: instituicaoData.id } });
      const saldoPorInstituicao = contas.reduce((total, conta) => total + conta.saldo, 0);
      
      return res.status(200).json({ saldoPorInstituicao });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter saldo por instituição." });
    }
  }

  // Obter extrato completo do usuário
  async extratoCompleto(req, res) {
    const { usuario_id } = req.params;
    try {
      const contas = await Conta.findAll({ where: { usuario_id } });
      const transacoes = await Promise.all(
        contas.map(conta => conta.getTransacoes())
      );
      return res.status(200).json({ transacoes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter extrato." });
    }
  }

  // Filtrar extrato por instituição
  async extratoPorInstituicao(req, res) {
    const { id } = req.params; // Pega o ID do usuário
    const { instituicao } = req.query; // Pega a instituição da query string
    
    try {
      const instituicaoData = await Instituicao.findOne({ where: { nome: instituicao } });
  
      if (!instituicaoData) {
        return res.status(404).json({ error: "Instituição não encontrada." });
      }
  
      const contas = await Conta.findAll({ where: { usuario_id: id, instituicao_id: instituicaoData.id } });
      const transacoes = await Promise.all(
        contas.map(conta => conta.getTransacoes())
      );
  
      return res.status(200).json({ transacoes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter extrato por instituição." });
    }
  }
}

export default new ContaController();
