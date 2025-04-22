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
# Rode as migrations
```bash
npx sequelize-cli db:migrate
```
# Suba o banco de dados com Docker
```bash
docker-compose up -d
```
# Inicie o servidor em ambiente de desenvolvimento
```bash
npm run dev
```

---

## 🧪 Testando no Insomnia

Você pode usar o Insomnia (ou Postman) para testar as seguintes rotas:

### 1. Criar uma nova instituição

```
POST /instituicoes
```

**Body (JSON):**
```json
{
  "nome": "Banco XPTO",
  "cnpj": "12345678000100"
}
```

---

### 2. Criar uma conta para um usuário

```
POST /usuarios/:id/contas
```

**Parâmetro na URL:**  
`id` do usuário

**Body (JSON):**
```json
{
  "instituicao_id": 1,
  "tipo": "corrente",
  "saldo_inicial": 1000
}
```

---

### 3. Registrar uma transação

```
POST /usuarios/:id/transacoes
```

**Parâmetro na URL:**  
`id` do usuário

**Body (JSON):**
```json
{
  "conta_id": 1,
  "tipo": "deposito",
  "valor": 200
}
```

---

### 4. Consultar o saldo do usuário

```
GET /usuarios/:id/saldo
```

**Parâmetro na URL:**  
`id` do usuário

---

### 5. Consultar extrato do usuário

```
GET /usuarios/:id/extrato
```

**Parâmetro na URL:**  
`id` do usuário

---

### 6. Rota raiz (teste básico)

```
GET /
```

Retorna a mensagem:
```
API Mini Banco Central está no ar!
```

---


## 📌 Observações

- Certifique-se de que o PostgreSQL está rodando via Docker.
- Use o Insomnia para enviar requisições com o `Content-Type: application/json`.
- Todas as rotas estão acessíveis via `http://localhost:3000`.

---
