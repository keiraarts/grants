(function() {
var exports = {};
exports.id = 8069;
exports.ids = [8069];
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

/***/ 6076:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var mongoose = __webpack_require__(5619);

var Schema = mongoose.Schema;
var organizer = {
  admins: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  name: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  logo: {
    type: String
  },
  about: {
    type: String,
    trim: true,
    required: true
  },
  email: {
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
  instagram: {
    type: String,
    trim: true
  },
  wallet: {
    type: String
  },
  active: {
    type: Boolean,
    "default": false
  }
};
var OrganizerSchema = new Schema(organizer);
OrganizerSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
/* harmony default export */ __webpack_exports__["default"] = (mongoose.models.Organizer || mongoose.model("Organizer", OrganizerSchema));

/***/ }),

/***/ 935:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
var mongoose = __webpack_require__(5619);

var Schema = mongoose.Schema;

__webpack_require__(8735);

var programApplicant = {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  program: {
    type: mongoose.Schema.ObjectId,
    ref: "Program",
    required: true
  },
  statement: {
    type: String,
    trim: true,
    required: true
  },
  additional: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  canvas: {
    type: String,
    required: true
  },
  art: {
    type: String,
    required: true
  },
  artWeb: {
    type: String,
    required: true
  },
  ineligible: {
    type: Boolean,
    "default": false
  },
  flagged: [{
    id: {
      type: String
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    type: {
      type: String,
      trim: true
    },
    message: {
      type: String
    }
  }],
  approvalCount: {
    type: Number,
    "default": 0
  },
  rejectCount: {
    type: Number,
    "default": 0
  },
  approved: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  }],
  rejected: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  }],
  emailed: {
    type: Boolean,
    "default": false
  },
  accepted: {
    type: Boolean,
    "default": false
  },
  prepared: {
    type: Boolean,
    "default": false
  },
  finalized: {
    type: Boolean,
    "default": false
  },
  published: {
    type: Boolean,
    "default": false
  },
  order: {
    type: Number
  },
  arweave: {
    type: String
  }
};
var ProgramApplicantSchema = new Schema(programApplicant);
ProgramApplicantSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
/* harmony default export */ __webpack_exports__["Z"] = (mongoose.models.ProgramApplicant || mongoose.model("ProgramApplicant", ProgramApplicantSchema));

/***/ }),

/***/ 8735:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var mongoose = __webpack_require__(5619);

var Schema = mongoose.Schema;

__webpack_require__(6076);

__webpack_require__(3309);

var program = {
  organizers: [{
    type: mongoose.Schema.ObjectId,
    ref: "Organizer"
  }],
  name: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  tagline: {
    type: String,
    trime: true
  },
  logistics: {
    type: String,
    trim: true,
    required: true
  },
  criteria: {
    type: String,
    trim: true,
    required: true
  },
  curators: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  active: {
    // Shown in application list
    type: Boolean,
    "default": false
  },
  isProtected: {
    type: Boolean,
    "default": false
  },
  passcode: {
    type: String
  },
  open: {
    type: Date
  },
  close: {
    type: Date
  },
  closeApplication: {
    type: Boolean
  },
  perpetual: {
    type: Boolean,
    "default": false
  },
  passByVotes: {
    type: Boolean,
    "default": true
  },
  blindVoting: {
    type: Boolean,
    "default": true
  },
  topThreshold: {
    type: Number,
    "default": 10
  },
  voteThreshold: {
    type: Number,
    "default": 3
  },
  contractAddress: {
    type: String
  },
  creationInProgress: {
    type: Boolean,
    "default": false
  },
  ownershipTransferred: {
    type: Boolean,
    "default": false
  },
  mintToArtist: {
    type: Boolean,
    "default": false
  },
  curationLock: {
    type: Boolean,
    "default": false
  },
  hideResults: {
    type: Boolean,
    "default": false
  },
  curatorAddress: {
    type: String
  },
  mintInProgress: {
    type: Boolean
  },
  exhibiting: {
    type: Boolean,
    "default": false
  },
  finalized: {
    type: Boolean,
    "default": false
  },
  order: {
    type: Number
  },
  total: {
    type: Number,
    "default": 0
  }
};
var ProgramSchema = new Schema(program);
ProgramSchema.set("toJSON", {
  getters: true,
  virtuals: true
});
/* harmony default export */ __webpack_exports__["default"] = (mongoose.models.Program || mongoose.model("Program", ProgramSchema));

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

/***/ 2661:
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
/* harmony import */ var _src_server_services_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(879);
/* harmony import */ var _src_server_services_authorization_service__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_server_services_authorization_service__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7547);
/* harmony import */ var _models_programApplicantModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(935);
/* harmony import */ var _models_organizerModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6076);
/* harmony import */ var _models_programModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8735);







function handler(_x, _x2) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(req, res) {
    var method, jwt, organizer;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = req.method;
            _context.next = 3;
            return (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)();

          case 3:
            _context.t0 = method;
            _context.next = _context.t0 === "POST" ? 6 : 20;
            break;

          case 6:
            _context.prev = 6;
            jwt = _src_server_services_authorization_service__WEBPACK_IMPORTED_MODULE_2___default()(req.headers.authorization, res, function (jwt) {
              return jwt;
            });
            _context.next = 10;
            return _models_organizerModel__WEBPACK_IMPORTED_MODULE_5__.default.findOne({
              admins: jwt.id
            });

          case 10:
            organizer = _context.sent;

            if (organizer) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Authentication error"
            }));

          case 13:
            return _context.abrupt("return", _models_programModel__WEBPACK_IMPORTED_MODULE_6__.default.findById(req.body.program, function (err, program) {
              if (!program.organizers.find(function (e) {
                return e.equals(organizer._id);
              })) return res.json({
                error: "Authentication error"
              });
              program.curationLock = req.body.curationLock;
              program.save();
              return err ? res.status(500).json(err) : res.json({
                success: "Updated"
              });
            }));

          case 16:
            _context.prev = 16;
            _context.t1 = _context["catch"](6);
            res.status(400).json({
              success: false
            });

          case 19:
            return _context.abrupt("break", 22);

          case 20:
            res.status(400).json({
              success: false
            });
            return _context.abrupt("break", 22);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 16]]);
  }));
  return _handler.apply(this, arguments);
}

/***/ }),

/***/ 879:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var jwt = __webpack_require__(9722);

var ENV = process.env;

module.exports = function (token, res, callback) {
  try {
    var jwtUser = jwt.verify(token, ENV.JWT);
    return callback(jwtUser);
  } catch (err) {
    console.log('JWT ERROR: ', err.message);
    return res.status(500).json({
      error: 'Authorization error'
    });
  }
};

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

/***/ 9722:
/***/ (function(module) {

"use strict";
module.exports = require("jsonwebtoken");;

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(2661));
module.exports = __webpack_exports__;

})();