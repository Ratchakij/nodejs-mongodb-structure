const createError = require("../utils/create-error");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

/* REGISTER USER */
exports.register = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);
    const isEmailExists = await userService.findUserByEmail(value.email);
    if (isEmailExists) {
      createError("Email already exists", 400);
    }

    value.password = await hashService.hash(value.password);

    const newUser = await userService.createUser(value);
    const payload = { userId: newUser.id };
    const token = jwtService.sign(payload);
    delete newUser.password;
    res.status(201).json({ token, newUser });
  } catch (err) {
    next(err);
  }
};

/* LOGIN */
exports.login = async (req, res, next) => {
  try {
    const value = req.body;

    const resUser = await userService.findUserByEmail(value.email);
    if (!resUser) {
      createError(400, "invalid credentials");
    }

    const isMatch = await hashService.compare(value.password, resUser.password);
    if (!isMatch) {
      createError(400, "Invalid credentials");
    }

    const payload = { userId: resUser.id };
    const token = jwtService.sign(payload);

    const user = resUser.toObject();
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

/* GET USER */
exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
