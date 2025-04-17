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
routes.post('/users/:usuario_id/contas', ContaController.store); // Criar conta para usuário

// Saldo total ou por instituição (usando query string)
routes.get('/users/:usuario_id/saldo', ContaController.saldoTotal);

// Extrato completo ou por instituição (usando query string)
routes.get('/users/:usuario_id/extrato', ContaController.extratoCompleto);

// Transações
routes.post('/users/:usuario_id/transacoes', TransacaoController.store); // Criar transação para usuário

export default routes;
