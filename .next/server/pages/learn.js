(function() {
var exports = {};
exports.id = 3128;
exports.ids = [3128];
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

/***/ 4340:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Learn; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3038);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Learn() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "content-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-l text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "Learn")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "There's a new future for art?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "page-container margin-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-l text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "NFT FAQ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "What is an NFT?",
    text: "An NFT, or a Non-Fungible Token, represents a single asset with ownership. This asset can represent many things ranging from concert tickets to video game items, but we believe art is the most important piece of the puzzle."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Who owns it?",
    text: "There is a single owner (usually) and it cannot be controlled by anyone else. It can be transferred or exchanged for currency, and its history of owners, known as provenance, is all recorded forever."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "What exactly does provenance mean?",
    text: "An NFT's ownership history and its unique properties are reliably tracked on a blockchain, namely Ethereum.\n              This data is public which means that anyone can provably verify its origination, prior, and current owners."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "What makes an NFT so profound?",
    text: "Due to the nature of the blockchain, it can be globally exchanged with another without any middlemen or friction\n              with its provenance available as absolute source of truth. There is now a global market for virtually any digital asset in which you can prove\n              ownership over."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Can't someone just copy and paste artwork?",
    text: "Yes, and in this context that's a good thing as it means that artwork is being shared with more visibility. But that person does not own the asset!\n              Downloading and owning a file is vastly different than owning an NFT, for reasons mentioned above."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-l text-l text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "About Sevens Foundation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "What makes Sevens unique to NFTs?",
    text: "We provide a curation framework for curators to view art submissions with little emphasis on prior success through tools such as optional blind voting and single art submissions. Although the story of an artist is also important, we believe art should speak for itself and we are rooted in elevating emerging and undiscovered talent. We also built Sevens to present digital art in a way that closely mirrors the experience we are familiar with when viewing physical art. We strive to bridge the gap between the traditional and digital art realms."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Can I mint freely here?",
    text: "Sevens is not an open minting platform. We believe in curation through a unified theme & experience similar to how traditional art galleries present\n              artworks. We operate on a single art submission-per-exhibition basis and leave it up to the curators to decide what is minted. Each exhibition seeks different criteria and if you meet them you are\n              free to submit your artwork to be potentially curated into the exhibition."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "How may I collect artwork on Sevens?",
    text: "You may do so completely within our website. We use OpenSea's API so the bidding, listing, and auction mechanics\n              are the same as OpenSea's - but everything works in-house. We do not present historical sales data on Sevens because we believe that immediately presenting a valuation creates bias\n              towards the art piece, but you may certainly find that info on OpenSea. We also operate as decentralized as possible, so you must use an Ethereum wallet to create transactions."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Do artists receive royalties?",
    text: "We have 10% secondary sale royalties built within our contracts, but it currently will only be paid out if an artwork is resold on Rarible.\n              As we are reliant on using OpenSea auction and listing mechanics, royalties unfortunately will not be paid out until they implement our contract's royalty standard\n              and they have expressed their intent to do so in the future."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Do you take profits?",
    text: "We take 0% on all sales. We are fortunate and grateful to be able to operate pro-bono and have gracious donors to help fund our programs.\n              But, there is an automated 2.5% fee that OpenSea takes for using their integrations on any exchanges that happens in-house."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top-l text-l text-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "Technical FAQ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "How decentralized is Sevens?",
    text: "Decentralization is a core ethos of ours because it is the paradigm that makes NFTs powerful. Curators create NFT collections (ERC721)\n              with their own wallet and provide Sevens permission to mint on their behalf - they can revoke this permission after the exhibition is minted\n              or at any time. We do not have custody and all NFTs are minted directly from the artist's verified wallet. That being said, centralization is important to the extent\n              that it makes sense, and our curation tooling and website are parts of the platform that we control and update. It is currently too difficult to operate this all on decentralized \n              services but we will migrate when it is possible."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Where are the NFT's art assets stored?",
    text: "We believe in asset permanence, and that all artworks should live forever. We are not confident IPFS provides this promise and\n              have chosen to store all assets on Arweave which is an incentivized file storage blockchain which brings more confidence and guarantees that the artworks will exist permanently. Shout out to j1mmy.eth\n              for pioneering the advocacy."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Which blockchain does Sevens use?",
    text: "Our NFTs are on the Ethereum blockchain. We owe Ethereum immense thanks for making this all possible. We chose Ethereum because\n              the amount of tooling and infrastructure is extremely robust and standardized in a way no other blockchain is."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "Network usage fees are too high are they not?",
    text: "This is absolutely correct - current gas costs are unacceptable. It is the reason Sevens Foundation was created, to allow a launchpad\n              for people who hesitate or cannot afford to make such a large investment in themselves when they surely should, even with this given landscape. But scaling solutions on Ethereum are coming, and they are\n              coming fast. This is a temporary problem that will be resolved in which we will migrate and upgrade when the time is right."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Block, {
    title: "The environmental impacts are not acceptable?",
    text: "No they are not, and we are committed to reducing carbon footprint as an organization. However, \n              traditional infrastructure and servers - for example the existing banking systems - are just as wasteful and more. This is definitely not to be an excuse for carbon emissions, \n              but fortunately Ethereum will eventually migrate to a different security mechanism that will reduce emissions by 99%. We believe the negative stigma towards NFTs is blown out of proportion \n              in a way that does not capture the larger picture of how our world is currently operating."
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-l text-b margin-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("strong", null, "Resources")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s margin-top-s"
  }, "Learn more about NFTs"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "page-container text-m"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "https://www.youtube.com/watch?v=a8ww4aNlPQU",
    className: "text-grey pointer margin-top"
  }, "Mankind's \"What is an NFT?\""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "https://www.loop-news.com/p/beginners-guide-crypto-art-and-nfts",
    className: "text-grey pointer margin-top"
  }, "Loopify's Beginners Guide"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "https://coopahtroopa.mirror.xyz/PF42Z9oE_r6yhZN9jZrrseXfHaZALj9JIfMplshlgQ0",
    className: "text-grey pointer margin-top"
  }, "Coopahtroopa's NFT Landscape"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    className: "text-grey pointer margin-top",
    href: "https://parishilton.com/why-im-excited-about-nfts/"
  }, "Paris Hilton's \"I'm Excited About NFTs\u2014You Should Be Too\""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "/tutorial",
    className: "text-grey remove-a margin-top"
  }, "Setting up a wallet"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "/opensea",
    className: "text-grey remove-a margin-top"
  }, "Minting on OpenSea"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "/rarible",
    className: "text-grey remove-a margin-top"
  }, "Minting on Rarible"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    href: "https://discord.gg/a9dDyUCZWY",
    className: "text-grey pointer margin-top"
  }, "Maalavidaa's Artist Mental Health Community"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    target: "_blank",
    className: "text-grey pointer margin-top",
    href: "https://goldstandard.org"
  }, "Reducing Carbon Footprint"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null)));
}

var Block = function Block(_ref) {
  var title = _ref.title,
      text = _ref.text;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "margin-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex pointer faq-title-container",
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-m flex-full faq-title"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    src: open ? "/assets/up.png" : "/assets/down.png",
    className: "faq-toggle"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "line-spacer"
  }), open && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-s margin-top-s"
  }, text));
};

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(4340));
module.exports = __webpack_exports__;

})();