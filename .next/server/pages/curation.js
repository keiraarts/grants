(function() {
var exports = {};
exports.id = 9125;
exports.ids = [9125];
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

/***/ 1260:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Curation; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3038);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6990);
/* harmony import */ var react_autolinker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_autolinker__WEBPACK_IMPORTED_MODULE_2__);



function Curation(_ref) {
  var nft = _ref.nft,
      small = _ref.small,
      blind = _ref.blind;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  var video = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      isFullScreen = _useState4[0],
      setFullScreen = _useState4[1];

  function fullScreen() {
    if (video.current) {
      video.current.muted = false;

      if (video.current.requestFullScreen) {
        video.current.requestFullScreen();
      } else if (video.current.webkitRequestFullScreen) {
        video.current.webkitRequestFullScreen();
      } else if (video.current.mozRequestFullScreen) {
        video.current.mozRequestFullScreen();
      } else if (video.current.msRequestFullscreen) {
        video.current.msRequestFullscreen();
      } else if (video.current.webkitEnterFullscreen) {
        video.current.webkitEnterFullscreen(); //for iphone this code worked
      }

      setMuted(false);
    } else {
      if (document.documentElement.requestFullScreen) {
        if (isFullScreen) document.exitFullscreen();else document.documentElement.requestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        if (isFullScreen) document.webkitExitFullscreen();else document.documentElement.webkitRequestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        if (isFullScreen) document.mozExitFullscreen();else document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        if (isFullScreen) document.msExitFullscreen();else document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.webkitEnterFullscreen) {
        if (isFullScreen) document.webkitExitFullscreen();else document.documentElement.webkitEnterFullscreen();
      }

      setFullScreen(!isFullScreen);
    }
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    document.addEventListener("webkitfullscreenchange", function (event) {
      if (!document.webkitIsFullScreen) {
        setFullScreen(false);
        if (video.current) video.current.play();
      } else setFullScreen(true);
    });
    return function () {
      document.removeEventListener("fullscreenchange", function () {});
    };
  }, []);

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      muted = _useState6[0],
      setMuted = _useState6[1];

  function toggleAudio() {
    video.current.muted = !video.current.muted;
    if (video.current.muted) setMuted(true);else setMuted(false);
  }

  var imageType = nft.art.split(".")[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top flex full-width ".concat(!small && "side-space")
  }, nft ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "gallery-container full-width"
  }, !isFullScreen && !small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, !blind ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, nft.user.artistName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), nft.user.country, " ", nft.user.birthYear && "(b. ".concat(nft.user.birthYear, ")")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "Artist Info Hidden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("i", null, nft.title || "Untitled")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), nft.canvas ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-xs"
  }, nft.canvas) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, imageType.toUpperCase(), " as NFT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, nft.description))), !blind && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex margin-top-s"
  }, nft.user.website && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: nft.user.website
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/website.png",
    className: "account-social-web pointer",
    alt: "Website"
  }))), nft.user.twitter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://twitter.com/".concat(nft.user.twitter)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/twitter.png",
    className: "account-social pointer",
    alt: "Twitter"
  }))), nft.user.instagram && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "https://instagram.com/".concat(nft.user.instagram)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/instagram.png",
    className: "account-social pointer",
    alt: "Instagram"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-s text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-m"
  }, "Statement of Intent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_2___default()), {
    text: nft.statement
  })), nft.additional && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-s text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-m"
  }, "Additional Info"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react_autolinker__WEBPACK_IMPORTED_MODULE_2___default()), {
    text: nft.additional
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex-full center ".concat(small ? "gallery-frame-container-small" : "gallery-frame-container")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "frame gallery-art-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "frame-shadow"
  }, imageType === "mp4" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("video", {
    muted: true,
    loop: true,
    autoPlay: true,
    "webkit-playsinline": "true",
    playsInline: true,
    className: "gallery-art ".concat(!loaded && "hidden"),
    onCanPlay: function onCanPlay() {
      return setLoaded(true);
    },
    ref: video
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("source", {
    src: "https://cdn.grants.art/".concat(nft.art)
  }), "Sorry, your browser doesn't support embedded videos."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("video", {
    muted: true,
    loop: true,
    autoPlay: true,
    "webkit-playsinline": "true",
    playsInline: true,
    className: "gallery-art ".concat(loaded && "hidden")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("source", {
    src: "https://cdn.grants.art/".concat(nft.artWeb)
  }), "Sorry, your browser doesn't support embedded videos.")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    className: "gallery-art ".concat(!loaded && "hidden"),
    src: "https://cdn.grants.art/".concat(nft.art),
    onLoad: function onLoad() {
      return setLoaded(true);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    className: "gallery-art ".concat(loaded && "hidden "),
    src: "https://cdn.grants.art/".concat(nft.artWeb)
  })))), isFullScreen && !video.current && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "fullscreen-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/minscreen.png",
    className: "frame-exit pointer",
    onClick: function onClick() {
      return fullScreen();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    className: "gallery-art-fullscreen",
    src: "https://cdn.grants.art/".concat(nft.artWeb)
  })), !loaded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "loader margin-top-l"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "loaderBar"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex margin-top-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex-full"
  }), video && video.current && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    onClick: function onClick() {
      return toggleAudio();
    },
    className: "pointer"
  }, muted ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/muted.png",
    className: "frame-control"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/unmuted.png",
    className: "frame-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    onClick: function onClick() {
      return fullScreen();
    },
    className: "pointer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: "/assets/fullscreen.png",
    className: "margin-left-s frame-control"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-s"
  })), !isFullScreen && small && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "gallery-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "gallery-plate metal linear"
  }, !blind ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, nft.user.artistName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), nft.user.country, " ", nft.user.birthYear && "(b. ".concat(nft.user.birthYear, ")")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "Artist Info Hidden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-s text-s text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("i", null, nft.title || "Untitled")), ", 2021", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), nft.canvas ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-xs"
  }, nft.canvas) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, imageType.toUpperCase(), " as NFT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-xs margin-top-s"
  }, nft.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex margin-top-s"
  }, nft.website && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: nft.website
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: Web,
    className: "account-social-web pointer",
    alt: "Website"
  }))), nft.twitter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: nft.twitter.substring(0, 4) === "http" || nft.twitter.substring(0, 3) === "www" ? nft.twitter : "https://twitter.com/".concat(nft.twitter)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: Twitter,
    className: "account-social pointer",
    alt: "Twitter"
  }))), nft.instagram && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: openLink(nft.instagram.substring(0, 4) === "http" || nft.instagram.substring(0, 3) === "www" ? nft.instagram : "https://instagram.com/".concat(nft.instagram))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: Instagram,
    className: "account-social pointer",
    alt: "Instagram"
  })))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top"
  }, "This NFT does not seem to exist...", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top"
  })));
}

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(1260));
module.exports = __webpack_exports__;

})();