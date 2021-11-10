"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Files", [
      {
        user_id: 1,
        project_id: 1,
        goal_id: 1,
        description: "자료조사 final",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Files", null, {});
  },
};
