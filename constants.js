const secret = "My BaseCamp";
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  PARTIAL_CONTENT: 206
};
const PATH = "/resources/uploads/"
let __basedir = __dirname;

module.exports = { secret, HTTP_STATUS, __basedir, PATH };
