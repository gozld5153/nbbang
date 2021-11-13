"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersProjects.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
      });
      UsersProjects.belongsTo(models.Project, {
        foreignKey: {
          name: "projectId",
        },
        onDelete: "CASCADE",
      });
    }
  }
  UsersProjects.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UsersProjects",
    }
  );
  return UsersProjects;
};
