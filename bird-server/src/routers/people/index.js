const { Op } = require("sequelize");
const { models } = require("../../plugins/sequelize");
const { getSchemaValidator, validate } = require("../../plugins/ajv");

const base = "/api";
const prefix = (exports.prefix = base + "/people");

const paramsIdValidator = getSchemaValidator();
exports.get = {
  url: "/:id",
  before: [validate(paramsIdValidator, "params")],
  handler: async function (req, res) {
    const row = await models.People.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(row);
  },
};

const queryPageValidator = getSchemaValidator({
  type: "object",
  properties: {
    page: {
      type: "string",
      numeric: {
        minimum: 1,
      },
    },
    limit: {
      type: "string",
      numeric: {
        minimum: 1,
        maximum: 20,
      },
    },
    name: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    phone: {
      type: "string",
    },
  },
  required: ["page", "limit"],
  additionalProperties: true,
});
exports.peoples = {
  completedUrl: base + "/peoples",
  before: [validate(queryPageValidator, "query")],
  handler: async function (req, res) {
    const where = {};
    if (req.query.name) {
      where.realname = {
        [Op.like]: `%${req.query.name}%`,
      };
    }
    if (req.query.gender) {
      where.gender = req.query.gender;
    }
    if (req.query.phone) {
      where.phone = {
        [Op.like]: `%${req.query.phone}%`,
      };
    }
    const result = await models.People.findAndCountAll({
      limit: Number(req.query.limit),
      offset: (req.query.page - 1) * req.query.limit,
      where,
      order: [["id", "ASC"]],
    });
    res.send(result);
  },
};

exports.delete = {
  url: "/:id",
  method: "delete",
  before: [validate(paramsIdValidator, "params")],
  handler: async function (req, res) {
    await models.People.destroy({
      where: {
        id: Number(req.params.id),
      },
    });
    res.sendStatus(204);
  },
};
