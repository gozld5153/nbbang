"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Files", [
      {
        userId: 1,
        projectId: 1,
        goalId: 1,
        fileName: "코딩하다 머리빠진 사람이 많은 이유.jpg",
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
