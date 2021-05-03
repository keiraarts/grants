(function() {
var exports = {};
exports.id = 486;
exports.ids = [486];
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

/***/ 8549:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; },
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2146);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5052);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(easy_peasy__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6990);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_autolinker__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9997);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_mobile_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1578);
/* harmony import */ var react_mobile_datepicker__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_mobile_datepicker__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _src_client_Components_Tools_Resizer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2632);
/* harmony import */ var _src_client_baseUrl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1876);
/* harmony import */ var _utils_doDashes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3395);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_12__);





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }












function getServerSideProps(_x) {
  return _getServerSideProps.apply(this, arguments);
}

function _getServerSideProps() {
  _getServerSideProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(context) {
    var res, program;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_11__/* .apiUrl */ .J)(), "/program/getProgram"), {
              method: "POST",
              body: JSON.stringify({
                url: context.query.program
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });

          case 2:
            res = _context2.sent;
            _context2.next = 5;
            return res.json();

          case 5:
            program = _context2.sent;
            return _context2.abrupt("return", {
              props: {
                program: program
              }
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getServerSideProps.apply(this, arguments);
}

function Application(props) {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useParams)(),
      program = _useParams.program;

  var auth = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_6__.useStoreState)(function (state) {
    return state.user.auth;
  });
  var small = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_6__.useStoreState)(function (state) {
    return state.app.small;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(props === null || props === void 0 ? void 0 : props.program),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      programInfo = _useState4[0],
      setProgram = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5, 2),
      editing = _useState6[0],
      setEditing = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState7, 2),
      confirmOpen = _useState8[0],
      setConfirmOpen = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState9, 2),
      showStartDate = _useState10[0],
      setShowStartDate = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState11, 2),
      showEndDate = _useState12[0],
      setShowEndDate = _useState12[1];

  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (auth && auth.token) {
      fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_11__/* .apiUrl */ .J)(), "/getAccount"), {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": auth.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        return setUser(json);
      });
    }
  }, [auth === null || auth === void 0 ? void 0 : auth.token]);

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState14 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState13, 2),
      programSubmitting = _useState14[0],
      setProgramSubmitting = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState16 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState15, 2),
      updateErr = _useState16[0],
      setUpdateErr = _useState16[1];

  var updateProgram = function updateProgram(e) {
    e.preventDefault();
    if (!programInfo.name || !programInfo.url || !programInfo.description || !programInfo.logistics || !programInfo.criteria) setUpdateErr("Please fill out all required fields");
    if (moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.open).add(1, "day").toDate() > new Date(programInfo.close)) setUpdateErr("Your closing date must be at least one day after opening date");else {
      setUpdateErr(false);
      setProgramSubmitting(true);
      fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_11__/* .apiUrl */ .J)(), "/program/updateProgram"), {
        method: "POST",
        body: JSON.stringify(_objectSpread(_objectSpread({}, programInfo), {}, {
          org: programInfo.organizers[0].id
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
          setProgramSubmitting(false);
        } else {
          setUpdateErr(json.error);
        }
      });
    }
  };

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({}),
      _useState18 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState17, 2),
      data = _useState18[0],
      setData = _useState18[1];

  var uploadHandler = function uploadHandler(target) {
    setErr(false);
    var file = target.files[0];
    var reader = new FileReader();
    var ext = target.value.substr(target.value.length - 3).toLowerCase();
    reader.readAsDataURL(file);
    var responsetype;
    reader.onload = /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (ext === "jpg" || ext === "jpeg") responsetype = "image/jpeg";
              if (ext === "png") responsetype = "image/png";
              if (ext === "gif") responsetype = "image/gif";
              if (ext === "ebp") responsetype = "image/webp";
              if (ext === "mp4") responsetype = "video/mp4";

              if (file.size < 120000000) {
                if (responsetype) {
                  setData(_objectSpread(_objectSpread({}, data), {}, {
                    art: reader.result,
                    ext: ext,
                    key: Math.random()
                  }));
                } else {
                  setErr("File type unsupported");
                }
              } else {
                setErr("File size too large");
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  };

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState20 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState19, 2),
      submitting = _useState20[0],
      setSubmitting = _useState20[1];

  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState22 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState21, 2),
      submitted = _useState22[0],
      setSubmitted = _useState22[1];

  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
      _useState24 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState23, 2),
      err = _useState24[0],
      setErr = _useState24[1];

  var preSubmit = function preSubmit() {
    if (!data.art) setErr("No artwork selected");else if (!data.statement) setErr("Please write a statement of intent");else if (!data.title || !data.description) setErr("Please provide an artwork title and description");else if (!user) setErr("Please log in to submit");else if (auth && !auth.wallet) setErr("Please verify a wallet to submit");else if (user && !user.user.emailVerified) setErr("Please verify your email to submit");else if (user && (!user.user.artistName || !user.user.city || !user.user.country || !user.user.twitter || !user.user.website)) setErr("Please complete your user profile to submit");else setConfirmOpen(true);
  };

  var submit = function submit(e) {
    setConfirmOpen(false);
    e.preventDefault();
    if (!data.art) setErr("No artwork selected");else if (!data.statement) setErr("Please write a statement of intent");else if (!data.title || !data.description) setErr("Please provide an artwork title and description");else if (!data.canvas) setErr("Please specify the tools used for your artwork");else if (!user) setErr("Please log in to submit");else if (auth && !auth.wallet) setErr("Please verify a wallet to submit");else if (user && !user.user.emailVerified) setErr("Please verify your email to submit");else if (user && (!user.user.artistName || !user.user.city || !user.user.country || !user.user.twitter || !user.user.website)) setErr("Please complete your user profile to submit");else {
      setErr(false);
      setSubmitting(true);
      fetch("".concat((0,_src_client_baseUrl__WEBPACK_IMPORTED_MODULE_11__/* .apiUrl */ .J)(), "/program/submitApplication"), {
        method: "POST",
        body: JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
          program: programInfo._id
        })),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": auth.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json && json.error) {
          setErr(json.error);
          setSubmitting(false);
        } else setSubmitted(true);
      });
    }
  };

  var dropdownDefault = data.minted === undefined ? "default" : "".concat(data.minted);
  var isAdmin = false;
  if (programInfo) isAdmin = auth && programInfo.organizers[0].admins.findIndex(function (admin) {
    return admin === auth.id;
  }) >= 0;
  var applied;
  if (user && user.applications && programInfo) applied = user.applications.find(function (e) {
    return e.program === programInfo.id;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "content-block"
  }, programInfo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "".concat(showStartDate ? "absolute-container" : "hidden absolute-container")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_mobile_datepicker__WEBPACK_IMPORTED_MODULE_9___default()), {
    dateConfig: dateConfig,
    isOpen: showStartDate,
    confirmText: "Confirm",
    cancelText: "Cancel",
    customHeader: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.open).format("ddd MMM Do h:mm A")),
    showCaption: true,
    value: new Date(programInfo.open || new Date()),
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        open: new Date(new Date(e).setMinutes(0))
      }));
    },
    onSelect: function onSelect() {
      return setShowStartDate(false);
    },
    onCancel: function onCancel() {
      return setShowStartDate(false);
    },
    isPopup: false
  })), programInfo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "".concat(showEndDate ? "absolute-container" : "hidden absolute-container")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_mobile_datepicker__WEBPACK_IMPORTED_MODULE_9___default()), {
    dateConfig: dateConfig,
    isOpen: showEndDate,
    confirmText: "Confirm",
    cancelText: "Cancel",
    customHeader: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.close).format("ddd MMM Do h:mm A")),
    showCaption: true,
    value: new Date(programInfo.close || new Date()),
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        close: new Date(new Date(e).setMinutes(0))
      }));
    },
    onSelect: function onSelect() {
      return setShowEndDate(false);
    },
    onCancel: function onCancel() {
      return setShowEndDate(false);
    },
    isPopup: false
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_src_client_Components_Tools_Resizer__WEBPACK_IMPORTED_MODULE_10__/* .default */ .Z, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_modal__WEBPACK_IMPORTED_MODULE_8___default()), {
    isOpen: confirmOpen,
    style: {
      content: {
        margin: "auto",
        width: "15rem",
        height: "23rem"
      }
    },
    onRequestClose: function onRequestClose() {
      return setConfirmOpen(false);
    },
    shouldCloseOnOverlayClick: true,
    ariaHideApp: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s font"
  }, "By submitting your artwork you agree to and honor the grant logistics and criteria and will not mint your piece elsewhere before the curation process is completed.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Cancel",
    className: "small-button",
    onClick: function onClick() {
      return setConfirmOpen(false);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Submit",
    className: "small-button margin-left-s",
    onClick: submit
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, programInfo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex text-l"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, programInfo.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex-full"
  }), isAdmin && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s center text-grey pointer",
    onClick: function onClick() {
      return setEditing(true);
    }
  }, "Edit Program")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "Curated by\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    className: "text-rainbow pointer",
    href: "/curator/".concat((0,_utils_doDashes__WEBPACK_IMPORTED_MODULE_13__/* .default */ .Z)(programInfo.organizers[0].name))
  }, programInfo.organizers[0].name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, !editing && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s line-breaks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_7___default()), {
    text: programInfo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-l text-s line-breaks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, "Grant Logistics"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s line-breaks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_7___default()), {
    text: programInfo.logistics
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, "Submission Criteria"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_7___default()), {
    text: programInfo.criteria
  })))), editing && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Program Name",
    name: "name",
    id: "name",
    required: true,
    maxLength: "100",
    value: programInfo.name,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
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
    value: programInfo.url,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        url: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "URL Permalink")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "Program Applicant URL:", " ", "https://grants.art/apply/".concat(programInfo.url ? programInfo.url : "", " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    value: programInfo.description,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
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
    maxLength: "300",
    value: programInfo.tagline,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        tagline: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Program Tagline (Home Page)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "2000",
    value: programInfo.logistics,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
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
    value: programInfo.criteria,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        criteria: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Applicant Criteria (2000 Chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Intent",
    name: "intent",
    id: "intent",
    required: true,
    maxLength: "50",
    value: programInfo.passcode,
    onChange: function onChange(e) {
      return setProgram(_objectSpread(_objectSpread({}, programInfo), {}, {
        passcode: e.target.value,
        isProtected: e.target.value ? true : false
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Secret phrase to submit (Optional)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, "Submissions Open Time"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), programInfo.open ? moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.open).format("ddd MMM Do h:mm A") : ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Set Open Date",
    className: "small-button",
    onClick: function onClick() {
      return setShowStartDate(true);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, "Submissions Close Time"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), programInfo.close ? moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.close).format("ddd MMM Do h:mm A") : ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Set Close Date",
    className: "small-button",
    onClick: function onClick() {
      return setShowEndDate(true);
    }
  })), updateErr && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
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
    value: "Update Program",
    className: "submit-button",
    onClick: function onClick(e) {
      return updateProgram(e);
    }
  }))))), !applied ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-l"
  }, "Art Submission Form"), program === "genesis" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s margin-top form__title"
  }, "Have you sold your own NFT before?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "select-dropdown margin-top-minus"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("select", {
    name: "Mint",
    className: "text-black",
    defaultValue: dropdownDefault,
    value: dropdownDefault,
    required: true,
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        minted: e.target.value
      }));
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("option", {
    value: "default",
    disabled: true,
    hidden: true
  }, "Select an option"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("option", {
    value: "false"
  }, "No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("option", {
    value: "true"
  }, "Yes")))), programInfo && programInfo.isProtected && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Name",
    name: "name",
    id: "name",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        passcode: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Secret Phrase")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
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
        statement: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Statement of Intent (2000 chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Additional",
    name: "additional",
    id: "additional",
    maxLength: "2000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        additional: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Additional Information (Optional 2000 chars)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Name",
    name: "name",
    id: "name",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        title: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Artwork Title")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("textarea", {
    type: "text",
    className: "form__field intent-field",
    placeholder: "Description",
    name: "description",
    id: "description",
    maxLength: "1000",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        description: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Artwork Description")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "text",
    className: "form__field",
    placeholder: "Name",
    name: "name",
    id: "name",
    maxLength: "100",
    onChange: function onChange(e) {
      return setData(_objectSpread(_objectSpread({}, data), {}, {
        canvas: e.target.value
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "form__label"
  }, "Tools Used (e.g. C4D, Octane)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "form__group field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("label", {
    className: "file__label"
  }, "Art Submission (JPG, PNG, GIF, WEBP, or MP4 - Max 77MB)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "file",
    className: "form__field",
    placeholder: "Artwork",
    name: "artwork",
    id: "name",
    accept: "image/jpeg, image/png, image/gif, image/webp, video/mp4",
    required: true,
    onChange: function onChange(e) {
      return uploadHandler(e.target);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-l"
  }, "Submission Preview"), user && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top gallery-container full-width"
  }, !small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, user.user.artistName || "Missing Artist Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), user.user.country || "Missing Country", " ", "(b. ".concat(user.user.birthYear || "Missing Birth Year", ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("i", null, data.title || "Missing Art Title")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs"
  }, data.canvas)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, data.description || "Missing Description")))), data.art && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex-full center ".concat(small ? "gallery-frame-container-small" : "gallery-frame-container")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "frame gallery-art-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "frame-shadow"
  }, data.ext === "mp4" || data.ext === "mov" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("video", {
    muted: true,
    loop: true,
    autoPlay: true,
    "webkit-playsinline": "true",
    playsInline: true,
    className: "gallery-art",
    key: data.key
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("source", {
    src: data.art
  }), "Sorry, your browser doesn't support embedded videos.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    className: "gallery-art",
    src: data.art
  })))), small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, user.user.artistName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), user.user.country, " ", user.user.birthYear && "(b. ".concat(user.user.birthYear, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("i", null, data.title || "Untitled")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs"
  }, data.canvas)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, data.description))))), err && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-err"
  }, err), submitting && !submitted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-grey"
  }, "Your artwork is being submitted.."), submitted && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-s text-rainbow"
  }, "Thank you for submitting your artwork!", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), "The curation team is excited to check out your submission :)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, !user && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    href: "/login",
    className: "margin-top text-mid text-grey"
  }, "You must be logged in to submit an artwork"), user && auth && (!auth.wallet || !user.user.emailVerified || !user.user.artistName || !user.user.city || !user.user.country || !user.user.twitter || !user.user.website) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    href: "/account",
    className: "margin-top text-mid text-grey"
  }, "You must complete your user profile and verify wallet & email to submit an artwork")), programInfo && !submitting && !submitted && user && new Date() > new Date(programInfo.open) && new Date() < new Date(programInfo.close) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("input", {
    type: "submit",
    value: "Submit Artwork",
    className: "submit-button",
    onClick: function onClick() {
      return preSubmit();
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-l"
  }, "Art Submission"), applied.published ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    href: "/".concat(programInfo.url, "/").concat(applied.order),
    className: "text-rainbow"
  }, "Minted In Exhibition")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-mid"
  }, "Status:", " ", applied.finalized ? "Deferred" : "Pending Curation Review"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top gallery-container full-width"
  }, !small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, user.user.artistName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), user.user.country, " ", user.user.birthYear && "(b. ".concat(user.user.birthYear, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("i", null, applied.title || "Untitled")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), applied.canvas ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs"
  }, applied.canvas) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, applied.art.split(".")[1].toUpperCase(), " as NFT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, applied.description)))), applied.art && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "flex-full center ".concat(small ? "gallery-frame-container-small" : "gallery-frame-container")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "frame gallery-art-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "frame-shadow"
  }, applied.art.split(".")[1] === "mp4" || applied.art.split(".")[1] === "mov" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("video", {
    muted: true,
    loop: true,
    autoPlay: true,
    "webkit-playsinline": "true",
    playsInline: true,
    className: "gallery-art"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("source", {
    src: "https://cdn.grants.art/".concat(applied.art)
  }), "Sorry, your browser doesn't support embedded videos.") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("img", {
    className: "gallery-art",
    src: "https://cdn.grants.art/".concat(applied.art)
  })))), small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, user.user.artistName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), user.user.country, " ", user.user.birthYear && "(b. ".concat(user.user.birthYear, ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("i", null, applied.title || "Untitled")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null), applied.canvas ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs"
  }, applied.canvas) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, applied.art.split(".")[1].toUpperCase(), " as NFT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, applied.description)))))), programInfo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
    className: "margin-top text-mid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("em", null, new Date() > new Date(programInfo.open) && new Date() < new Date(programInfo.close) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, "Submissions are open until", " ", moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.close).format("ddd MMM Do h:mm A")), new Date() < new Date(programInfo.open) && new Date() < new Date(programInfo.close) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, "Submissions will open", " ", moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.open).format("ddd MMM Do h:mm A"), " and close", " ", moment__WEBPACK_IMPORTED_MODULE_12___default()(programInfo.close).format("ddd MMM Do h:mm A")), new Date() > new Date(programInfo.close) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", null, "Submissions are closed"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("br", null)));
}
var monthMap = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "Jul",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};
var dateConfig = {
  month: {
    format: function format(value) {
      return monthMap[value.getMonth() + 1];
    },
    caption: "Month",
    step: 1
  },
  date: {
    format: "DD",
    caption: "Day",
    step: 1
  },
  hour: {
    format: "hh",
    caption: "Hour",
    step: 1
  }
};

/***/ }),

/***/ 2632:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Resizer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3038);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5052);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(easy_peasy__WEBPACK_IMPORTED_MODULE_2__);



function Resizer() {
  var setSmall = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_2__.useStoreActions)(function (dispatch) {
    return dispatch.app.setSmall;
  });
  var setCols = (0,easy_peasy__WEBPACK_IMPORTED_MODULE_2__.useStoreActions)(function (dispatch) {
    return dispatch.app.setCols;
  });

  var resize = function resize() {
    setResizer(true);
  };

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      listener = _useState2[0],
      setListener = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!listener) {
      window.addEventListener('resize', resize);
      setListener(true);
    }
  }, [listener]);

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      resizing = _useState4[0],
      setResizer = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (resizing) {
      if (window.innerWidth <= 1440) setSmall(true);else setSmall(false);
      if (window.innerWidth <= 700) setCols('1');else if (window.innerWidth > 700 && window.innerWidth <= 1200) setCols('2');else setCols('3');
      setResizer(false);
    }
  }, [resizing]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (window.innerWidth <= 1440) setSmall(true);else setSmall(false);
    if (window.innerWidth <= 700) setCols('1');else if (window.innerWidth > 700 && window.innerWidth <= 1200) setCols('2');else setCols('3');
  }, []);
  return null;
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

/***/ 2470:
/***/ (function(module) {

"use strict";
module.exports = require("moment");;

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

/***/ 1578:
/***/ (function(module) {

"use strict";
module.exports = require("react-mobile-datepicker");;

/***/ }),

/***/ 9997:
/***/ (function(module) {

"use strict";
module.exports = require("react-modal");;

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(8549));
module.exports = __webpack_exports__;

})();