(function() {
var exports = {};
exports.id = 8892;
exports.ids = [8892];
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

/***/ 2784:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
var mongoose = __webpack_require__(5619);

var Schema = mongoose.Schema;

__webpack_require__(3309);

var gallery = {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    "default": 0
  },
  nfts: [{
    id: {
      type: String,
      "default": 0
    },
    order: {
      type: Number,
      "default": 0
    },
    creatorAddress: {
      type: String,
      trim: true
    },
    creatorName: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    imageType: {
      type: String,
      trim: true
    },
    poster: {
      type: String,
      trim: true
    },
    external: {
      type: String,
      trim: true
    },
    opensea: {
      type: String,
      trim: true
    },
    traits: [{
      displayType: {
        type: String,
        trim: true
      },
      maxValue: {
        type: String,
        trim: true
      },
      order: {
        type: String,
        trim: true
      },
      traitCount: {
        type: Number,
        trim: true
      },
      traitType: {
        type: String,
        trim: true
      },
      value: {
        type: String,
        trim: true
      }
    }]
  }]
};
var GallerySchema = new Schema(gallery);
GallerySchema.set("toJSON", {
  getters: true,
  virtuals: true
});
/* harmony default export */ __webpack_exports__["Z"] = (mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema));

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

/***/ 278:
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
/* harmony import */ var _models_galleryModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2784);
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3309);





function handler(_x, _x2) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(req, res) {
    var method, jwt, user, gallery;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = req.method;
            _context.next = 3;
            return (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)();

          case 3:
            _context.t0 = method;
            _context.next = _context.t0 === "POST" ? 6 : 32;
            break;

          case 6:
            _context.prev = 6;
            jwt = auth(req.headers.authorization, res, function (jwt) {
              return jwt;
            });
            _context.next = 10;
            return _models_userModel__WEBPACK_IMPORTED_MODULE_4__.default.findById(jwt.id);

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Authentication error"
            }));

          case 13:
            _context.next = 15;
            return _models_galleryModel__WEBPACK_IMPORTED_MODULE_3__/* .default.findById */ .Z.findById(req.body.gallery);

          case 15:
            gallery = _context.sent;

            if (gallery) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Could not find gallery"
            }));

          case 18:
            if (gallery.user.equals(jwt.id)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Authentication error"
            }));

          case 20:
            if (!(!req.body.nfts || !req.body.nfts.length)) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Issue reordering"
            }));

          case 22:
            req.body.nfts.forEach(function (nft) {
              gallery.nfts.forEach(function (find) {
                if (find.id === nft.id) find.order = nft.order;
              });
            });
            gallery.save();
            return _context.abrupt("return", res.json({
              success: "NFT order updated"
            }));

          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](6);
            console.error(_context.t1);
            res.status(400).json({
              success: false,
              message: "fetch failed"
            });

          case 31:
            return _context.abrupt("break", 34);

          case 32:
            res.status(400).json({
              success: false,
              message: "route not matched"
            });
            return _context.abrupt("break", 34);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 27]]);
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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(278));
module.exports = __webpack_exports__;

})();