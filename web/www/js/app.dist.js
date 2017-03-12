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
	    var pVecPos = new UTILS.VecPos(200, 400, 0);
	    var next = function () {
	        // const nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 100 - 50, stageHeight / 2 + Math.random() * 100 - 50, Math.PI * 2 * Math.random());
	        var nVecPos = new UTILS.VecPos(1200, 400, 0);
	        var route = ROUTES.RouteGenerator.getMinimumRoute(pVecPos, nVecPos, 200, 200, 5); //.wave(20, 0.1);
	        pVecPos = nVecPos;
	        guide.clear();
	        guide.render(route);
	        bug.setRoute(route);
	        bug.setStep(0);
	        bug.render();
	    };
	    next();
	    window.addEventListener('mousemove', function (e) {
	        bug.setStep((e.clientX - 100) / (stageWidth - 200));
	        bug.render();
	    });
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
	        _this.prevPos;
	        _this.len = 0;
	        _this.pStep = 0;
	        _this.pid = 0;
	        _this.pid2 = 0;
	        _this.pp = new UTILS.Pos();
	        _this.pp2 = new UTILS.Pos();
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
	        if (this.prevPos)
	            this.len += this.prevPos.distance(this.bone[0]) * (this.step > this.pStep ? 1 : -1);
	        // console.log(this.bone[0]);
	        this.prevPos = this.bone[0].clone();
	        this.pStep = this.step;
	        var span = 180;
	        // console.log(Math.abs(this.pid - this.len) / 120);
	        var l1 = this.len;
	        if (Math.abs(this.pid - l1) > span) {
	            this.pid = l1;
	            this.pp = this._getPos(0);
	        }
	        var l2 = this.len + span / 2;
	        if (Math.abs(this.pid2 - l2) > span) {
	            this.pid2 = l2;
	            this.pp2 = this._getPos(0, -Math.PI / 2);
	        }
	        g.drawCircle(this.pp.x, this.pp.y, 10);
	        g.drawCircle(this.pp2.x, this.pp2.y, 10);
	    };
	    Bug.prototype._getPos = function (id, o) {
	        if (o === void 0) { o = Math.PI / 2; }
	        id = Math.floor(id);
	        var p1 = this.bone[id];
	        var p2 = this.bone[id + 1];
	        var tx = p2.x - p1.x;
	        var ty = p2.y - p1.y;
	        var r = Math.atan2(ty, tx) + o;
	        var radius = 100;
	        return new UTILS.Pos(Math.cos(r) * radius + p1.x, Math.sin(r) * radius + p1.y);
	    };
	    Bug.prototype.setRoute = function (route, nextLength) {
	        _super.prototype.setRoute.call(this, route, nextLength);
	    };
	    return Bug;
	}(WORMS.Base));
	exports.Bug = Bug;


/***/ }
/******/ ]);