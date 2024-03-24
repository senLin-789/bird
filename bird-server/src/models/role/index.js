const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("Role", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50], //例如角色名称长度在3到50个字符之间
      },
    },
    roleValue: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50], //例如角色值长度在3到50个字符之间
      },
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1, //默认状态为启用
      validate: {
        isInt: true, //确保输入的是整数
        inRange: [0, 1], //确保状态值在0到1之间
      },
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
