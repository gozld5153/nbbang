"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Goals", [
      {
        user_id: 1,
        project_id: 1,
        goal_name: "goal table test",
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
