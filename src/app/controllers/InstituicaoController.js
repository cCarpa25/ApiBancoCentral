import Instituicao from '../models/Instituicao';

//Definindo a classe
class InstituicaoController {
  async store(req, res) {
    const { nome } = req.body;

    // Verifica se já existe uma instituição com esse nome no banco
    const instituicaoExiste = await Instituicao.findOne({ where: { nome } });
    if (instituicaoExiste) {
      return res.status(400).json({ erro: 'Instituição já cadastrada.' });
    }

    //Cria e salva a nova instituição no banco de dados
    const instituicao = await Instituicao.create({ nome });
    return res.json(instituicao);
  }
}

export default new InstituicaoController();
