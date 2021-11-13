"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Like.belongsTo(models.User, { foreignKey: "user_id" });
      // models.Like.belongsTo(models.Project, { foreignKey: "project_id" });
      // models.Like.hasMany(models.Goal);
    }
  }
  Like.init(
    {
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      goal_id: DataTypes.INTEGER,
      agreement: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
