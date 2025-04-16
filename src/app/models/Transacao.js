import Sequelize, { Model } from "sequelize";

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.ENUM("credito", "debito"),
        valor: Sequelize.DECIMAL,
        description: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "transacoes",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conta, {
      foreignKey: "conta_id",
      as: "conta",
    });
  }
}

export default Transacao;
