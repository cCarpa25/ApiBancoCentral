// src/app/models/User.js
import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Conta, { foreignKey: "usuario_id", as: "contas" });
  }
}

export default User;
