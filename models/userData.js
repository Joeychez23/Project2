const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(logPw) {
    return bcrypt.compareSync(logPw, this.password);
    //logPw === this.password
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    
    hooks: {
      beforeCreate: async function (newData) {
        newData.password = await bcrypt.hash(newData.password, 10);
        return newData;
      },
  
      beforeUpdate: async function (upData) {
        upData = await upData.get({
          plain: true
        })
        upData.password = await bcrypt.hash(upData.password, 10);
        return upData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
