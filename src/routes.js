//Importar o Router do Express
import { Router } from 'express'; 

//Importar os controladores responsáveis pela lógica das rotas
import InstituicaoController from './app/controllers/InstituicaoController';
import ContaController from './app/controllers/ContaController';
import TransacaoController from './app/controllers/TransacaoController';
import SaldoController from './app/controllers/SaldoController';
import ExtratoController from './app/controllers/ExtratoController';

//Criar nova instância do roteador do Express
const routes = new Router();

routes.post('/instituicoes', InstituicaoController.store); //Cria uma nova instituição
routes.post('/usuarios/:id/contas', ContaController.store);//Cria uma conta para o usuário com ID especificado (:id)
routes.post('/usuarios/:id/transacoes', TransacaoController.store);//Registra uma transação para o usuário com ID especificado

routes.get('/usuarios/:id/saldo', SaldoController.show);//Retorna o saldo consolidado do usuário com ID especificado
routes.get('/usuarios/:id/extrato', ExtratoController.index);//Retorna o extrato do usuário

//Rota raiz 
routes.get('/', (req, res) => {
    res.send('API Mini Banco Central está no ar!')
})

export default routes;//Exporta o roteador

