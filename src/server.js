import app from "./app.js";
import "dotenv/config";
import "./database/index.js";

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
