const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class FollowData extends Model { }

FollowData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    following: {
      type: DataTypes.STRING,
    },
    followers: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "followData",
  }
);

module.exports = FollowData;
