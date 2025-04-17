// src/app/models/Conta.js
import { Model, DataTypes } from "sequelize";

class Conta extends Model {
  static init(sequelize) {
    return super.init(
      {
        saldo: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        usuario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        instituicao_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Conta",
        tableName: "contas",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "usuario_id", as: "usuario" });
    this.belongsTo(models.Instituicao, { foreignKey: "instituicao_id", as: "instituicao" });
    this.hasMany(models.Transacao, { foreignKey: "conta_id", as: "transacoes" });
  }
}

export default Conta;
