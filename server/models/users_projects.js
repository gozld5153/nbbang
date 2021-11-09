"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Projects.init(
    {
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users_projects",
    }
  );
  return Users_Projects;
};
