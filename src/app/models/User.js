import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true, // ativando o gerenciamento automático de created_at e updated_at
        createdAt: "created_at", // mapeando o campo 'created_at'
        updatedAt: "updated_at", // mapeando o campo 'updated_at'
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: "user_id", as: "accounts" });
    this.hasMany(models.Transaction, {
      foreignKey: "user_id",
      as: "transactions",
    });
  }
}

export default User;
