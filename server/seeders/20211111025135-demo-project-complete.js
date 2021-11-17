"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Projects", [
      {
        projectName: "demo-project-complete",
        captainId: 1,
        description: "complete확인용",
        presentation: "",
        state: "complete",
        deadline: "2021.12.20~2021.12.31",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Projects", null, {});
  },
};
