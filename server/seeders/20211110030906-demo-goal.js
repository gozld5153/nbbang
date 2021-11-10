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
        important: "",
        deadline: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Goals", null, {});
  },
};
