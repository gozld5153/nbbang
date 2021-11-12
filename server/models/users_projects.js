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
      // models.Users_Projects.belongsTo(models.User, { foreignKey: "user_id" });
      // models.Users_Projects.belongsTo(models.Project, {
      //   foreignKey: "project_id",
      // });
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
      modelName: "Users_Projects",
    }
  );
  return Users_Projects;
};
