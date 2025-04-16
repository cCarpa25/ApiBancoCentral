import Conta from '../models/Conta';

//Definindo classe
class ContaController {
  async store(req, res) {
    const { id: usuario_id } = req.params;
    const { instituicao_id } = req.body;

    const conta = await Conta.create({ usuario_id, instituicao_id });
    return res.json(conta);
  }
}

export default new ContaController();
