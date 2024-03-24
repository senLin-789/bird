const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 20], //例如用户名长度在3到20个字符之间
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles", //引用的角色模型
        key: "role_id", //角色模型的主键字段
      },
    },
    // department: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "Department", //引用的部门模型
    //     key: "departmentId", //部门模型的主键字段
    //   },
    // },
    realname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true, //假设手机号是数字
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      //validate: {
      //  notEmpty: true,
      //  isEmail: true, //验证邮箱格式
      //},
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
