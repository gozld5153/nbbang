"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Comment.belongsTo(models.User, { foreignKey: "user_id" });
      // models.Comment.belongsTo(models.Project, { foreignKey: "project_id" });
      // models.Comment.belongsTo(models.Goal, { foreignKey: "goal_id" });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      goalId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
