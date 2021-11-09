"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      goal_id: {
        type: Sequelize.INTEGER,
      },
      agreement: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.addConstraint("Likes", {
      fields: ["user_id"],
      type: "foreign key",
      name: "Likes_fkey_from_Users",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Likes", {
      fields: ["goal_id"],
      type: "foreign key",
      name: "Likes_fkey_from_Goals",
      references: {
        table: "Goals",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Likes", "Likes_fkey_from_Goals");
    await queryInterface.removeConstraint("Likes", "Likes_fkey_from_Users");
    await queryInterface.dropTable("Likes");
  },
};
