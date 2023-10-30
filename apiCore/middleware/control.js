// // auth.js
const { secret, HTTP_STATUS } = require("../../constants");
const { responseHandler } = require("../utils/responseHandler");
const { ROLES } = require("./roles_permissions");
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token and extract user's ID and role
const verifyToken = (req, res, next) => {
  let authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  if (!token) {
    return responseHandler({
      res,
      status: HTTP_STATUS.UNAUTHORIZED,
      message: "No token provided! User Not authenticated",
    });
  }
  //console.log("token",token);
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return responseHandler({
        res,
        status: HTTP_STATUS.UNAUTHORIZED,
        message: "Unauthorized!",
      });
    }
    //adding the id and role to the request
    req.UserId = decoded.id;
    req.userRole = decoded.role;

    next();
    return { id: decoded.id, role: decoded.role };
  });
};

//   // Middleware function to check user's role against required role
const checkRole = (req, res, next) => {
  const role = verifyToken(req, res, next).role;
  if (role === ROLES.ADMIN) {
    next();
  } else {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

module.exports = { verifyToken, checkRole };
