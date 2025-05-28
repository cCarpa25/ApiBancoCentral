# Mini Banco Central API

Esta é uma API simples para simular funcionalidades básicas de um sistema bancário. Desenvolvida com Node.js, Express e Sequelize.

---

## ✅ Pré-requisitos

Antes de começar, tenha instalado:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) 

---

## 🚀 Como rodar o projeto

# Clone o repositório
```bash
git clone (https://github.com/cCarpa25/ApiBancoCentral.git)
```
# Acesse a pasta do projeto
```bash
cd ApiBancoCentral
```
# Crie o arquivo .env com o conteúdo abaixo:
```
SERVER_PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=senha123
DB_NAME=minibanco
```


# Instale as dependências
```bash
npm install
```
# Suba o banco de dados com Docker
```bash
docker-compose up -d
```
# Rode as migrations
```bash
npx sequelize-cli db:migrate
```
# Inicie o servidor em ambiente de desenvolvimento
```bash
npm run dev
```

---

## 🧪 Testando no Insomnia

Você pode usar o Insomnia (ou Postman) para testar as seguintes rotas:

Rota raiz (teste básico)

```
GET /
```
Retorna a mensagem:
API Mini Banco Central está no ar!


### 1. Criar uma nova instituição
POST
```
http://localhost:3000/instituicoes 
```

**Body (JSON):**
```json
{
  "nome": "Banco XPTO",
  "cnpj": "12345678000100"
}
```

### 2. Criar um usuário
POST
```
http://localhost:3000/users 
```
**Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "minhasenha123"
}
```
### 3. Criar uma conta para um usuário
POST
```
http://localhost:3000/users/:usuario_id/contas
```
**Body (JSON):**
```json
{
  "saldo_inicial": 1000,
  "usuario_id": 5,
	"instituicao_id": 1
}
```

---

### 4. Registrar uma transação
POST
```
//localhost:3000/users/:usuario_id/transacoes
```
**Body (JSON):**
```json
{
	"tipo": "credito",
	"valor": 200,
	"conta_id": 1
}
```

---

### 5. Consultar o saldo do usuário

```
GET /usuarios/:id/saldo
```

**Parâmetro na URL:**  
`id` do usuário

---

### 6. Consultar extrato do usuário

```
GET /usuarios/:id/extrato
```

**Parâmetro na URL:**  
`id` do usuário

---


## 📌 Observações

- Certifique-se de que o PostgreSQL está rodando via Docker.
- Use o Insomnia para enviar requisições com o `Content-Type: application/json`.
- Todas as rotas estão acessíveis via `http://localhost:3000`.

---
