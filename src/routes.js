import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import ContaController from './app/controllers/ContaController.js';
import TransacaoController from './app/controllers/TransacaoController.js';
import InstituicaoController from './app/controllers/InstituicaoController.js';

const routes = Router();

// Usuários
routes.get('/users', UserController.index);           // Listar todos os usuários
routes.get('/users/:id', UserController.show);        // Buscar usuário por ID
routes.post('/users', UserController.store);          // Criar novo usuário
routes.put('/users/:id', UserController.update);      // Atualizar usuário
routes.delete('/users/:id', UserController.delete);   // Deletar usuário

// Instituições
routes.get('/instituicoes', InstituicaoController.index);       // Listar todas
routes.get('/instituicoes/:id', InstituicaoController.show);    // Buscar por ID
routes.post('/instituicoes', InstituicaoController.store);      // Criar
routes.put('/instituicoes/:id', InstituicaoController.update);  // Atualizar
routes.delete('/instituicoes/:id', InstituicaoController.delete); // Remover

// Contas
routes.post('/contas', ContaController.store); // Criar conta

routes.get('/saldos/:usuario_id', ContaController.saldoTotal); // Saldo total do usuário
routes.get('/saldos/:usuario_id/instituicao/:instituicao_id', ContaController.saldoPorInstituicao); // Saldo por instituição

routes.get('/extrato/:usuario_id', ContaController.extratoCompleto); // Extrato completo
routes.get('/extrato/:usuario_id/instituicao/:instituicao_id', ContaController.extratoPorInstituicao); // Extrato por instituição

// Transações
routes.post('/transacoes', TransacaoController.store); // Criar transação

export default routes;
