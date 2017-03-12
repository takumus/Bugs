/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var bugs_1 = __webpack_require__(1);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var stageWidth = 0, stageHeight = 0;
	var mouse = new UTILS.Pos();
	var props = {
	    time: 900,
	    delay: 200,
	    S: 0.27,
	    V: 0.80
	};
	function initBugs() {
	    var guide = new ROUTES.Debugger();
	    guide.setOption(0xCCCCCC, 1, false, false);
	    stage.addChild(guide);
	    var bug = new bugs_1.Bug(50);
	    stage.addChild(bug.graphics);
	    var pVecPos = new UTILS.VecPos(200, 200, 0);
	    var next = function () {
	        var nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 100 - 50, stageHeight / 2 + Math.random() * 100 - 50, Math.PI * 2 * Math.random());
	        var route = ROUTES.RouteGenerator.getMinimumRoute(pVecPos, nVecPos, 200, 200, 5).wave(20, 0.1);
	        pVecPos = nVecPos;
	        guide.clear();
	        guide.render(route);
	        bug.setRoute(route);
	        new TWEEN.Tween({ s: 0 })
	            .to({ s: 1 }, 3000)
	            .onUpdate(function () {
	            bug.setStep(this.s);
	            bug.render();
	        })
	            .onComplete(function () {
	        })
	            .start();
	    };
	    next();
	}
	function initGUI() {
	    var gui = new dat.GUI();
	    gui.add(props, 'S', 0, 1);
	    gui.add(props, 'V', 0, 1);
	}
	function initPIXI() {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, resolution: 2, transparent: false, backgroundColor: 0xFFFFFF });
	    canvas = document.getElementById('content');
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = '100%';
	    renderer.view.style.height = '100%';
	    window.addEventListener('resize', resize);
	    window.addEventListener('orientationchange', resize);
	}
	function init() {
	    var color = new UTILS.Color(0xffffff);
	    initGUI();
	    initPIXI();
	    draw();
	    resize();
	    initBugs();
	}
	function draw() {
	    requestAnimationFrame(draw);
	    TWEEN.update();
	    renderer.render(stage);
	}
	function resize() {
	    stageWidth = canvas.offsetWidth;
	    stageHeight = canvas.offsetHeight;
	    renderer.resize(stageWidth, stageHeight);
	}
	window.onload = init;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Bug = (function (_super) {
	    __extends(Bug, _super);
	    function Bug(length) {
	        var _this = _super.call(this, length) || this;
	        _this._graphics = new PIXI.Graphics();
	        return _this;
	    }
	    Object.defineProperty(Bug.prototype, "graphics", {
	        get: function () {
	            return this._graphics;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Bug.prototype.render = function () {
	        var g = this._graphics;
	        g.clear();
	        g.lineStyle(6, 0xff0000);
	        for (var i = 0; i < this.currentLength; i++) {
	            var pos = this.bone[i];
	            if (i == 0) {
	                g.moveTo(pos.x, pos.y);
	            }
	            else {
	                g.lineTo(pos.x, pos.y);
	            }
	        }
	        ;
	    };
	    Bug.prototype.setRoute = function (route, nextLength) {
	        _super.prototype.setRoute.call(this, route, nextLength);
	    };
	    return Bug;
	}(WORMS.Base));
	exports.Bug = Bug;


/***/ }
/******/ ]);