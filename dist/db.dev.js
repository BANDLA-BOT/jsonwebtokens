"use strict";

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/AuthJWT').then(function () {
  console.log("DB connected");
})["catch"](function (er) {
  console.log(er);
});
var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});
var Collection = new mongoose.model('Auth', schema);
module.exports = Collection;
//# sourceMappingURL=db.dev.js.map
