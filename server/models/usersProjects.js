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
      UsersProjects.belongsTo(models.User);
      UsersProjects.belongsTo(models.Project);
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
