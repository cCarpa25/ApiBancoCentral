import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";

// Importando os models
import User from "../app/models/User.js";
import Instituicao from "../app/models/Instituicao.js";
import Conta from "../app/models/Conta.js";
import Transacao from "../app/models/Transacao.js";

// Array de models
const models = [User, Instituicao, Conta, Transacao];

// Definindo a classe Database
class Database {
  constructor() {
    this.init();
  }

  // Criando conexão com o banco usando o Sequelize
  init() {
    try {
      this.connection = new Sequelize(databaseConfig);

      // Inicializando os modelos
      models.forEach((model) => model.init(this.connection));

      // Realizando as associações
      models.forEach((model) => {
        if (model.associate) {
          model.associate(this.connection.models);
        }
      });

      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }
}

export default new Database();
