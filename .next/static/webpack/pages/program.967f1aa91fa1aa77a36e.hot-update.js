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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; },\n/* harmony export */   \"default\": function() { return /* binding */ Program; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _s = $RefreshSig$();\n\n\nvar __N_SSG = true;\nfunction Program(props) {\n  _s();\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),\n      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),\n      loaded = _useState2[0],\n      setLoaded = _useState2[1];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props === null || props === void 0 ? void 0 : props.programs),\n      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState3, 1),\n      programs = _useState4[0];\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"content-block\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-l text-b\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"strong\", null, \"Grants Program\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-s margin-top-s text-desc\"\n  }, \"What is an art grant?\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"page-container margin-top ethos-text\"\n  }, \"Sevens Foundation provides both artists and curators tools for creating opportunities to connect through art exhibitions.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"Grants, at the minimum, covers all costs for publishing artworks as part of a show and create a global and collaborative environment for curators and artists alike to connect through an integral goal. This allows any digital artist, regardless of your background or prior success, the potential for their artwork to speak directly to an organization or entity and their outreach.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"Our first grants program, Genesis Grant, included a cohort of 317 artists from 60 different countries - most of whom have been disadvantaged by means beyond their control. This is an ongoing program for any artist who have not yet minted an NFT before.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"br\", null), \"All participants share passions for providing equal opportunities and lifting others up through visibility, providing for others, and a love for creative expression.\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"text-m margin-top-l\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"strong\", null, \"Apply for a Grant\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"flex-wrap margin-top\"\n  }, programs.map(function (program, index) {\n    if (!program.closeApplication) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"a\", {\n        key: index,\n        className: \"button\",\n        to: \"/apply/\".concat(program.url)\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n        className: \"text-xs\"\n      }, program.organizers[0].name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"span\", null, program.name));\n    }\n  }))));\n}\n\n_s(Program, \"K1QguGHU72Dm8SAQcbTDPkcZKps=\");\n\n_c = Program;\n\nvar _c;\n\n$RefreshReg$(_c, \"Program\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvZ3JhbS5qcz9jZjAwIl0sIm5hbWVzIjpbIlByb2dyYW0iLCJwcm9wcyIsInVzZVN0YXRlIiwibG9hZGVkIiwic2V0TG9hZGVkIiwicHJvZ3JhbXMiLCJtYXAiLCJwcm9ncmFtIiwiaW5kZXgiLCJjbG9zZUFwcGxpY2F0aW9uIiwidXJsIiwib3JnYW5pemVycyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFpQmUsU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFBQTs7QUFDckMsa0JBQTRCQywrQ0FBUSxDQUFDLEtBQUQsQ0FBcEM7QUFBQTtBQUFBLE1BQU9DLE1BQVA7QUFBQSxNQUFlQyxTQUFmOztBQUNBLG1CQUFtQkYsK0NBQVEsQ0FBQ0QsS0FBRCxhQUFDQSxLQUFELHVCQUFDQSxLQUFLLENBQUVJLFFBQVIsQ0FBM0I7QUFBQTtBQUFBLE1BQU9BLFFBQVA7O0FBRUEsc0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNFLDRGQURGLENBREYsZUFJRTtBQUFLLGFBQVMsRUFBQztBQUFmLDZCQUpGLGVBS0U7QUFBSyxhQUFTLEVBQUM7QUFBZiwrSUFHRSxzRUFIRixlQUlFLHNFQUpGLDhZQVdFLHNFQVhGLGVBWUUsc0VBWkYsK1FBaUJFLHNFQWpCRixlQWtCRSxzRUFsQkYsd0xBc0JFO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0UsK0ZBREYsQ0F0QkYsZUF5QkU7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNHQSxRQUFRLENBQUNDLEdBQVQsQ0FBYSxVQUFDQyxPQUFELEVBQVVDLEtBQVYsRUFBb0I7QUFDaEMsUUFBSSxDQUFDRCxPQUFPLENBQUNFLGdCQUFiLEVBQStCO0FBQzdCLDBCQUNFO0FBQUcsV0FBRyxFQUFFRCxLQUFSO0FBQWUsaUJBQVMsRUFBQyxRQUF6QjtBQUFrQyxVQUFFLG1CQUFZRCxPQUFPLENBQUNHLEdBQXBCO0FBQXBDLHNCQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQTBCSCxPQUFPLENBQUNJLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0JDLElBQWhELENBREYsZUFFRSx5RUFBT0wsT0FBTyxDQUFDSyxJQUFmLENBRkYsQ0FERjtBQU1EO0FBQ0YsR0FUQSxDQURILENBekJGLENBTEYsQ0FERjtBQThDRDs7R0FsRHVCWixPOztLQUFBQSxPIiwiZmlsZSI6Ii4vcGFnZXMvcHJvZ3JhbS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhcGlVcmwgfSBmcm9tIFwiLi4vc3JjL2NsaWVudC9iYXNlVXJsXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcygpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7YXBpVXJsKCl9L3Byb2dyYW1zL2dldFByb2dyYW1zYCwge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHByb2dyYW1zID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgY29uc29sZS5sb2coeyBwcm9ncmFtcyB9KTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7IHByb2dyYW1zIH0sIC8vIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBwYWdlIGNvbXBvbmVudCBhcyBwcm9wc1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9ncmFtKHByb3BzKSB7XG4gIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcm9ncmFtc10gPSB1c2VTdGF0ZShwcm9wcz8ucHJvZ3JhbXMpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWJsb2NrXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbCB0ZXh0LWJcIj5cbiAgICAgICAgPHN0cm9uZz5HcmFudHMgUHJvZ3JhbTwvc3Ryb25nPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcyBtYXJnaW4tdG9wLXMgdGV4dC1kZXNjXCI+V2hhdCBpcyBhbiBhcnQgZ3JhbnQ/PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGFpbmVyIG1hcmdpbi10b3AgZXRob3MtdGV4dFwiPlxuICAgICAgICBTZXZlbnMgRm91bmRhdGlvbiBwcm92aWRlcyBib3RoIGFydGlzdHMgYW5kIGN1cmF0b3JzIHRvb2xzIGZvciBjcmVhdGluZ1xuICAgICAgICBvcHBvcnR1bml0aWVzIHRvIGNvbm5lY3QgdGhyb3VnaCBhcnQgZXhoaWJpdGlvbnMuXG4gICAgICAgIDxiciAvPlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgR3JhbnRzLCBhdCB0aGUgbWluaW11bSwgY292ZXJzIGFsbCBjb3N0cyBmb3IgcHVibGlzaGluZyBhcnR3b3JrcyBhcyBwYXJ0XG4gICAgICAgIG9mIGEgc2hvdyBhbmQgY3JlYXRlIGEgZ2xvYmFsIGFuZCBjb2xsYWJvcmF0aXZlIGVudmlyb25tZW50IGZvciBjdXJhdG9yc1xuICAgICAgICBhbmQgYXJ0aXN0cyBhbGlrZSB0byBjb25uZWN0IHRocm91Z2ggYW4gaW50ZWdyYWwgZ29hbC4gVGhpcyBhbGxvd3MgYW55XG4gICAgICAgIGRpZ2l0YWwgYXJ0aXN0LCByZWdhcmRsZXNzIG9mIHlvdXIgYmFja2dyb3VuZCBvciBwcmlvciBzdWNjZXNzLCB0aGVcbiAgICAgICAgcG90ZW50aWFsIGZvciB0aGVpciBhcnR3b3JrIHRvIHNwZWFrIGRpcmVjdGx5IHRvIGFuIG9yZ2FuaXphdGlvbiBvclxuICAgICAgICBlbnRpdHkgYW5kIHRoZWlyIG91dHJlYWNoLlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIE91ciBmaXJzdCBncmFudHMgcHJvZ3JhbSwgR2VuZXNpcyBHcmFudCwgaW5jbHVkZWQgYSBjb2hvcnQgb2YgMzE3XG4gICAgICAgIGFydGlzdHMgZnJvbSA2MCBkaWZmZXJlbnQgY291bnRyaWVzIC0gbW9zdCBvZiB3aG9tIGhhdmUgYmVlblxuICAgICAgICBkaXNhZHZhbnRhZ2VkIGJ5IG1lYW5zIGJleW9uZCB0aGVpciBjb250cm9sLiBUaGlzIGlzIGFuIG9uZ29pbmcgcHJvZ3JhbVxuICAgICAgICBmb3IgYW55IGFydGlzdCB3aG8gaGF2ZSBub3QgeWV0IG1pbnRlZCBhbiBORlQgYmVmb3JlLlxuICAgICAgICA8YnIgLz5cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIEFsbCBwYXJ0aWNpcGFudHMgc2hhcmUgcGFzc2lvbnMgZm9yIHByb3ZpZGluZyBlcXVhbCBvcHBvcnR1bml0aWVzIGFuZFxuICAgICAgICBsaWZ0aW5nIG90aGVycyB1cCB0aHJvdWdoIHZpc2liaWxpdHksIHByb3ZpZGluZyBmb3Igb3RoZXJzLCBhbmQgYSBsb3ZlXG4gICAgICAgIGZvciBjcmVhdGl2ZSBleHByZXNzaW9uLlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbSBtYXJnaW4tdG9wLWxcIj5cbiAgICAgICAgICA8c3Ryb25nPkFwcGx5IGZvciBhIEdyYW50PC9zdHJvbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtd3JhcCBtYXJnaW4tdG9wXCI+XG4gICAgICAgICAge3Byb2dyYW1zLm1hcCgocHJvZ3JhbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghcHJvZ3JhbS5jbG9zZUFwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGEga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdG89e2AvYXBwbHkvJHtwcm9ncmFtLnVybH1gfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14c1wiPntwcm9ncmFtLm9yZ2FuaXplcnNbMF0ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntwcm9ncmFtLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/program.js\n");

/***/ })

});