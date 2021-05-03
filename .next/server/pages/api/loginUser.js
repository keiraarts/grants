(function() {
var exports = {};
exports.id = 6134;
exports.ids = [6134];
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

/***/ 3897:
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
/* harmony import */ var _src_server_emails_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1816);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7547);
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3309);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9722);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6417);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_6__);








function validateUsername(string) {
  var regex = /^(?![_.])(?!.*[_.]{2})(?!.*[ _.]{2})(?! *[_]{2})[ _.0-9\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/;
  return string.match(regex);
}

function handler(_x, _x2) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(req, res) {
    var method, exists, exists2, user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = req.method;
            _context.next = 3;
            return (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)();

          case 3:
            _context.t0 = method;
            _context.next = _context.t0 === "POST" ? 6 : 31;
            break;

          case 6:
            _context.prev = 6;

            if (!(!validateUsername(req.body.username) || req.body.username.length > 15)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Invalid username"
            }));

          case 9:
            if (!(req.body.username.length > 15)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "That username is too long"
            }));

          case 11:
            _context.next = 13;
            return _models_userModel__WEBPACK_IMPORTED_MODULE_4__.default.findOne({
              email: {
                $regex: new RegExp("^".concat(req.body.email.toLowerCase().replace(/\s+/g, ""), "$"), "i")
              }
            });

          case 13:
            exists = _context.sent;

            if (!exists) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "That email already exists"
            }));

          case 16:
            _context.next = 18;
            return _models_userModel__WEBPACK_IMPORTED_MODULE_4__.default.findOne({
              username: {
                $regex: new RegExp("^".concat(req.body.username.toLowerCase().replace(/\s+/g, ""), "$"), "i")
              }
            });

          case 18:
            exists2 = _context.sent;

            if (!(exists2 && exists2.username.toLowerCase() === req.body.username.toLowerCase().replace(/\s+/g, ""))) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "That username already exists"
            }));

          case 21:
            if (!(req.body.password !== req.body.confirmPassword)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Passwords do not match"
            }));

          case 23:
            user = new _models_userModel__WEBPACK_IMPORTED_MODULE_4__.default({
              first: req.body.first,
              last: req.body.last,
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              committee: false,
              emailToken: crypto__WEBPACK_IMPORTED_MODULE_6___default().randomBytes(32).toString("hex")
            });
            return _context.abrupt("return", user.save(function (err, data) {
              if (err) return res.json({
                error: "There was an unknown issue, please notify sevens@grants.art"
              });
              transporter.sendMail(_src_server_emails_templates__WEBPACK_IMPORTED_MODULE_2__.verification(user.email, user.username, user.emailToken));
              var token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default().sign({
                username: user.username,
                id: data.id
              }, process.env.JWT);
              return res.json({
                username: user.username,
                id: user.id,
                token: token,
                committee: false
              });
            }));

          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](6);
            res.status(400).json({
              success: false
            });

          case 30:
            return _context.abrupt("break", 33);

          case 31:
            res.status(400).json({
              success: false
            });
            return _context.abrupt("break", 33);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 27]]);
  }));
  return _handler.apply(this, arguments);
}

/***/ }),

/***/ 1816:
/***/ (function(__unused_webpack_module, exports) {

function verification(email, username, token) {
  return {
    from: '"Sevens Foundation ❤️" <love@grants.art>',
    to: email,
    subject: 'Sevens Foundation Verification',
    text: "".concat(username, ", please verify your e-mail!"),
    html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n    <html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\">\n        <head>\n          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\n          <!--[if !mso]><!-->\n          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n          <!--<![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n          <xml>\n            <o:OfficeDocumentSettings>\n              <o:AllowPNG/>\n              <o:PixelsPerInch>96</o:PixelsPerInch>\n            </o:OfficeDocumentSettings>\n          </xml>\n          <![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n      <style type=\"text/css\">\n        body {width: 600px;margin: 0 auto;}\n        table {border-collapse: collapse;}\n        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n        img {-ms-interpolation-mode: bicubic;}\n      </style>\n    <![endif]-->\n          <style type=\"text/css\">\n        body, p, div {\n          font-family: arial,helvetica,sans-serif;\n          font-size: 14px;\n        }\n        body {\n          color: #000000;\n        }\n        body a {\n          color: #1188E6;\n          text-decoration: none;\n        }\n        p { margin: 0; padding: 0; }\n        table.wrapper {\n          width:100% !important;\n          table-layout: fixed;\n          -webkit-font-smoothing: antialiased;\n          -webkit-text-size-adjust: 100%;\n          -moz-text-size-adjust: 100%;\n          -ms-text-size-adjust: 100%;\n        }\n        img.max-width {\n          max-width: 100% !important;\n        }\n        .column.of-2 {\n          width: 50%;\n        }\n        .column.of-3 {\n          width: 33.333%;\n        }\n        .column.of-4 {\n          width: 25%;\n        }\n        @media screen and (max-width:480px) {\n          .preheader .rightColumnContent,\n          .footer .rightColumnContent {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent div,\n          .preheader .rightColumnContent span,\n          .footer .rightColumnContent div,\n          .footer .rightColumnContent span {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent,\n          .preheader .leftColumnContent {\n            font-size: 80% !important;\n            padding: 5px 0;\n          }\n          table.wrapper-mobile {\n            width: 100% !important;\n            table-layout: fixed;\n          }\n          img.max-width {\n            height: auto !important;\n            max-width: 100% !important;\n          }\n          a.bulletproof-button {\n            display: block !important;\n            width: auto !important;\n            font-size: 80%;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          }\n          .columns {\n            width: 100% !important;\n          }\n          .column {\n            display: block !important;\n            width: 100% !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n            margin-left: 0 !important;\n            margin-right: 0 !important;\n          }\n          .social-icon-column {\n            display: inline-block !important;\n          }\n        }\n      </style>\n          <!--user entered Head Start--><!--End Head user entered-->\n        </head>\n        <body>\n          <center class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;\">\n            <div class=\"webkit\">\n              <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#FFFFFF\">\n                <tr>\n                  <td valign=\"top\" bgcolor=\"#FFFFFF\" width=\"100%\">\n                    <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                      <tr>\n                        <td width=\"100%\">\n                          <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                            <tr>\n                              <td>\n                                <!--[if mso]>\n        <center>\n        <table><tr><td width=\"600\">\n      <![endif]-->\n                                        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:600px;\" align=\"center\">\n                                          <tr>\n                                            <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#000000; text-align:left;\" bgcolor=\"#FFFFFF\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\n        <tr>\n          <td role=\"module-content\">\n            <p></p>\n          </td>\n        </tr>\n      </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"355d1340-5abb-4552-9977-c8f4f2fc181d\">\n        <tbody>\n          <tr>\n            <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n              \n            <a href=\"https://grants.art\"><img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;\" width=\"128\" alt=\"Sevens Grant Website\" data-proportionally-constrained=\"true\" data-responsive=\"false\" src=\"http://cdn.mcauto-images-production.sendgrid.net/a93830be5e6c28e5/22ee24b4-53c9-4719-a8bc-12585f9179f7/512x512.png\" height=\"128\"></a></td>\n          </tr>\n        </tbody>\n      </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"900357c7-706f-4e71-869c-7df9bcb4a718\">\n        <tbody>\n          <tr>\n            <td style=\"padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit\"><span style=\"font-family: georgia,serif\">Thank you for registering an account for Sevens Foundation. We are here to empower artists across the globe and we appreciate your support </span>\u2764\uFE0F</div><div></div></div></td>\n          </tr>\n        </tbody>\n      </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"module\" data-role=\"module-button\" data-type=\"button\" role=\"module\" style=\"table-layout:fixed;\" width=\"100%\" data-muid=\"1a87c33d-2416-460f-a9ae-56e5a8cb61e8\">\n          <tbody>\n            <tr>\n              <td align=\"center\" bgcolor=\"\" class=\"outer-td\" style=\"padding:0px 0px 0px 0px;\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"wrapper-mobile\" style=\"text-align:center;\">\n                  <tbody>\n                    <tr>\n                    <td align=\"center\" bgcolor=\"#333333\" class=\"inner-td\" style=\"border-radius:6px; font-size:16px; text-align:center; background-color:inherit;\">\n                      <a href=\"https://grants.art/verifyemail/".concat(token, "\" style=\"background-color:#333333; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:40px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; width:480px;\" target=\"_blank\">Verify Email</a>\n                    </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </td>\n            </tr>\n          </tbody>\n        </table><div data-role=\"module-unsubscribe\" class=\"module\" role=\"module\" data-type=\"unsubscribe\" style=\"color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;\" data-muid=\"4e838cf3-9892-4a6d-94d6-170e474d21e5\"><div class=\"Unsubscribe--addressLine\"></div><p style=\"font-size:12px; line-height:20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"https://grants.art/account\" target=\"_blank\" style=\"\">Unsubscribe</a></p></div></td>\n                                          </tr>\n                                        </table>\n                                        <!--[if mso]>\n                                      </td>\n                                    </tr>\n                                  </table>\n                                </center>\n                                <![endif]-->\n                              </td>\n                            </tr>\n                          </table>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </center>\n        </body>\n      </html>")
  };
}

function applicationConfirmation(email, name) {
  return {
    from: '"Sevens Foundation ❤️" <love@grants.art>',
    to: email,
    subject: 'Sevens Foundation Application Confirmation',
    text: "Thank you for applying",
    html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n    <html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\">\n        <head>\n          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\n          <!--[if !mso]><!-->\n          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n          <!--<![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n          <xml>\n            <o:OfficeDocumentSettings>\n              <o:AllowPNG/>\n              <o:PixelsPerInch>96</o:PixelsPerInch>\n            </o:OfficeDocumentSettings>\n          </xml>\n          <![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n      <style type=\"text/css\">\n        body {width: 600px;margin: 0 auto;}\n        table {border-collapse: collapse;}\n        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n        img {-ms-interpolation-mode: bicubic;}\n      </style>\n    <![endif]-->\n          <style type=\"text/css\">\n        body, p, div {\n          font-family: arial,helvetica,sans-serif;\n          font-size: 14px;\n        }\n        body {\n          color: #000000;\n        }\n        body a {\n          color: #1188E6;\n          text-decoration: none;\n        }\n        p { margin: 0; padding: 0; }\n        table.wrapper {\n          width:100% !important;\n          table-layout: fixed;\n          -webkit-font-smoothing: antialiased;\n          -webkit-text-size-adjust: 100%;\n          -moz-text-size-adjust: 100%;\n          -ms-text-size-adjust: 100%;\n        }\n        img.max-width {\n          max-width: 100% !important;\n        }\n        .column.of-2 {\n          width: 50%;\n        }\n        .column.of-3 {\n          width: 33.333%;\n        }\n        .column.of-4 {\n          width: 25%;\n        }\n        @media screen and (max-width:480px) {\n          .preheader .rightColumnContent,\n          .footer .rightColumnContent {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent div,\n          .preheader .rightColumnContent span,\n          .footer .rightColumnContent div,\n          .footer .rightColumnContent span {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent,\n          .preheader .leftColumnContent {\n            font-size: 80% !important;\n            padding: 5px 0;\n          }\n          table.wrapper-mobile {\n            width: 100% !important;\n            table-layout: fixed;\n          }\n          img.max-width {\n            height: auto !important;\n            max-width: 100% !important;\n          }\n          a.bulletproof-button {\n            display: block !important;\n            width: auto !important;\n            font-size: 80%;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          }\n          .columns {\n            width: 100% !important;\n          }\n          .column {\n            display: block !important;\n            width: 100% !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n            margin-left: 0 !important;\n            margin-right: 0 !important;\n          }\n          .social-icon-column {\n            display: inline-block !important;\n          }\n        }\n      </style>\n          <!--user entered Head Start--><!--End Head user entered-->\n        </head>\n        <body>\n          <center class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;\">\n            <div class=\"webkit\">\n              <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#FFFFFF\">\n                <tr>\n                  <td valign=\"top\" bgcolor=\"#FFFFFF\" width=\"100%\">\n                    <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                      <tr>\n                        <td width=\"100%\">\n                          <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                            <tr>\n                              <td>\n                                <!--[if mso]>\n        <center>\n        <table><tr><td width=\"600\">\n      <![endif]-->\n                                        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:600px;\" align=\"center\">\n                                          <tr>\n                                            <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#000000; text-align:left;\" bgcolor=\"#FFFFFF\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\n        <tr>\n          <td role=\"module-content\">\n            <p></p>\n          </td>\n        </tr>\n      </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"355d1340-5abb-4552-9977-c8f4f2fc181d\">\n        <tbody>\n          <tr>\n            <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n              \n            <a href=\"https://grants.art\"><img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;\" width=\"128\" alt=\"Sevens Grant Website\" data-proportionally-constrained=\"true\" data-responsive=\"false\" src=\"http://cdn.mcauto-images-production.sendgrid.net/a93830be5e6c28e5/22ee24b4-53c9-4719-a8bc-12585f9179f7/512x512.png\" height=\"128\"></a></td>\n          </tr>\n        </tbody>\n      </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"900357c7-706f-4e71-869c-7df9bcb4a718\">\n        <tbody>\n          <tr>\n            <td style=\"padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit\"><span style=\"font-family: georgia,serif\">Thank you for submitting your art piece to the ".concat(name, " Exhibition, you can check the status on the submission page and will update once the curation is complete!</span></div><div></div></div></td>\n          </tr>\n        </tbody>\n      </table><div data-role=\"module-unsubscribe\" class=\"module\" role=\"module\" data-type=\"unsubscribe\" style=\"color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;\" data-muid=\"4e838cf3-9892-4a6d-94d6-170e474d21e5\"><div class=\"Unsubscribe--addressLine\"></div><p style=\"font-size:12px; line-height:20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"{{{unsubscribe}}}\" target=\"_blank\" style=\"\">Unsubscribe</a></p></div></td>\n                                          </tr>\n                                        </table>\n                                        <!--[if mso]>\n                                      </td>\n                                    </tr>\n                                  </table>\n                                </center>\n                                <![endif]-->\n                              </td>\n                            </tr>\n                          </table>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </center>\n        </body>\n      </html>")
  };
}

function passRecovery(email, username, token) {
  return {
    from: '"Sevens Foundation ❤️" <love@grants.art>',
    to: email,
    subject: 'Password Recovery',
    text: "Don't forget your password!",
    html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n    <html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\">\n        <head>\n          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\n          <!--[if !mso]><!-->\n          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n          <!--<![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n          <xml>\n            <o:OfficeDocumentSettings>\n              <o:AllowPNG/>\n              <o:PixelsPerInch>96</o:PixelsPerInch>\n            </o:OfficeDocumentSettings>\n          </xml>\n          <![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n      <style type=\"text/css\">\n        body {width: 600px;margin: 0 auto;}\n        table {border-collapse: collapse;}\n        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n        img {-ms-interpolation-mode: bicubic;}\n      </style>\n    <![endif]-->\n          <style type=\"text/css\">\n        body, p, div {\n          font-family: arial,helvetica,sans-serif;\n          font-size: 14px;\n        }\n        body {\n          color: #000000;\n        }\n        body a {\n          color: #1188E6;\n          text-decoration: none;\n        }\n        p { margin: 0; padding: 0; }\n        table.wrapper {\n          width:100% !important;\n          table-layout: fixed;\n          -webkit-font-smoothing: antialiased;\n          -webkit-text-size-adjust: 100%;\n          -moz-text-size-adjust: 100%;\n          -ms-text-size-adjust: 100%;\n        }\n        img.max-width {\n          max-width: 100% !important;\n        }\n        .column.of-2 {\n          width: 50%;\n        }\n        .column.of-3 {\n          width: 33.333%;\n        }\n        .column.of-4 {\n          width: 25%;\n        }\n        ul ul ul ul  {\n          list-style-type: disc !important;\n        }\n        ol ol {\n          list-style-type: lower-roman !important;\n        }\n        ol ol ol {\n          list-style-type: lower-latin !important;\n        }\n        ol ol ol ol {\n          list-style-type: decimal !important;\n        }\n        @media screen and (max-width:480px) {\n          .preheader .rightColumnContent,\n          .footer .rightColumnContent {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent div,\n          .preheader .rightColumnContent span,\n          .footer .rightColumnContent div,\n          .footer .rightColumnContent span {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent,\n          .preheader .leftColumnContent {\n            font-size: 80% !important;\n            padding: 5px 0;\n          }\n          table.wrapper-mobile {\n            width: 100% !important;\n            table-layout: fixed;\n          }\n          img.max-width {\n            height: auto !important;\n            max-width: 100% !important;\n          }\n          a.bulletproof-button {\n            display: block !important;\n            width: auto !important;\n            font-size: 80%;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          }\n          .columns {\n            width: 100% !important;\n          }\n          .column {\n            display: block !important;\n            width: 100% !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n            margin-left: 0 !important;\n            margin-right: 0 !important;\n          }\n          .social-icon-column {\n            display: inline-block !important;\n          }\n        }\n      </style>\n          <!--user entered Head Start--><!--End Head user entered-->\n        </head>\n        <body>\n          <center class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;\">\n            <div class=\"webkit\">\n              <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#FFFFFF\">\n                <tr>\n                  <td valign=\"top\" bgcolor=\"#FFFFFF\" width=\"100%\">\n                    <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                      <tr>\n                        <td width=\"100%\">\n                          <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                            <tr>\n                              <td>\n                                <!--[if mso]>\n        <center>\n        <table><tr><td width=\"600\">\n      <![endif]-->\n                                        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:600px;\" align=\"center\">\n                                          <tr>\n                                            <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#000000; text-align:left;\" bgcolor=\"#FFFFFF\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\n        <tr>\n          <td role=\"module-content\">\n            <p></p>\n          </td>\n        </tr>\n      </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"355d1340-5abb-4552-9977-c8f4f2fc181d\">\n        <tbody>\n          <tr>\n            <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n              \n            <a href=\"https://grants.art\"><img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;\" width=\"128\" alt=\"Sevens Grant Website\" data-proportionally-constrained=\"true\" data-responsive=\"false\" src=\"http://cdn.mcauto-images-production.sendgrid.net/a93830be5e6c28e5/22ee24b4-53c9-4719-a8bc-12585f9179f7/512x512.png\" height=\"128\"></a></td>\n          </tr>\n        </tbody>\n      </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"900357c7-706f-4e71-869c-7df9bcb4a718\" data-mc-module-version=\"2019-10-22\">\n        <tbody>\n          <tr>\n            <td style=\"padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-family: georgia, serif\">Hey ".concat(username, "!</span></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><br></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-family: georgia, serif\">Seems like you've requested a new password. Please click the link below to set a new one - this link will expire within 48 hours!</span></div><div></div></div></td>\n          </tr>\n        </tbody>\n      </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"module\" data-role=\"module-button\" data-type=\"button\" role=\"module\" style=\"table-layout:fixed;\" width=\"100%\" data-muid=\"865c9c04-32ba-4198-b27d-f9e0d0e734bc\">\n          <tbody>\n            <tr>\n              <td align=\"center\" bgcolor=\"\" class=\"outer-td\" style=\"padding:0px 0px 0px 0px;\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"wrapper-mobile\" style=\"text-align:center;\">\n                  <tbody>\n                    <tr>\n                    <td align=\"center\" bgcolor=\"#333333\" class=\"inner-td\" style=\"border-radius:6px; font-size:16px; text-align:center; background-color:inherit;\">\n                      <a href=\"https://grants.art/recoveraccount/").concat(token, "\" style=\"background-color:#333333; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;\" target=\"_blank\">Set a new password</a>\n                    </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </td>\n            </tr>\n          </tbody>\n        </table><div data-role=\"module-unsubscribe\" class=\"module\" role=\"module\" data-type=\"unsubscribe\" style=\"color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;\" data-muid=\"4e838cf3-9892-4a6d-94d6-170e474d21e5\"><div class=\"Unsubscribe--addressLine\"></div><p style=\"font-size:12px; line-height:20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"{{{unsubscribe}}}\" target=\"_blank\" style=\"\">Unsubscribe</a></p></div></td>\n                                          </tr>\n                                        </table>\n                                        <!--[if mso]>\n                                      </td>\n                                    </tr>\n                                  </table>\n                                </center>\n                                <![endif]-->\n                              </td>\n                            </tr>\n                          </table>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </center>\n        </body>\n      </html>")
  };
}

function applicationProcess(email) {
  return {
    from: '"Sevens Foundation ❤️" <love@grants.art>',
    to: email,
    subject: 'Sevens Minting Tomorrow - LAST CALL',
    text: "Thank you for applying",
    html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n    <html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\">\n        <head>\n          <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\n          <!--[if !mso]><!-->\n          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n          <!--<![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n          <xml>\n            <o:OfficeDocumentSettings>\n              <o:AllowPNG/>\n              <o:PixelsPerInch>96</o:PixelsPerInch>\n            </o:OfficeDocumentSettings>\n          </xml>\n          <![endif]-->\n          <!--[if (gte mso 9)|(IE)]>\n      <style type=\"text/css\">\n        body {width: 600px;margin: 0 auto;}\n        table {border-collapse: collapse;}\n        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n        img {-ms-interpolation-mode: bicubic;}\n      </style>\n    <![endif]-->\n          <style type=\"text/css\">\n        body, p, div {\n          font-family: arial,helvetica,sans-serif;\n          font-size: 14px;\n        }\n        body {\n          color: #000000;\n        }\n        body a {\n          color: #1188E6;\n          text-decoration: none;\n        }\n        p { margin: 0; padding: 0; }\n        table.wrapper {\n          width:100% !important;\n          table-layout: fixed;\n          -webkit-font-smoothing: antialiased;\n          -webkit-text-size-adjust: 100%;\n          -moz-text-size-adjust: 100%;\n          -ms-text-size-adjust: 100%;\n        }\n        img.max-width {\n          max-width: 100% !important;\n        }\n        .column.of-2 {\n          width: 50%;\n        }\n        .column.of-3 {\n          width: 33.333%;\n        }\n        .column.of-4 {\n          width: 25%;\n        }\n        @media screen and (max-width:480px) {\n          .preheader .rightColumnContent,\n          .footer .rightColumnContent {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent div,\n          .preheader .rightColumnContent span,\n          .footer .rightColumnContent div,\n          .footer .rightColumnContent span {\n            text-align: left !important;\n          }\n          .preheader .rightColumnContent,\n          .preheader .leftColumnContent {\n            font-size: 80% !important;\n            padding: 5px 0;\n          }\n          table.wrapper-mobile {\n            width: 100% !important;\n            table-layout: fixed;\n          }\n          img.max-width {\n            height: auto !important;\n            max-width: 100% !important;\n          }\n          a.bulletproof-button {\n            display: block !important;\n            width: auto !important;\n            font-size: 80%;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n          }\n          .columns {\n            width: 100% !important;\n          }\n          .column {\n            display: block !important;\n            width: 100% !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n            margin-left: 0 !important;\n            margin-right: 0 !important;\n          }\n          .social-icon-column {\n            display: inline-block !important;\n          }\n        }\n      </style>\n          <!--user entered Head Start--><!--End Head user entered-->\n        </head>\n        <body>\n          <center class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;\">\n            <div class=\"webkit\">\n              <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#FFFFFF\">\n                <tr>\n                  <td valign=\"top\" bgcolor=\"#FFFFFF\" width=\"100%\">\n                    <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                      <tr>\n                        <td width=\"100%\">\n                          <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                            <tr>\n                              <td>\n                                <!--[if mso]>\n        <center>\n        <table><tr><td width=\"600\">\n      <![endif]-->\n                                        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:600px;\" align=\"center\">\n                                          <tr>\n                                            <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#000000; text-align:left;\" bgcolor=\"#FFFFFF\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\n        <tr>\n          <td role=\"module-content\">\n            <p></p>\n          </td>\n        </tr>\n      </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"355d1340-5abb-4552-9977-c8f4f2fc181d\">\n        <tbody>\n          <tr>\n            <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n              \n            <a href=\"https://grants.art\"><img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;\" width=\"128\" alt=\"Sevens Grant Website\" data-proportionally-constrained=\"true\" data-responsive=\"false\" src=\"http://cdn.mcauto-images-production.sendgrid.net/a93830be5e6c28e5/22ee24b4-53c9-4719-a8bc-12585f9179f7/512x512.png\" height=\"128\"></a></td>\n          </tr>\n        </tbody>\n      </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"900357c7-706f-4e71-869c-7df9bcb4a718\" data-mc-module-version=\"2019-10-22\">\n        <tbody>\n          <tr>\n            <td style=\"padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-family: georgia, serif\">We are minting everyone's first ever NFT starting tomorrow (Grantees first) and are missing your approval finalization!</span></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><br></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-family: georgia, serif\">Today is the last day to accept and if you would like to proceed with the Sevens Genesis Grant, please update all artwork details including its title, description, and verified wallet so that you will be included in the exhibition. Please be aware that some nominee submissions will need to be screened first before we mint the Nominee Exhibition.</span></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><br></div>\n    <div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-family: georgia, serif\">If you have already notified us about your removal of participation, we sincerely apologize for our extra e-mails - this should be the last one. We thank you so much for your time and interest.</span></div>\n    <div style=\"font-family: inherit\"><br></div>\n    <div style=\"font-family: inherit\"><span style=\"font-family: georgia, serif\">Much love</span></div><div></div></div></td>\n          </tr>\n        </tbody>\n      </table><div data-role=\"module-unsubscribe\" class=\"module\" role=\"module\" data-type=\"unsubscribe\" style=\"color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;\" data-muid=\"4e838cf3-9892-4a6d-94d6-170e474d21e5\"><div class=\"Unsubscribe--addressLine\"></div><p style=\"font-size:12px; line-height:20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"{{{unsubscribe}}}\" target=\"_blank\" style=\"\">Unsubscribe</a></p></div></td>\n                                          </tr>\n                                        </table>\n                                        <!--[if mso]>\n                                      </td>\n                                    </tr>\n                                  </table>\n                                </center>\n                                <![endif]-->\n                              </td>\n                            </tr>\n                          </table>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </center>\n        </body>\n      </html>"
  };
}

exports.applicationProcess = applicationProcess;
exports.applicationConfirmation = applicationConfirmation;
exports.passRecovery = passRecovery;
exports.verification = verification;

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(3897));
module.exports = __webpack_exports__;

})();