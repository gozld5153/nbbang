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
      Like.belongsTo(models.User);
      Like.belongsTo(models.Project);
      Like.belongsTo(models.Goal);
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      goalId: DataTypes.INTEGER,
      agreement: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
