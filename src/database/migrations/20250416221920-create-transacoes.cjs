"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transacoes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("credito", "debito"),
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover o ENUM manualmente para evitar erro ao refazer migrations
    await queryInterface.dropTable("transacoes");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_transacoes_tipo";'
    );
  },
};
