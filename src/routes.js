//Importar o Router do Express
import { Router } from "express";

//Importar os controladores responsáveis pela lógica das rotas
import UserController from "./app/controllers/UserController.js";
import InstituicaoController from "./app/controllers/InstituicaoController.js";
import ContaController from "./app/controllers/ContaController.js";
import TransacaoController from "./app/controllers/TransacaoController.js";

//Criar nova instância do roteador do Express
const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/instituicoes", InstituicaoController.store);
routes.post("/contas", ContaController.store);
routes.post("/transacoes", TransacaoController.store);

export default routes; //Exporta o roteador
