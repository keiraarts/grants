(function() {
var exports = {};
exports.id = 495;
exports.ids = [495];
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

/***/ 8119:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ RegisterComponent; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(9713);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(3038);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./src/client/baseUrl.js
var baseUrl = __webpack_require__(1876);
// EXTERNAL MODULE: external "react-router-dom"
var external_react_router_dom_ = __webpack_require__(2146);
// EXTERNAL MODULE: external "easy-peasy"
var external_easy_peasy_ = __webpack_require__(5052);
;// CONCATENATED MODULE: ./utils/validateUsername.js
function validateUsername(string) {
  var regex = /^(?![_.])(?!.*[_.]{2})(?!.*[ _.]{2})(?! *[_]{2})[ _.0-9\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/;
  return string.match(regex);
}
;// CONCATENATED MODULE: ./pages/register.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






function RegisterComponent() {
  var setAuth = (0,external_easy_peasy_.useStoreActions)(function (dispatch) {
    return dispatch.user.setAuth;
  });
  var auth = (0,external_easy_peasy_.useStoreState)(function (state) {
    return state.user.auth;
  });
  var history = (0,external_react_router_dom_.useHistory)();
  if (auth && auth.username) history.push("/");

  var _useState = (0,external_react_.useState)({
    username: "",
    password: "",
    first: "",
    last: "",
    email: "",
    submitting: false,
    typing: false,
    registerUsername: null,
    registerEmail: null,
    registerPassword: null,
    verifiedUsername: false,
    verifiedEmail: false,
    verifiedPasswords: false,
    validEmail: false,
    lengthAlert: false,
    error: "",
    register: false,
    canRegister: false
  }),
      _useState2 = slicedToArray_default()(_useState, 2),
      registerData = _useState2[0],
      setRegisterData = _useState2[1];

  var _useState3 = (0,external_react_.useState)(false),
      _useState4 = slicedToArray_default()(_useState3, 2),
      submitting = _useState4[0],
      setSubmitting = _useState4[1];

  var _useState5 = (0,external_react_.useState)(false),
      _useState6 = slicedToArray_default()(_useState5, 2),
      submitted = _useState6[0],
      setSubmitted = _useState6[1];

  var _useState7 = (0,external_react_.useState)(false),
      _useState8 = slicedToArray_default()(_useState7, 2),
      err = _useState8[0],
      setErr = _useState8[1];

  var _useState9 = (0,external_react_.useState)(false),
      _useState10 = slicedToArray_default()(_useState9, 2),
      logged = _useState10[0],
      setLogged = _useState10[1];

  var submit = function submit(e) {
    e.preventDefault();
    setErr(false);

    if (registerData.first === "" || registerData.last === "" || registerData.email === "") {
      setErr("Some fields are missing!");
    } else if (registerData.password !== registerData.confirmPassword) {
      setErr("Your passwords do not match!");
    } else {
      setSubmitting(true);
      fetch("".concat((0,baseUrl/* apiUrl */.J)(), "/registerUser"), {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data && data.username) {
          setAuth(data);
          setLogged(true);
        } else if (data.error) {
          setSubmitting(false);
          setErr(data.error);
        }
      });
    }
  };

  return /*#__PURE__*/external_react_default().createElement("div", {
    className: "content-block"
  }, logged && /*#__PURE__*/external_react_default().createElement(external_react_router_dom_.Redirect, {
    to: "/"
  }), /*#__PURE__*/external_react_default().createElement("div", {
    className: "text-l text-b"
  }, "User Registration"), /*#__PURE__*/external_react_default().createElement("div", {
    className: "margin-top"
  }, /*#__PURE__*/external_react_default().createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "First Name",
    name: "first",
    id: "first",
    required: true,
    maxLength: "100",
    value: registerData.first,
    onChange: function onChange(e) {
      return setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        first: e.target.value
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "First Name")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Last Name",
    name: "last",
    id: "last",
    required: true,
    maxLength: "100",
    value: registerData.last,
    onChange: function onChange(e) {
      return setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        last: e.target.value
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "Last Name")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Username",
    name: "username",
    id: "username",
    required: true,
    maxLength: "15",
    value: registerData.username,
    onChange: function onChange(e) {
      validateUsername(e.target.value.replace(/\s+/g, "")) && setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        username: e.target.value.replace(/\s+/g, "")
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "Username")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "email",
    className: "form__field",
    placeholder: "Email",
    name: "email",
    id: "email",
    required: true,
    maxLength: "100",
    value: registerData.email,
    onChange: function onChange(e) {
      return setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        email: e.target.value
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "Email")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "password",
    className: "form__field",
    placeholder: "Password",
    name: "password",
    id: "password",
    maxLength: "100",
    required: true,
    value: registerData.password,
    onChange: function onChange(e) {
      return setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        password: e.target.value
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "Password")), /*#__PURE__*/external_react_default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/external_react_default().createElement("input", {
    type: "password",
    className: "form__field",
    placeholder: "Confirm Password",
    name: "password",
    id: "password",
    required: true,
    maxLength: "100",
    value: registerData.confirmPassword,
    onChange: function onChange(e) {
      return setRegisterData(_objectSpread(_objectSpread({}, registerData), {}, {
        confirmPassword: e.target.value
      }));
    }
  }), /*#__PURE__*/external_react_default().createElement("label", {
    className: "form__label"
  }, "Confirm Password")), err && /*#__PURE__*/external_react_default().createElement("div", {
    className: "margin-top-s text-s text-err"
  }, err), submitting && !submitted ? /*#__PURE__*/external_react_default().createElement("div", {
    className: "margin-top-s text-s text-grey"
  }, "Your registration is being submitted..") : /*#__PURE__*/external_react_default().createElement("input", {
    type: "submit",
    value: "Register Account",
    className: "submit-button"
  }), submitted && /*#__PURE__*/external_react_default().createElement("div", {
    className: "margin-top-s text-s text-rainbow"
  }, "Thank you for registering! You will now be redirected to the home page.", /*#__PURE__*/external_react_default().createElement("br", null))), /*#__PURE__*/external_react_default().createElement("br", null)));
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(8119));
module.exports = __webpack_exports__;

})();