const path = require("path");
const express = require("express");
const app = (module.exports = express());
const { appCfg, sequelizeCfg } = require("./cfg");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require("./routers/boot")(app);
console.log("路由注册完成！");

const { sequelize, defineModels } = require("./plugins/sequelize");
app.models = defineModels({
  log: true,
});

app.use(function (req, res) {
  res.send("web server");
});

const { errorCapture } = require("./plugins/errorCapture");
app.use(errorCapture);

if (!module.parent) {
  app.listen(appCfg.port, () => {
    console.log("服务启动完成！***********");
  });
}
