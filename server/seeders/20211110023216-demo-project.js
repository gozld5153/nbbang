"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Projects", [
      {
        projectName: "demo-project",
        captainId: 1,
        description: null,
        presentation: null,
        state: "progress",
        deadline: "2021-11-11~2021-11-20",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Projects", null, {});
  },
};
