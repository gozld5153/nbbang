"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Comments", [
      {
        userId: 1,
        projectId: 1,
        goalId: 1,
        content: "잘 수행해주셨네요~",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Comments", null, {});
  },
};
