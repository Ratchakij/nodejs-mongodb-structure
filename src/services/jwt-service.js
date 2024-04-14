const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secret-jwt';
const EXPIRE_IN = process.env.JWT_EXPIRE || 1;

exports.sign = payload =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRE_IN });

exports.verify = token => jwt.verify(token, SECRET_KEY);
