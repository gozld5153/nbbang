"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_name: {
        type: Sequelize.STRING,
      },
      captain_id: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      presentation: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Projects");
  },
};
