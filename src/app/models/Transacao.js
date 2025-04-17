import Sequelize, { Model } from "sequelize";

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.ENUM("debito", "credito"),
        valor: Sequelize.DECIMAL,
        description: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Transacao",
        tableName: "transacoes",
        timestamps: true,
        underscored: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conta, { foreignKey: "conta_id", as: "conta" });
  }
}

export default Transacao;
