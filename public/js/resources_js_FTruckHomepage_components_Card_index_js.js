(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_FTruckHomepage_components_Card_index_js"],{

/***/ "./resources/js/FTruckHomepage/components/Card/index.js":
/*!**************************************************************!*\
  !*** ./resources/js/FTruckHomepage/components/Card/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");



var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var CARD = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: calc(8rem + 12vw);\n  width: calc(9rem + 12vw);\n  background-color: var(--nav2);\n  border-radius: 20px;\n  position: relative;\n  margin-top: calc(5rem + 5vw);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
var Image = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 40%;\n  height: 40%;\n  position: absolute;\n  left: 50%;\n  bottom: 80%;\n  transform: translate(-50%);\n  border-radius: 50%;\n  background-color: red;\n  background: url(", ");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: top;\n  filter: drop-shadow(0px -3px 3px var(--nav2));\n"])), function (props) {
  return props.img;
});
var TEXT = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h4(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: var(--white);\n  padding: 0 calc(1rem + 1vw);\n\n  text-align: center;\n  font-size: calc(0.6rem + 0.5vw);\n"])));
var NAME = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h3(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  color: var(--pink);\n  padding-top: 1rem;\n  font-size: calc(0.5rem + 1vw);\n"])));

var Card = function Card(_ref) {
  var name = _ref.name,
      text = _ref.text,
      image = _ref.image;

  var Avatar = __webpack_require__("./resources/js/FTruckHomepage/assets sync recursive ^\\.\\/.*\\.jpg$")("./".concat(image, ".jpg"))["default"];

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CARD, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Image, {
      img: Avatar,
      width: "400",
      height: "400"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TEXT, {
      children: text
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NAME, {
      children: name
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./resources/js/FTruckHomepage/assets sync recursive ^\\.\\/.*\\.jpg$":
/*!****************************************************************!*\
  !*** ./resources/js/FTruckHomepage/assets/ sync ^\.\/.*\.jpg$ ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./avatar-1.jpg": "./resources/js/FTruckHomepage/assets/avatar-1.jpg",
	"./avatar-2.jpg": "./resources/js/FTruckHomepage/assets/avatar-2.jpg",
	"./avatar-3.jpg": "./resources/js/FTruckHomepage/assets/avatar-3.jpg",
	"./avatar-4.jpg": "./resources/js/FTruckHomepage/assets/avatar-4.jpg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/FTruckHomepage/assets sync recursive ^\\.\\/.*\\.jpg$";

/***/ })

}]);