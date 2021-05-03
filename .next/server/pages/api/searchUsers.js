(function() {
var exports = {};
exports.id = 792;
exports.ids = [792];
exports.modules = {

/***/ 8926:
/***/ (function(module) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(6512);


/***/ }),

/***/ 3309:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var mongoose = __webpack_require__(5619);

var Schema = mongoose.Schema;

var crypto = __webpack_require__(6417);

var user = {
  first: {
    type: String,
    trim: true
  },
  last: {
    type: String,
    trim: true
  },
  artistName: {
    type: String,
    trim: true
  },
  birthYear: {
    type: String,
    trim: true
  },
  wallet: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    index: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  password: {
    type: String,
    validate: [function (password) {
      if (password && password.length >= 6) {
        return true;
      }

      return false;
    }, "Password must be six characters or more"]
  },
  recoveryToken: {
    type: String
  },
  recoveryExpiration: {
    type: Date
  },
  salt: {
    type: String
  },
  emailToken: {
    type: String,
    required: false
  },
  emailVerified: {
    type: Boolean,
    "default": false
  },
  committee: {
    type: Boolean,
    "default": false
  },
  country: {
    type: String,
    trim: true
  },
  countryCode: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  twitterVerified: {
    type: Boolean,
    "default": false
  },
  instagram: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  }
};
var UserSchema = new Schema(user);
UserSchema.pre("save", function _saltPassword(next) {
  if (this.password && this.isNew) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64");
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.methods.hashPassword = function _hashPassword(password) {
  var hashed = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha1").toString("base64");
  return hashed;
};

UserSchema.methods.authenticate = function _authenticate(password) {
  var authenticated = this.password === this.hashPassword(password);
  return authenticated;
};

UserSchema.statics.findUniqueUsername = function findUniqueUsername(username, suffix, callback) {
  var User = this;
  var possibleUsername = username + (suffix || "");
  User.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return User.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

UserSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
/* harmony default export */ __webpack_exports__["default"] = (mongoose.models.User || mongoose.model("User", UserSchema));

/***/ }),

/***/ 3670:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handler; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8926);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7757);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7547);
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3309);




function handler(_x, _x2) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(req, res) {
    var method;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = req.method;
            _context.next = 3;
            return (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)();

          case 3:
            _context.t0 = method;
            _context.next = _context.t0 === "POST" ? 6 : 8;
            break;

          case 6:
            try {
              _models_userModel__WEBPACK_IMPORTED_MODULE_3__.default.findOne({
                username: {
                  $regex: new RegExp("^".concat(req.body.username.toLowerCase().trim(), "$"), "i")
                }
              }, function (err, user) {
                if (err) return res.json(err);
                if (!user) return res.json({
                  error: "User does not exist"
                });
                return res.json({
                  success: user
                });
              }).select("username first last artistName city country website twitter twitterVerified instagram about");
            } catch (error) {
              res.status(400).json({
                success: false
              });
            }

            return _context.abrupt("break", 10);

          case 8:
            res.status(400).json({
              success: false
            });
            return _context.abrupt("break", 10);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handler.apply(this, arguments);
}

/***/ }),

/***/ 7547:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8926);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7757);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5619);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);



var MONGODB_URI = process.env.MONGO;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */


var cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

function dbConnect() {
  return _dbConnect.apply(this, arguments);
}

function _dbConnect() {
  _dbConnect = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var opts;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!cached.conn) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", cached.conn);

          case 2:
            if (!cached.promise) {
              opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false,
                bufferMaxEntries: 0,
                useFindAndModify: false,
                useCreateIndex: true
              };
              cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(MONGODB_URI, opts).then(function (mongoose) {
                return mongoose;
              });
            }

            _context.next = 5;
            return cached.promise;

          case 5:
            cached.conn = _context.sent;
            return _context.abrupt("return", cached.conn);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _dbConnect.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["Z"] = (dbConnect);

/***/ }),

/***/ 6417:
/***/ (function(module) {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 5619:
/***/ (function(module) {

"use strict";
module.exports = require("mongoose");;

/***/ }),

/***/ 6512:
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(3670));
module.exports = __webpack_exports__;

})();