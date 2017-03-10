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
	    var bug = new bugs_1.Bug(80);
	    bug.setRoute(route);
	    bug.render();
	    stage.addChild(bug.graphics);
	    guide.render(route);
	    window.addEventListener('mousemove', function (e) {
	        var p = (e.clientX - 200) / (stageWidth - 400);
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
	        this.bone.forEach(function (pos, id) {
	            if (id == 0) {
	                g.moveTo(pos.x, pos.y);
	            }
	            else {
	                g.lineTo(pos.x, pos.y);
	            }
	        });
	        var span = 40;
	        var n = Math.floor((this.route.length - this.bone.length) * this.step);
	        var n1 = n % (span / 4);
	        var n12 = (this.route.length - this.bone.length) * this.step % (span / 4);
	        var n2 = n % (span / 2);
	        var id = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bone.length / 2);
	        var p = this.getPos(id);
	        //g.drawCircle(p.x, p.y, 2);
	        var lp = this.bone[this.bone.length / 2]; // this.route[Math.floor(n + this.bone.length / 2)];
	        if (n1 < n2) {
	            var id_1 = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bone.length / 2);
	            var p_1 = this.getPos(id_1);
	            var p2 = this.getPos(id_1 + span / 2);
	            var dx = (p2.x - p_1.x) * (n12 / (span / 4));
	            var dy = (p2.y - p_1.y) * (n12 / (span / 4));
	            g.moveTo(lp.x, lp.y);
	            g.lineTo(p_1.x + dx, p_1.y + dy);
	            console.log('b : ' + n1);
	        }
	        else {
	            console.log('a : ' + n1);
	            g.moveTo(lp.x, lp.y);
	            g.lineTo(p.x, p.y);
	        }
	        // g.moveTo(lp.x, lp.y);
	        // g.lineTo(x, y);
	    };
	    Bug.prototype.getPos = function (id) {
	        var id2 = id + 1;
	        console.log(id2);
	        var p1 = this.route[id];
	        var p2 = this.route[id2];
	        var tx = p2.x - p1.x;
	        var ty = p2.y - p1.y;
	        var r = Math.atan2(ty, tx) + Math.PI / 2;
	        return new UTILS.Pos(Math.cos(r) * 80 + p1.x, Math.sin(r) * 80 + p2.y);
	    };
	    return Bug;
	}(WORMS.Base));
	exports.Bug = Bug;


/***/ }
/******/ ]);