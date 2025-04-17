import Sequelize, { Model } from "sequelize";

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        saldo: Sequelize.DECIMAL,
      },
      {
        sequelize,
        modelName: "Conta",
        tableName: "contas",
        timestamps: true,
        underscored: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "usuario_id", as: "user" });
    this.belongsTo(models.Instituicao, {
      foreignKey: "instituicao_id",
      as: "instituicao",
    });
  }
}

export default Conta;
