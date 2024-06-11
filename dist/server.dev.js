"use strict";

var express = require("express");

var jwt = require("jsonwebtoken");

var mongoose = require("mongoose");

var bcrypt = require("bcryptjs");

var cookieParser = require("cookie-parser");

var validate = require("./middle/validate.js");

var cors = require('cors');

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    unique: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  }
}, {
  timestamps: true
});
var userModel = mongoose.model("user", userSchema); //hashedpassword

var hashedPassword = function hashedPassword(password) {
  var res;
  return regeneratorRuntime.async(function hashedPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //middlewares


var registerRoute = function registerRoute(req, res) {
  var _req$body, username, email, password, validUser, user;

  return regeneratorRuntime.async(function registerRoute$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          validUser = userModel.findOne({
            email: email
          });

          if (!validUser) {
            res.json({
              message: "User already exist"
            });
          }

          _context2.t0 = regeneratorRuntime;
          _context2.t1 = userModel;
          _context2.t2 = username;
          _context2.t3 = email;
          _context2.next = 9;
          return regeneratorRuntime.awrap(hashedPassword(password));

        case 9:
          _context2.t4 = _context2.sent;
          _context2.t5 = {
            username: _context2.t2,
            email: _context2.t3,
            password: _context2.t4
          };
          _context2.t6 = _context2.t1.create.call(_context2.t1, _context2.t5);
          _context2.next = 14;
          return _context2.t0.awrap.call(_context2.t0, _context2.t6);

        case 14:
          user = _context2.sent;
          // console.log(user);
          res.send(user);
          res.end();

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var loginRoute = function loginRoute(req, res) {
  var _req$body2, email, password, user, token;

  return regeneratorRuntime.async(function loginRoute$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context3.next = 4;
            break;
          }

          res.status(400);
          throw new Error("All fields are mandatory!");

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 6:
          user = _context3.sent;
          _context3.t0 = user;

          if (!_context3.t0) {
            _context3.next = 12;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          _context3.t0 = _context3.sent;

        case 12:
          if (!_context3.t0) {
            _context3.next = 18;
            break;
          }

          token = jwt.sign({
            user: {
              username: user.username,
              email: user.email,
              id: user.id
            }
          }, "Guruprasad", {
            expiresIn: "10000"
          });
          res.cookie('token', token, {
            httpOnly: true
          });
          res.send({
            message: "success",
            redirect: '/dashboard'
          });
          _context3.next = 20;
          break;

        case 18:
          res.status(401);
          throw new Error("Credentials does not match");

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var homeRoute = function homeRoute(req, res) {
  res.send(req.user);
}; //Routes


app.post("/register", registerRoute);
app.post("/", loginRoute);
app.get("/home", homeRoute);
app.use('/dashboard', validate);
mongoose.connect("mongodb://localhost:27017/Tokens").then(function () {
  console.log("Connected");
  app.listen(8000, function () {
    console.log("Server running on 8000");
  });
});
//# sourceMappingURL=server.dev.js.map
