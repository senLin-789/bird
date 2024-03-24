console.log(process.argv);
const args = process.argv.slice(2);
if (args.length < 2) return;

const [modelName, cmd] = args;

const { defineModels, sequelize } = require("../../src/plugins/sequelize");
const models = defineModels();

if (cmd == "force") {
  createTable(models[modelName]);
} else if (cmd == "alter") {
  alterTable(models[modelName]);
}

async function alterTable(model) {
  console.log("执行改动");
  await model.sync({ alter: true });
}
async function createTable(model) {
  console.log("执行创建");
  await model.sync({ force: true });
}

process.on("beforeExit", async function () {
  await sequelize.close();
  console.log("数据库关闭连接");
});
