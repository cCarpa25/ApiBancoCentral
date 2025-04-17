//Importar o Router do Express
import { Router } from "express";

//Importar os controladores responsáveis pela lógica das rotas
import UserController from "./app/controllers/UserController.js";
import InstituicaoController from "./app/controllers/InstituicaoController.js";

//Criar nova instância do roteador do Express
const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/instituicoes", InstituicaoController.store);

export default routes; //Exporta o roteador
