const Ajv = require("ajv");
//const ajvFormats = require("ajv-formats");
const ajv = new Ajv({
  allErrors: true,
  useDefaults: false, //使用默认值填充缺失属性
  coerceTypes: false, //允许并执行类型转换
});
//ajvFormats(ajv);

ajv.addKeyword({
  keyword: "numeric",
  validate: (schema, data) => {
    const valueAsNumber = Number.parseInt(data, 10);
    const minimum = schema.numeric && schema.numeric.minimum;
    const maximum = schema.numeric && schema.numeric.maximum;
    if (Number.isInteger(valueAsNumber) && valueAsNumber > 0) {
      if (minimum !== undefined && valueAsNumber < minimum) {
        return false;
      }
      if (maximum !== undefined && valueAsNumber > maximum) {
        return false;
      }
      return true;
    }
    return false;
  },
  errors: false,
});

exports.getSchemaValidator = function (schema) {
  if (!schema) {
    schema = {
      type: "object",
      properties: {
        id: {
          type: "string",
          numeric: {
            minimum: 1,
          },
        },
      },
      required: ["id"],
    };
  }
  return ajv.compile(schema);
};

exports.getPageValidator = function (properties = {}, required = []) {
  let schema = {
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
      ...properties,
    },
    required: ["page", "limit", ...required],
  };
  return ajv.compile(schema);
};

/**
 *
 * @param {object} schemaValidator
 * @param {("body"|"params"|"query")} target
 * @returns {function}
 */
exports.validate = function (schemaValidator, target = "body") {
  return function (req, res, next) {
    const isValid = schemaValidator(req[target]);
    if (isValid) {
      next();
    } else {
      throw new BadRequest(ajv.errorsText(schemaValidator.errors));
    }
  };
};
