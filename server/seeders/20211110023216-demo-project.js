"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Projects", [
      {
        project_name: "demo-project",
        captain_id: 1,
        description: null,
        presentation: null,
        state: "progress",
        progress: "",
        deadline: "왜 사라졌지?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Projects", null, {});
  },
};
