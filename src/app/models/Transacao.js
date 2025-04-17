// src/app/models/Transacao.js
import { Model, DataTypes } from "sequelize";

class Transacao extends Model {
  static init(sequelize) {
    return super.init(
      {
        tipo: {
          type: DataTypes.ENUM("credito", "debito"),
          allowNull: false,
        },
        valor: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        conta_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Transacao",
        tableName: "transacoes",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Conta, { foreignKey: "conta_id", as: "conta" });
  }
}

export default Transacao;
