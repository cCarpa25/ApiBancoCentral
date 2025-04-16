import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

//Importando os models
import User from '../app/models/User';
import Instituicao from '../app/models/Instituicao';
import Conta from '../app/models/Conta';
import Transacao from '../app/models/Transacao';

//Array de models
const models = [User, Instituicao, Conta, Transacao];

//Definindo a classe Database
class Database {
  constructor() {
    this.init();
  }

  //Criando conexão com o banco usando o Sequelize
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  
      this.connection.sync();

    }
}

export default new Database();
