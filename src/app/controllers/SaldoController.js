import Conta from '../models/Conta';
import Instituicao from '../models/Instituicao';

class SaldoController {
  async show(req, res) {
    const { id: usuario_id } = req.params;
    const { instituicao } = req.query;

    const where = { usuario_id };
    if (instituicao) {
      const inst = await Instituicao.findOne({ where: { nome: instituicao } });
      if (!inst) return res.status(404).json({ erro: 'Instituição não encontrada.' });
      where.instituicao_id = inst.id;
    }

    const contas = await Conta.findAll({ where });
    const total = contas.reduce((acc, conta) => acc + parseFloat(conta.saldo), 0);

    return res.json({ saldo: total.toFixed(2) });
  }
}

export default new SaldoController();
