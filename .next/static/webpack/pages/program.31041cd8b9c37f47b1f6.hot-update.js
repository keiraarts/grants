/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/program",{

/***/ "./pages/program.js":
/*!**************************!*\
  !*** ./pages/program.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; },\n/* harmony export */   \"default\": function() { return /* binding */ Program; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _s = $RefreshSig$();\n\n\nvar __N_SSG = true;\nfunction Program(props) {\n  _s();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),\n      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),\n      loaded = _useState2[0],\n      setLoaded = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props === null || props === void 0 ? void 0 : props.programs),\n      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState3, 1),\n      programs = _useState4[0];\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"content-block\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-l text-b\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"strong\", null, \"Grants Program\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-s margin-top-s text-desc\"\n  }, \"What is an art grant?\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"page-container margin-top ethos-text\"\n  }, \"Sevens Foundation provides both artists and curators tools for creating opportunities to connect through art exhibitions.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"Grants, at the minimum, covers all costs for publishing artworks as part of a show and create a global and collaborative environment for curators and artists alike to connect through an integral goal. This allows any digital artist, regardless of your background or prior success, the potential for their artwork to speak directly to an organization or entity and their outreach.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"Our first grants program, Genesis Grant, included a cohort of 317 artists from 60 different countries - most of whom have been disadvantaged by means beyond their control. This is an ongoing program for any artist who have not yet minted an NFT before.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"All participants share passions for providing equal opportunities and lifting others up through visibility, providing for others, and a love for creative expression.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-m margin-top-l\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"strong\", null, \"Apply for a Grant\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"flex-wrap margin-top\"\n  }, programs.map(function (program, index) {\n    if (!program.closeApplication) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"a\", {\n        key: index,\n        className: \"button\",\n        to: \"/apply/\".concat(program.url)\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n        className: \"text-xs\"\n      }, program.organizers[0].name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"span\", null, program.name));\n    }\n  }))));\n}\n\n_s(Program, \"K1QguGHU72Dm8SAQcbTDPkcZKps=\");\n\n_c = Program;\n\nvar _c;\n\n$RefreshReg$(_c, \"Program\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZ3JhbS5qcz9jZjAwIl0sIm5hbWVzIjpbIlByb2dyYW0iLCJwcm9wcyIsInVzZVN0YXRlIiwibG9hZGVkIiwic2V0TG9hZGVkIiwicHJvZ3JhbXMiLCJtYXAiLCJwcm9ncmFtIiwiaW5kZXgiLCJjbG9zZUFwcGxpY2F0aW9uIiwidXJsIiwib3JnYW5pemVycyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFnQmUsU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFBQTs7QUFDckMsa0JBQTRCQywrQ0FBUSxDQUFDLEtBQUQsQ0FBcEM7QUFBQTtBQUFBLE1BQU9DLE1BQVA7QUFBQSxNQUFlQyxTQUFmOztBQUNBLG1CQUFtQkYsK0NBQVEsQ0FBQ0QsS0FBRCxhQUFDQSxLQUFELHVCQUFDQSxLQUFLLENBQUVJLFFBQVIsQ0FBM0I7QUFBQTtBQUFBLE1BQU9BLFFBQVA7O0FBRUEsc0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNFLDRGQURGLENBREYsZUFJRTtBQUFLLGFBQVMsRUFBQztBQUFmLDZCQUpGLGVBS0U7QUFBSyxhQUFTLEVBQUM7QUFBZiwrSUFHRSxzRUFIRixlQUlFLHNFQUpGLDhZQVdFLHNFQVhGLGVBWUUsc0VBWkYsK1FBaUJFLHNFQWpCRixlQWtCRSxzRUFsQkYsd0xBc0JFO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0UsK0ZBREYsQ0F0QkYsZUF5QkU7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNHQSxRQUFRLENBQUNDLEdBQVQsQ0FBYSxVQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFDaEMsUUFBSSxDQUFDRCxPQUFPLENBQUNFLGdCQUFiLEVBQStCO0FBQzdCLDBCQUNFO0FBQUcsV0FBRyxFQUFFRCxLQUFSO0FBQWUsaUJBQVMsRUFBQyxRQUF6QjtBQUFrQyxVQUFFLG1CQUFZRCxPQUFPLENBQUNHLEdBQXBCO0FBQXBDLHNCQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQTBCSCxPQUFPLENBQUNJLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0JDLElBQWhELENBREYsZUFFRSx5RUFBT0wsT0FBTyxDQUFDSyxJQUFmLENBRkYsQ0FERjtBQU1EO0FBQ0YsR0FUQSxDQURILENBekJGLENBTEYsQ0FERjtBQThDRDs7R0FsRHVCWixPOztLQUFBQSxPIiwiZmlsZSI6Ii4vcGFnZXMvcHJvZ3JhbS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhcGlVcmwgfSBmcm9tIFwiLi4vc3JjL2NsaWVudC9iYXNlVXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcygpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7YXBpVXJsKCl9L3Byb2dyYW1zL2dldFByb2dyYW1zYCwge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHByb2dyYW1zID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2coeyBwcm9ncmFtcyB9KTtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogeyBwcm9ncmFtcyB9LCAvLyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgcGFnZSBjb21wb25lbnQgYXMgcHJvcHNcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvZ3JhbShwcm9wcykge1xuICBjb25zdCBbbG9hZGVkLCBzZXRMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJvZ3JhbXNdID0gdXNlU3RhdGUocHJvcHM/LnByb2dyYW1zKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1ibG9ja1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWwgdGV4dC1iXCI+XG4gICAgICAgIDxzdHJvbmc+R3JhbnRzIFByb2dyYW08L3N0cm9uZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXMgbWFyZ2luLXRvcC1zIHRleHQtZGVzY1wiPldoYXQgaXMgYW4gYXJ0IGdyYW50PzwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRhaW5lciBtYXJnaW4tdG9wIGV0aG9zLXRleHRcIj5cbiAgICAgICAgU2V2ZW5zIEZvdW5kYXRpb24gcHJvdmlkZXMgYm90aCBhcnRpc3RzIGFuZCBjdXJhdG9ycyB0b29scyBmb3IgY3JlYXRpbmdcbiAgICAgICAgb3Bwb3J0dW5pdGllcyB0byBjb25uZWN0IHRocm91Z2ggYXJ0IGV4aGliaXRpb25zLlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIEdyYW50cywgYXQgdGhlIG1pbmltdW0sIGNvdmVycyBhbGwgY29zdHMgZm9yIHB1Ymxpc2hpbmcgYXJ0d29ya3MgYXMgcGFydFxuICAgICAgICBvZiBhIHNob3cgYW5kIGNyZWF0ZSBhIGdsb2JhbCBhbmQgY29sbGFib3JhdGl2ZSBlbnZpcm9ubWVudCBmb3IgY3VyYXRvcnNcbiAgICAgICAgYW5kIGFydGlzdHMgYWxpa2UgdG8gY29ubmVjdCB0aHJvdWdoIGFuIGludGVncmFsIGdvYWwuIFRoaXMgYWxsb3dzIGFueVxuICAgICAgICBkaWdpdGFsIGFydGlzdCwgcmVnYXJkbGVzcyBvZiB5b3VyIGJhY2tncm91bmQgb3IgcHJpb3Igc3VjY2VzcywgdGhlXG4gICAgICAgIHBvdGVudGlhbCBmb3IgdGhlaXIgYXJ0d29yayB0byBzcGVhayBkaXJlY3RseSB0byBhbiBvcmdhbml6YXRpb24gb3JcbiAgICAgICAgZW50aXR5IGFuZCB0aGVpciBvdXRyZWFjaC5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxiciAvPlxuICAgICAgICBPdXIgZmlyc3QgZ3JhbnRzIHByb2dyYW0sIEdlbmVzaXMgR3JhbnQsIGluY2x1ZGVkIGEgY29ob3J0IG9mIDMxN1xuICAgICAgICBhcnRpc3RzIGZyb20gNjAgZGlmZmVyZW50IGNvdW50cmllcyAtIG1vc3Qgb2Ygd2hvbSBoYXZlIGJlZW5cbiAgICAgICAgZGlzYWR2YW50YWdlZCBieSBtZWFucyBiZXlvbmQgdGhlaXIgY29udHJvbC4gVGhpcyBpcyBhbiBvbmdvaW5nIHByb2dyYW1cbiAgICAgICAgZm9yIGFueSBhcnRpc3Qgd2hvIGhhdmUgbm90IHlldCBtaW50ZWQgYW4gTkZUIGJlZm9yZS5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIDxiciAvPlxuICAgICAgICBBbGwgcGFydGljaXBhbnRzIHNoYXJlIHBhc3Npb25zIGZvciBwcm92aWRpbmcgZXF1YWwgb3Bwb3J0dW5pdGllcyBhbmRcbiAgICAgICAgbGlmdGluZyBvdGhlcnMgdXAgdGhyb3VnaCB2aXNpYmlsaXR5LCBwcm92aWRpbmcgZm9yIG90aGVycywgYW5kIGEgbG92ZVxuICAgICAgICBmb3IgY3JlYXRpdmUgZXhwcmVzc2lvbi5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LW0gbWFyZ2luLXRvcC1sXCI+XG4gICAgICAgICAgPHN0cm9uZz5BcHBseSBmb3IgYSBHcmFudDwvc3Ryb25nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXdyYXAgbWFyZ2luLXRvcFwiPlxuICAgICAgICAgIHtwcm9ncmFtcy5tYXAoKHByb2dyYW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByb2dyYW0uY2xvc2VBcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxhIGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImJ1dHRvblwiIHRvPXtgL2FwcGx5LyR7cHJvZ3JhbS51cmx9YH0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHNcIj57cHJvZ3JhbS5vcmdhbml6ZXJzWzBdLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cHJvZ3JhbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/program.js\n");

/***/ })

});