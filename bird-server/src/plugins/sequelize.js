const path = require("path");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const { sequelizeCfg } = require("../cfg");

const sequelize = (exports.sequelize = new Sequelize(sequelizeCfg));
const models = (exports.models = {});
let loaded = false;

exports.defineModels = function (options = {}) {
  if (loaded) return models;

  const outDir = path.join(__dirname, "..", "models");
  fs.readdirSync(outDir).forEach(function (dirName) {
    const dirPath = path.join(outDir, dirName);
    if (!fs.statSync(dirPath).isDirectory()) return;
    const modelName = capitalizeFirstLetter(dirName);
    options.log && console.log(`定义${modelName}`);
    const model = require(dirPath)(sequelize);
    models[modelName] = model;
  });

  loaded = true;
  console.log("模型定义完！");
  return models;
};

function capitalizeFirstLetter(str) {
  if (typeof str == "string" && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}
