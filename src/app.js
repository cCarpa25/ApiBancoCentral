import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.json());

// TODO: Importar as rotas e integrá-las ao app

app.use(routes);

// Porta definida, podendo ser parametrizada via variável de ambiente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
