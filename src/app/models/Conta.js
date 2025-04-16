import { Model, DataTypes } from "sequelize";

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        saldo: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "contas",
        modelName: "Conta",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "usuario",
    });

    this.belongsTo(models.Instituicao, {
      foreignKey: "instituicao_id",
      as: "instituicao",
    });

    this.hasMany(models.Transacao, {
      foreignKey: "conta_id",
      as: "transacoes",
    });
  }
}

export default Conta;
