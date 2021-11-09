'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Goal.init({
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    goal_name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.STRING,
    important: DataTypes.STRING,
    deadline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};