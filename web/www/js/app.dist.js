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
	    var route = ROUTES.RouteGenerator.getMinimumRoute(new UTILS.VecPos(200, 200, 0), new UTILS.VecPos(800, 800, -Math.PI), 200, 200, 5).wave(10, 0.1);
	    var bug = new bugs_1.Bug(60);
	    bug.setRoute(route);
	    bug.render();
	    stage.addChild(bug.graphics);
	    guide.render(route);
	    window.addEventListener('mousemove', function (e) {
	        var p = (e.clientY - 200) / (stageHeight - 400);
	        bug.setStep(p);
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
/***/ function(module, exports, __webpack_require__) {

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
	var legPos_1 = __webpack_require__(2);
	var Bug = (function (_super) {
	    __extends(Bug, _super);
	    function Bug(length) {
	        var _this = _super.call(this, length) || this;
	        _this._graphics = new PIXI.Graphics();
	        _this.lp = new legPos_1.LegPos(_this, 40, 80, -Math.PI / 2, 0, 0);
	        _this.lp2 = new legPos_1.LegPos(_this, 40, 80, Math.PI / 2, 20, 0);
	        _this.lp3 = new legPos_1.LegPos(_this, 40, 80, Math.PI / 2, 0, 0);
	        _this.lp4 = new legPos_1.LegPos(_this, 40, 80, -Math.PI / 2, 20, 0);
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
	        var id1 = Math.floor(this.currentLength * 0.1);
	        var id2 = Math.floor(this.currentLength * 0.9);
	        this.lp.beginOffset = this.lp2.beginOffset = id1;
	        this.lp3.beginOffset = this.lp4.beginOffset = id2;
	        var bp1 = this.bone[id1];
	        var bp2 = this.bone[id2];
	        var p = this.lp.getPos();
	        g.moveTo(bp1.x, bp1.y);
	        g.lineTo(p.x, p.y);
	        g.drawCircle(p.x, p.y, 5);
	        var p2 = this.lp2.getPos();
	        g.moveTo(bp1.x, bp1.y);
	        g.lineTo(p2.x, p2.y);
	        g.drawCircle(p2.x, p2.y, 5);
	        if (this.lp3) {
	            var p3 = this.lp3.getPos();
	            g.moveTo(bp2.x, bp2.y);
	            g.lineTo(p3.x, p3.y);
	            g.drawCircle(p3.x, p3.y, 5);
	            var p4 = this.lp4.getPos();
	            g.moveTo(bp2.x, bp2.y);
	            g.lineTo(p4.x, p4.y);
	            g.drawCircle(p4.x, p4.y, 5);
	        }
	    };
	    return Bug;
	}(WORMS.Base));
	exports.Bug = Bug;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var LegPos = (function () {
	    function LegPos(bug, span, radius, radianOffset, spanOffset, beginOffset) {
	        this.bug = bug;
	        this.span = span;
	        this.radius = radius;
	        this.radianOffset = radianOffset;
	        this.spanOffset = spanOffset % span;
	        this.beginOffset = beginOffset;
	    }
	    LegPos.prototype.getPos = function () {
	        var fid = (this.bug.route.length - this.bug.currentLength) * this.bug.step + this.spanOffset;
	        var nf = fid % (this.span / 2);
	        var pid = Math.floor(Math.floor(fid / this.span) * this.span - this.spanOffset + (this.bug.currentLength - this.beginOffset));
	        var pos = this._getPos(pid);
	        this._id = pid;
	        if (nf < fid % this.span) {
	            var ppos = this._getPos(pid + this.span);
	            var p = nf / (this.span / 2);
	            pos.x += (ppos.x - pos.x) * p;
	            pos.y += (ppos.y - pos.y) * p;
	            return pos;
	        }
	        return pos;
	    };
	    LegPos.prototype._getPos = function (id) {
	        id = Math.floor(id);
	        if (id < 0)
	            id = 0;
	        if (id >= this.bug.route.length - 1)
	            id = this.bug.route.length - 2;
	        var p1 = this.bug.route[id];
	        var p2 = this.bug.route[id + 1];
	        var tx = p2.x - p1.x;
	        var ty = p2.y - p1.y;
	        var r = Math.atan2(ty, tx) + this.radianOffset;
	        return new UTILS.Pos(Math.cos(r) * this.radius + p1.x, Math.sin(r) * this.radius + p1.y);
	    };
	    Object.defineProperty(LegPos.prototype, "id", {
	        get: function () {
	            return this._id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return LegPos;
	}());
	exports.LegPos = LegPos;


/***/ }
/******/ ]);