"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users_Projects", [
      {
        user_id: 1,
        project_id: 2,
        color: "red",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users_Projects", null, {});
  },
};
