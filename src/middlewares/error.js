// const { ValidationError } = require('joi');
// const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

module.exports = (err, req, res, next) => {
  console.log(err);

  //   if (err instanceof ValidationError) {
  //     err.statusCode = 400;
  //   } else if (err instanceof TokenExpiredError) {
  //     err.statusCode = 401;
  //   } else if (err instanceof JsonWebTokenError) {
  //     err.statusCode = 401;
  //   }

  res.status(err.statusCode || 500).json({ message: err.message });
};
