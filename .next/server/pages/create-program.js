(function() {
var exports = {};
exports.id = 4075;
exports.ids = [4075];
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

/***/ 4239:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": function() { return /* binding */ getStaticProps; },
/* harmony export */   "default": function() { return /* binding */ Application; }
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
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5052);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(easy_peasy__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2146);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_client_baseUrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1876);





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





function getStaticProps() {
  return _getStaticProps.apply(this, arguments);
}

function _getStaticProps() {
  _getStaticProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
    var _auth;

    var res, orgs;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_7__/* .apiUrl */ .J)(), "/program/getMyOrgs"), {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": (_auth = auth) === null || _auth === void 0 ? void 0 : _auth.token
              }
            });

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            orgs = _context.sent;
            return _context.abrupt("return", {
              props: {
                orgs: orgs
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getStaticProps.apply(this, arguments);
}

function Application(props) {
  var auth = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_5__.useStoreState)(function (state) {
    return state.user.auth;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(props === null || props === void 0 ? void 0 : props.org),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 1),
      org = _useState2[0];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({}),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5, 2),
      submitting = _useState6[0],
      setSubmitting = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7, 2),
      submitted = _useState8[0],
      setSubmitted = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState9, 2),
      err = _useState10[0],
      setErr = _useState10[1];

  var submit = function submit(e) {
    e.preventDefault();
    if (org && (!data.name || !data.url || !data.description || !data.logistics || !data.criteria)) setErr("Please complete all required fields");else if (!org && (!data.orgName || !data.about || !data.name || !data.url || !data.description || !data.logistics || !data.criteria)) setErr("Please complete all required fields");else if (!auth || !(auth !== null && auth !== void 0 && auth.bodyusername)) setErr("You must be logged in to submit");else {
      setErr(false);
      setSubmitting(true);
      fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_7__/* .apiUrl */ .J)(), "/program/createProgram"), {
        method: "POST",
        body: JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
          existing: org ? org.id : undefined
        })),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": auth === null || auth === void 0 ? void 0 : auth.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        return setSubmitted(true);
      });
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "content-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-l text-b"
  }, "Create a Grant Program"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "ethos-text"
  }, "Sevens Foundation is purely focused on artistic and social integrity. Participating exhibitions must have either a community upbringing, charitable, or humanitarian cause. Providing grants, at the minimum, must cover all costs for minting recipients' NFTs."), (!auth || !(auth !== null && auth !== void 0 && auth.username)) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/login",
    className: "margin-top text-mid text-grey"
  }, "You must have an account to submit a program"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("em", null, "Starred fields are optional*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, "Program Curator or Organization"), org ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    className: "text-rainbow",
    to: "/curator/".concat(org.url)
  }, org.name)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Organizer Name",
    name: "organizer",
    id: "organizer",
    required: true,
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        orgName: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        about: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "About (2000 Chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "email",
    className: "form__field",
    placeholder: "Email",
    name: "email",
    id: "email",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        email: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Public / Contact Email*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "url",
    className: "form__field",
    placeholder: "URL",
    name: "url",
    id: "url",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
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
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        twitter: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Twitter*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, "@", data.twitter), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Instagram",
    name: "instagram",
    id: "instagram",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        instagram: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Instagram*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, "@", data.instagram)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, "Program Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Program Name",
    name: "name",
    id: "name",
    required: true,
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        name: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Program Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Program Name",
    name: "name",
    id: "name",
    required: true,
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        url: doDashes(e.target.value)
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "URL Permalink")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "Exhibition URL: ", "https://grants.art/".concat(data.url ? data.url : "", " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        description: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Program Description (2000 Chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        logistics: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Grant Logistics (2000 Chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        criteria: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Applicant Criteria (2000 Chars)")), err && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-err"
  }, err), submitting && !submitted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-grey"
  }, "Your program request is being submitted.."), submitted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-rainbow"
  }, "Thank you for submitting your program! Please let us know when you would like your exhibition to be listed publicly."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    href: "/apply/".concat(data.url),
    className: "margin-top-s text-grey"
  }, "You can navigate to your page to edit your details!")), !submitting && !submitted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Submit Program Request",
    className: "submit-button"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null)));
}

function doDashes(str) {
  var re = /[^a-z0-9]+/gi; // global and case insensitive matching of non-char/non-numeric

  var re2 = /^-*|-*$/g; // get rid of any leading/trailing dashes

  str = str.replace(re, "-"); // perform the 1st regexp

  return str.replace(re2, "").toLowerCase(); // ..aaand the second + return lowercased result
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

/***/ 2146:
/***/ (function(module) {

"use strict";
module.exports = require("react-router-dom");;

/***/ }),

/***/ 6512:
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(4239));
module.exports = __webpack_exports__;

})();