"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Projects", [
      {
        project_name: "demo-project-complete",
        captain_id: 1,
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
