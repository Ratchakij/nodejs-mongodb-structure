const bcrypt = require("bcryptjs");

const saltRounds = 12;
exports.hash = (input) => bcrypt.hash(input, saltRounds);
exports.compare = (plainText, hashValue) =>
  bcrypt.compare(plainText, hashValue);
