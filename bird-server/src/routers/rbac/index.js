const { models } = require("../../plugins/sequelize");
const { getPageValidator } = require("../../plugins/ajv");
exports.users = {
  url: "/users",
  before: [getPageValidator()],
  handler: async function (req, res) {
    const result = await models.User.findAndCountAll({
      limit: Number(req.query.limit),
      offset: (req.query.page - 1) * req.query.limit,
    });
    res.send(result);
  },
};

exports.roles = {
  url: "/roles",
  before: [getPageValidator()],
  handler: async function (req, res) {
    const result = await models.Role.findAndCountAll({
      limit: Number(req.query.limit),
      offset: (req.query.page - 1) * req.query.limit,
    });
    res.send(result);
  },
};
