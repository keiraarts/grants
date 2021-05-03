(function() {
var exports = {};
exports.id = 1384;
exports.ids = [1384];
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

/***/ 317:
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
/* harmony import */ var _src_server_emails_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1816);
/* harmony import */ var _utils_dbConnect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7547);
/* harmony import */ var _models_programApplicantModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(935);
/* harmony import */ var _models_organizerModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6076);
/* harmony import */ var _models_programModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8735);
/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3309);
/* harmony import */ var get_media_dimensions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9643);
/* harmony import */ var get_media_dimensions__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(get_media_dimensions__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var node_video_resize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1318);
/* harmony import */ var node_video_resize__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(node_video_resize__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _gumlet_gif_resize__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2138);
/* harmony import */ var _gumlet_gif_resize__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_gumlet_gif_resize__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1669);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2413);
/* harmony import */ var stream__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(stream__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8123);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var handbrake_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1241);
/* harmony import */ var handbrake_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(handbrake_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6417);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2249);
/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(jimp__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5747);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_18__);



















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
            return (0,_utils_dbConnect__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)();

          case 3:
            _context.t0 = method;
            _context.next = _context.t0 === "POST" ? 6 : 8;
            break;

          case 6:
            try {
              _src_server_services_authorization_service__WEBPACK_IMPORTED_MODULE_2___default()(req.headers.authorization, res, function (jwt) {
                _models_userModel__WEBPACK_IMPORTED_MODULE_8__.default.findById(jwt.id, function (err, user) {
                  if (!user) return res.status(401).json({
                    err: "Authentication error"
                  });
                  return _models_programApplicantModel__WEBPACK_IMPORTED_MODULE_5__/* .default.findOne */ .Z.findOne({
                    user: user._id
                  }, function (err, applicant) {
                    applicant.minted = req.body.minted;
                    applicant.description = req.body.description;
                    applicant.name = req.body.name;
                    applicant.title = req.body.title;
                    applicant.save();
                    user.artistName = req.body.name;
                    user.birthYear = req.body.birthYear;
                    user.save();
                    return res.json("Application updated");
                  });
                });
              });
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

/***/ 2138:
/***/ (function(module) {

"use strict";
module.exports = require("@gumlet/gif-resize");;

/***/ }),

/***/ 6417:
/***/ (function(module) {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 5747:
/***/ (function(module) {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 9643:
/***/ (function(module) {

"use strict";
module.exports = require("get-media-dimensions");;

/***/ }),

/***/ 1241:
/***/ (function(module) {

"use strict";
module.exports = require("handbrake-js");;

/***/ }),

/***/ 2249:
/***/ (function(module) {

"use strict";
module.exports = require("jimp");;

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

/***/ 1318:
/***/ (function(module) {

"use strict";
module.exports = require("node-video-resize");;

/***/ }),

/***/ 8123:
/***/ (function(module) {

"use strict";
module.exports = require("nodemailer");;

/***/ }),

/***/ 6512:
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ }),

/***/ 2413:
/***/ (function(module) {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 1669:
/***/ (function(module) {

"use strict";
module.exports = require("util");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(317));
module.exports = __webpack_exports__;

})();