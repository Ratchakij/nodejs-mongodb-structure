const express = require("express");

const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validator/validate-auth");
const authenticate = require("../middlewares/authenticate");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/get-user", authenticate, authController.getUser);

module.exports = router;
