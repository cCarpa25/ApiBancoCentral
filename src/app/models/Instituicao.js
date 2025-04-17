import Sequelize, { Model } from "sequelize";

class Instituicao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Instituicao",
        tableName: "instituicoes",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Conta, { foreignKey: "instituicao_id", as: "contas" });
  }
}

export default Instituicao;
