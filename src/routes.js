//Importar o Router do Express
import { Router } from "express";

//Importar os controladores responsáveis pela lógica das rotas
import UserController from "./app/controllers/UserController.js";

//Criar nova instância do roteador do Express
const routes = new Router();

routes.post("/users", UserController.store);

export default routes; //Exporta o roteador
