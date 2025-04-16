import Conta from '../models/Conta';
import Transacao from '../models/Transacao';

//Definindo a classe
class TransacaoController {
  async store(req, res) {
    const { id: usuario_id } = req.params;
    const { conta_id, tipo, valor, descricao, data } = req.body;

    //Verifica se a conta informada existe e pertence ao usuário
    const conta = await Conta.findOne({ where: { id: conta_id, usuario_id } });
    if (!conta) {
      return res.status(404).json({ erro: 'Conta não encontrada para este usuário.' });
    }

    //Cria a transação no banco de dados
    const transacao = await Transacao.create({
      conta_id,
      tipo,
      valor,
      descricao,
      data,
    });

    // Atualiza saldo da conta
    conta.saldo = tipo === 'credito'
      ? parseFloat(conta.saldo) + parseFloat(valor)
      : parseFloat(conta.saldo) - parseFloat(valor);

    await conta.save();//Salva a alteração do saldo

    return res.json(transacao);
  }
}

export default new TransacaoController();
