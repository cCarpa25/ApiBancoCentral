import app from "./app/server.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
