"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Goals", [
      {
        userId: 1,
        projectId: 1,
        goalName: "goal table test",
        description: "",
        state: "todo",
        important: 3,
        deadline: "2021.11.10~2021.12.31",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Goals", null, {});
  },
};
