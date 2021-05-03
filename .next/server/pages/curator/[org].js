(function() {
var exports = {};
exports.id = 2679;
exports.ids = [2679];
exports.modules = {

/***/ 7228:
/***/ (function(module) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2858:
/***/ (function(module) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

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

/***/ 9713:
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3884:
/***/ (function(module) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 521:
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3038:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(2858);

var iterableToArrayLimit = __webpack_require__(3884);

var unsupportedIterableToArray = __webpack_require__(379);

var nonIterableRest = __webpack_require__(521);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(7228);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(6512);


/***/ }),

/***/ 1750:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; },
/* harmony export */   "default": function() { return /* binding */ Organizer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9713);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3038);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8926);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7757);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_client_baseUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1876);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6990);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_autolinker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_doDashes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3395);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5052);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(easy_peasy__WEBPACK_IMPORTED_MODULE_7__);





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






function getServerSideProps(_x) {
  return _getServerSideProps.apply(this, arguments);
}

function _getServerSideProps() {
  _getServerSideProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(context) {
    var res, data;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_5__/* .apiUrl */ .J)(), "/program/getOrg"), {
              method: "POST",
              body: JSON.stringify({
                url: context.query.org
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            data = _context.sent;
            return _context.abrupt("return", {
              props: {
                org: data
              } // will be passed to the page component as props

            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getServerSideProps.apply(this, arguments);
}

function Organizer(props) {
  var auth = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_7__.useStoreState)(function (state) {
    return state.user.auth;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(props.org),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      organizer = _useState2[0],
      setOrganizer = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      editing = _useState4[0],
      setEditing = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5, 2),
      programSubmitting = _useState6[0],
      setOrganizerSubmitting = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7, 2),
      updateErr = _useState8[0],
      setUpdateErr = _useState8[1];

  var updateOrg = function updateOrg(e) {
    e.preventDefault();
    if (!organizer.name || !organizer.about) setUpdateErr("Please fill out all required fields");else {
      setUpdateErr(false);
      setOrganizerSubmitting(true);
      fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_5__/* .apiUrl */ .J)(), "/program/updateOrg"), {
        method: "POST",
        body: JSON.stringify(_objectSpread(_objectSpread({}, organizer), {}, {
          logo: organizer.ext ? organizer.logo : undefined
        })),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": auth.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.success) {
          setEditing(false);
          setOrganizerSubmitting(false);
          history.push("/curator/".concat((0,_utils_doDashes__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z)(organizer.name)));
        } else {
          setUpdateErr(json.error);
        }
      });
    }
  };

  var uploadHandler = function uploadHandler(target) {
    setUpdateErr(false);
    var file = target.files[0];
    var reader = new FileReader();
    var ext = target.value.substr(target.value.length - 3).toLowerCase();
    reader.readAsDataURL(file);
    var responsetype;

    reader.onload = function () {
      if (ext === "jpg" || ext === "jpeg") responsetype = "image/jpeg";
      if (ext === "png") responsetype = "image/png";
      if (ext === "gif") responsetype = "image/gif";

      if (file.size < 7000000) {
        if (responsetype) {
          setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
            logo: reader.result,
            ext: ext
          }));
        } else {
          setUpdateErr("File type unsupported");
        }
      } else {
        setUpdateErr("File size too large");
      }
    };
  };

  var isAdmin = false;
  if (organizer) isAdmin = auth && organizer.admins.findIndex(function (admin) {
    return admin === auth.id;
  }) >= 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "content-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, organizer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, isAdmin && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex-full"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s center text-grey pointer",
    onClick: function onClick() {
      return setEditing(true);
    }
  }, "Edit Page")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex text-l center"
  }, organizer.logo && !organizer.ext && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "page-logo-c"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    className: "page-logo",
    src: "https://cdn.grants.art/".concat(organizer.logo)
  })), organizer.logo && organizer.ext && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "page-logo-c"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    className: "page-logo",
    src: organizer.logo
  })), !organizer.logo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, organizer.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, !editing && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "line-breaks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex center"
  }, organizer.website && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", {
    href: organizer.website
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    src: "/assets/website.png",
    className: "social-icon-web pointer",
    alt: "Website"
  })), organizer.twitter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", {
    href: "https://twitter.com/".concat(organizer.twitter)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    src: "assets/twitter.png",
    className: "social-icon",
    alt: "Twitter"
  })), organizer.instagram && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", {
    href: "https://instagram.com/".concat(organizer.instagram)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    src: "assets/instagram.png",
    className: "social-icon",
    alt: "Instagram"
  })), organizer.email && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("a", {
    href: "mailto:".concat(organizer.email)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    src: "assets/email.png",
    className: "social-icon",
    alt: "Email"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, "About ", organizer.logo ? organizer.name : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s line-breaks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_6___default()), {
    text: organizer.about
  }))), editing && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("form", {
    onSubmit: updateOrg
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Organizer Name",
    name: "organizer",
    id: "organizer",
    required: true,
    maxLength: "100",
    value: organizer.name,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        name: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Program Curator / Organization Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "Curator URL:", " ", "https://grants.art/".concat(organizer.name ? (0,_utils_doDashes__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z)(organizer.name) : "", " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "4000",
    value: organizer.about,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        about: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "email",
    className: "form__field",
    placeholder: "Email",
    name: "email",
    id: "email",
    maxLength: "100",
    value: organizer.email,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        email: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Public / Contact Email*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "file__label"
  }, "Logo (JPG, PNG, GIF - Max 5MB)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "file",
    className: "form__field",
    placeholder: "Artwork",
    name: "artwork",
    id: "name",
    accept: "image/jpeg, image/png, image/gif",
    onChange: function onChange(e) {
      return uploadHandler(e.target);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "url",
    className: "form__field",
    placeholder: "URL",
    name: "url",
    id: "url",
    maxLength: "100",
    value: organizer.website,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        website: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Website*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Twitter",
    name: "twitter",
    id: "twitter",
    maxLength: "100",
    value: organizer.twitter,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        twitter: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Twitter*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, "@", organizer.twitter), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Instagram",
    name: "instagram",
    id: "instagram",
    maxLength: "100",
    value: organizer.instagram,
    onChange: function onChange(e) {
      return setOrganizer(_objectSpread(_objectSpread({}, organizer), {}, {
        instagram: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Instagram*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, "@", organizer.instagram), updateErr && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-err"
  }, updateErr), programSubmitting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-grey"
  }, "Your program is being updated.."), !programSubmitting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Cancel",
    className: "submit-button",
    onClick: function onClick() {
      return setEditing(false);
    }
  }), "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Update Profile",
    className: "submit-button"
  })))))));
}

/***/ }),

/***/ 1876:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": function() { return /* binding */ apiUrl; }
/* harmony export */ });
var environment = "prod";
if (process && process.env && false) environment = "dev";
function apiUrl() {
  if (environment === "dev") return "http://localhost:3000/api";else if (environment === "prod") return "https://269b2a7bc089.ngrok.io/api";
}

/***/ }),

/***/ 3395:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ doDashes; }
/* harmony export */ });
function doDashes(str) {
  var re = /[^a-z0-9]+/gi; // global and case insensitive matching of non-char/non-numeric

  var re2 = /^-*|-*$/g; // get rid of any leading/trailing dashes

  str = str.replace(re, "-"); // perform the 1st regexp

  return str.replace(re2, "").toLowerCase(); // ..aaand the second + return lowercased result
}

/***/ }),

/***/ 5052:
/***/ (function(module) {

"use strict";
module.exports = require("easy-peasy");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 6990:
/***/ (function(module) {

"use strict";
module.exports = require("react-autolinker");;

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
var __webpack_exports__ = (__webpack_exec__(1750));
module.exports = __webpack_exports__;

})();