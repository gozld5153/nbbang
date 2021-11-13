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
      Like.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
      });
      Like.belongsTo(models.Goal, {
        foreignKey: {
          name: "GoalId",
        },
        onDelete: "CASCADE",
      });
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
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
