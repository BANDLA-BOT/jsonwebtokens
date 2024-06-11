"use strict";

var jwt = require("jsonwebtoken");

var validate = function validate(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function validate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;
          console.log(token);

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            error: 'Access denied. No token provided.'
          }));

        case 4:
          try {
            decoded = jwt.verify(token, 'Guruprasad'); // Replace 'your_secret_key' with your actual secret key

            req.user = decoded;
            next();
          } catch (err) {
            res.status(400).send({
              error: 'Invalid token.'
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = validate;
//# sourceMappingURL=validate.dev.js.map
