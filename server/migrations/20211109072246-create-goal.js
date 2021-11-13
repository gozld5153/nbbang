"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Goals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      projectId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Projects",
          key: "id",
        },
      },
      goalName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      important: {
        type: Sequelize.INTEGER,
      },
      deadline: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Goals");
  },
};
