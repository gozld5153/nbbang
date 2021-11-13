"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Goal.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
      });
      Goal.belongsTo(models.Project, {
        foreignKey: {
          name: "projectId",
        },
        onDelete: "CASCADE",
      });
      Goal.hasMany(models.Like);
      Goal.hasMany(models.Comment);
      Goal.hasMany(models.File);
    }
  }
  Goal.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      goalName: DataTypes.STRING,
      description: DataTypes.STRING,
      state: DataTypes.STRING,
      important: DataTypes.INTEGER,
      deadline: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Goal",
    }
  );
  return Goal;
};
