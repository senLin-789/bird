const express = require("express");
const fs = require("fs");
const path = require("path");

const routerOptions = ["prefix"];

module.exports = function (parent, options) {
  fs.readdirSync(__dirname).forEach(function (dirName) {
    const dirPath = path.join(__dirname, dirName);
    if (!fs.statSync(dirPath).isDirectory()) return;

    const file = require(dirPath);
    const app = express();
    const prefix = file.prefix || `/${dirName}`;

    for (const key in file) {
      if (~routerOptions.indexOf(key)) continue;
      const route = file[key];
      const handler = route.handler;
      const method = route.method || "get";
      const url = getCompletedUrl(key, route, prefix);

      console.log(`注册${method.toUpperCase()} ${url}`);
      if (route.before) {
        app[method](url, ...route.before, handler);
      } else {
        app[method](url, handler);
      }
    }

    parent.use(app);
  });
};

function getCompletedUrl(key, route, prefix) {
  if (route.hasOwnProperty("completedUrl")) return route.completedUrl;
  if (route.hasOwnProperty("url")) return prefix + route.url;
  return `${prefix}/${key}`;
}
