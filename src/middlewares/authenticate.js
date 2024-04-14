const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError(401, "invalid authorization header");
    }

    const token = authorization.split(" ")[1];
    const decodedPayload = jwtService.verify(token);

    const resUser = await userService.findUserById(decodedPayload.userId);
    if (!resUser) {
      createError("user was not found", 401);
    }

    const user = resUser.toObject(); // change variable to object
    delete user.password; // delete properties from object

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
