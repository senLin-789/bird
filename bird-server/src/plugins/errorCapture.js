/* */
class FailedRequest extends Error {
  constructor(message = "操作失败", custom = {}) {
    super(message);
    this.name = "FailedRequest";
    this.custom = Object.assign(
      {
        errCode: 1,
        errMsg: message,
      },
      custom
    );
  }
}
global.FailedRequest = FailedRequest;

class BadRequest extends Error {
  constructor(message = "请求参数校验错误", custom = {}) {
    super(message);
    this.name = "BadRequest";
    this.custom = Object.assign(
      {
        errCode: 2,
        errMsg: message,
      },
      custom
    );
  }
}
global.BadRequest = BadRequest;

exports.errorCapture = function (err, req, res, next) {
  if (err instanceof BadRequest) {
    res.status(400).json(err.custom);
    return;
  }
  if (err instanceof FailedRequest) {
    res.status(200).json(err.custom);
    return;
  }
  return res.status(500).send("服务器错误");
};
