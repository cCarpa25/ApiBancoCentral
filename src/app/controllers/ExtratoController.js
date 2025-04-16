//Importando model do Sequelize
import Conta from '../models/Conta';
import Transacao from '../models/Transacao';
import Instituicao from '../models/Instituicao';

//Definindo classe
class ExtratoController {
  async index(req, res) {
    const { id: usuario_id } = req.params;//Parâmetros da requisição
    const { instituicao } = req.query;//Parâmetros da requisição

    //Verificar de foi informado o nome da instituição
    let contas;

    if (instituicao) {
      const inst = await Instituicao.findOne({ where: { nome: instituicao } });
      if (!inst) return res.status(404).json({ erro: 'Instituição não encontrada.' });

      contas = await Conta.findAll({ where: { usuario_id, instituicao_id: inst.id } });
    } else {
      contas = await Conta.findAll({ where: { usuario_id } });
    }

    const contaIds = contas.map(c => c.id);

    //Busca as transações das contas
    const transacoes = await Transacao.findAll({
      where: { conta_id: contaIds },
      order: [['data', 'DESC']],
    });

    return res.json(transacoes);
  }
}

export default new ExtratoController();
