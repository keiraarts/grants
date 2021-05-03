(function() {
var exports = {};
exports.id = 1262;
exports.ids = [1262];
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

/***/ 2602:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; },
/* harmony export */   "default": function() { return /* binding */ VerifyEmail; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8926);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7757);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_client_baseUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1876);




function getServerSideProps(_x) {
  return _getServerSideProps.apply(this, arguments);
}

function _getServerSideProps() {
  _getServerSideProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(context) {
    var id, res, verification;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = context.query.id;
            _context.next = 3;
            return fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_3__/* .apiUrl */ .J)(), "/verifyEmail"), {
              method: "POST",
              body: JSON.stringify({
                token: id
              }),
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              }
            });

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.json();

          case 6:
            verification = _context.sent;
            return _context.abrupt("return", {
              props: {
                verification: verification
              }
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getServerSideProps.apply(this, arguments);
}

function VerifyEmail(props) {
  var verified = false;
  if ((props === null || props === void 0 ? void 0 : props.verification) === true) verified = true;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "content-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "text-l text-b"
  }, "Email Verification"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "page-container margin-top ethos-text"
  }, !verified ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null, "Verifying Email...") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null, "Email successfully verified!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("br", null)));
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

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

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
var __webpack_exports__ = (__webpack_exec__(2602));
module.exports = __webpack_exports__;

})();