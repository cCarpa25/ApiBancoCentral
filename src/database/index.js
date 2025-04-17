import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";

import User from "../app/models/User.js";
import Instituicao from "../app/models/Instituicao.js";
import Conta from "../app/models/Conta.js";
import Transacao from "../app/models/Transacao.js";

const models = [User, Instituicao, Conta, Transacao];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => model.init(this.connection));
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
