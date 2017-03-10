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
	var digitalClock_1 = __webpack_require__(1);
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
	var guide = new ROUTES.Debugger();
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
	    WF.FigureWorm.graphics = new PIXI.Graphics();
	    stage.addChild(WF.FigureWorm.graphics);
	    guide.setOption(0xCCCCCC, 1, false, false);
	    var dc = new digitalClock_1.DigitalClock();
	    draw();
	    resize();
	}
	function draw() {
	    requestAnimationFrame(draw);
	    TWEEN.update();
	    WF.FigureWorm.render();
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
	Object.defineProperty(exports, "__esModule", { value: true });
	var holder_1 = __webpack_require__(2);
	var DigitalClock = (function () {
	    function DigitalClock() {
	        var _this = this;
	        this.hours = new holder_1.NumHolder(2);
	        this.minutes = new holder_1.NumHolder(2);
	        this.seconds = new holder_1.NumHolder(2);
	        this.hours.setPositionOffset(new UTILS.Pos(200, 500));
	        this.minutes.setPositionOffset(new UTILS.Pos(500, 500));
	        this.seconds.setPositionOffset(new UTILS.Pos(800, 500));
	        var update = function (force) {
	            var date = new Date();
	            var hours = date.getHours();
	            var minutes = date.getMinutes();
	            var seconds = date.getSeconds();
	            _this.hours.setNumber(hours, force);
	            _this.minutes.setNumber(minutes, force);
	            _this.seconds.setNumber(seconds, force);
	        };
	        setInterval(update, 1000);
	        update(true);
	    }
	    return DigitalClock;
	}());
	exports.DigitalClock = DigitalClock;


/***/ },
/* 2 */
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
	var nums_1 = __webpack_require__(3);
	var nums = [];
	nums_1.nums_object.forEach(function (numObj) {
	    var num = new WF.Figure();
	    num.initWithOject(numObj);
	    nums.push(num);
	});
	var Holder = (function (_super) {
	    __extends(Holder, _super);
	    function Holder() {
	        var _this = _super.call(this) || this;
	        _this.color = new UTILS.Color();
	        _this._option = {
	            maxThickness: 30,
	            minThickness: 5,
	            color: new UTILS.Color().setHSV(Math.random(), 0.3, 0.7)
	        };
	        return _this;
	    }
	    Object.defineProperty(Holder.prototype, "option", {
	        get: function () {
	            return this._option;
	        },
	        set: function (option) {
	            this._option = option;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Holder.prototype.setStep = function (worm, step) {
	        _super.prototype.setStep.call(this, worm, step);
	        var p = 1 - Math.sin(Math.PI * step);
	        worm.option.thickness = p * (this._option.maxThickness - this._option.minThickness) + this._option.minThickness;
	        var prevColor = worm.prevHolder.option.color.clone();
	        UTILS.Color.transformRGB(prevColor, this._option.color, step);
	        worm.option.fillColor = prevColor.getColor();
	    };
	    return Holder;
	}(WF.Holder));
	var NumHolder = (function () {
	    function NumHolder(length) {
	        this._numberWidth = 140;
	        this._completed = true;
	        this._number = 0;
	        this.setPositionOffset(new UTILS.Pos(500, 500));
	        this._length = length;
	    }
	    NumHolder.prototype.initHolders = function () {
	        this._holders = [];
	        for (var i = 0; i < this._length; i++) {
	            var holder = new Holder();
	            holder.setFigure(nums[0]);
	            this._holders.push(holder);
	        }
	    };
	    NumHolder.prototype.setPositionOffset = function (pos) {
	        this._pos = pos.clone();
	    };
	    NumHolder.prototype.setNumber = function (value, force) {
	        var _this = this;
	        if (!this._completed)
	            return;
	        if (this._number == value && !force)
	            return;
	        this._number = value;
	        var values = value.toString().split('').map(function (value) { return Number(value); }).reverse();
	        if (values.length > this._length) {
	            console.error('value is longer than length');
	            return;
	        }
	        if (!this._holders)
	            this.initHolders();
	        var oldHolders = UTILS.clone(this._holders);
	        this._holders = [];
	        this._completeCount = this._length;
	        this._completed = false;
	        oldHolders.forEach(function (oldHolder, id) {
	            var holder = new Holder();
	            var p = _this._pos.clone();
	            p.x += (_this._length - 1) * _this._numberWidth / 2;
	            p.x -= _this._numberWidth * id;
	            holder.setPositionOffset(p);
	            var num = values[id];
	            if (!num)
	                num = 0;
	            holder.setFigure(nums[num]);
	            if (force) {
	                oldHolder.dispose();
	                holder.generate();
	                _this._completed = true;
	            }
	            else {
	                var hm_1 = new WF.HolderMaster();
	                hm_1.transform(oldHolder, holder, {
	                    radius: 60,
	                    resolution: 5
	                });
	                hm_1.autoTween(900, 0, function () {
	                    oldHolder.dispose();
	                    hm_1.dispose();
	                    _this._completeCount--;
	                    if (_this._completeCount == 0) {
	                        _this._completed = true;
	                    }
	                });
	            }
	            _this._holders.push(holder);
	        });
	    };
	    return NumHolder;
	}());
	exports.NumHolder = NumHolder;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var nums_object = [[[{ x: -0.32, y: -63.09 }, { x: 4.68, y: -63.09 }, { x: 9.68, y: -63.09 }, { x: 14.68, y: -63.09 }, { x: 19.68, y: -63.09 }, { x: 24.62, y: -62.32 }, { x: 29.41, y: -60.92 }, { x: 33.69, y: -58.35 }, { x: 37.21, y: -54.81 }, { x: 39.86, y: -50.58 }, { x: 41.29, y: -45.8 }, { x: 41.84, y: -40.84 }, { x: 41.84, y: -35.84 }, { x: 41.84, y: -30.84 }, { x: 41.84, y: -25.84 }, { x: 41.84, y: -20.84 }, { x: 41.84, y: -15.84 }, { x: 41.84, y: -10.84 }, { x: 41.84, y: -5.84 }, { x: 41.84, y: -0.84 }, { x: 41.84, y: 4.16 }, { x: 41.84, y: 9.16 }, { x: 41.84, y: 14.16 }, { x: 41.84, y: 19.16 }, { x: 41.84, y: 24.16 }, { x: 41.84, y: 29.16 }, { x: 41.84, y: 34.16 }, { x: 41.84, y: 39.16 }, { x: 41.84, y: 44.16 }, { x: 40.72, y: 49.03 }, { x: 38.4, y: 53.46 }, { x: 35.35, y: 57.42 }, { x: 31.37, y: 60.44 }, { x: 26.78, y: 62.43 }, { x: 21.82, y: 63.08 }, { x: 16.82, y: 63.07 }, { x: 11.82, y: 63.07 }, { x: 6.82, y: 63.07 }, { x: 1.82, y: 63.07 }, { x: -3.18, y: 63.07 }, { x: -8.18, y: 63.07 }, { x: -13.18, y: 63.07 }, { x: -18.18, y: 63.07 }, { x: -23.18, y: 63.07 }, { x: -28.05, y: 61.91 }, { x: -32.45, y: 59.52 }, { x: -36.18, y: 56.18 }, { x: -39.18, y: 52.17 }, { x: -41.11, y: 47.55 }, { x: -41.84, y: 42.6 }, { x: -41.84, y: 37.6 }, { x: -41.84, y: 32.6 }, { x: -41.84, y: 27.6 }, { x: -41.84, y: 22.6 }, { x: -41.84, y: 17.6 }, { x: -41.84, y: 12.6 }, { x: -41.84, y: 7.6 }, { x: -41.84, y: 2.6 }, { x: -41.84, y: -2.4 }, { x: -41.84, y: -7.4 }, { x: -41.84, y: -12.4 }, { x: -41.84, y: -17.4 }, { x: -41.84, y: -22.4 }, { x: -41.84, y: -27.4 }, { x: -41.84, y: -32.4 }, { x: -41.84, y: -37.4 }, { x: -41.84, y: -42.4 }, { x: -41.01, y: -47.34 }, { x: -39.18, y: -52 }, { x: -36.18, y: -56 }, { x: -32.31, y: -59.17 }, { x: -27.84, y: -61.4 }, { x: -22.97, y: -62.51 }, { x: -17.99, y: -62.95 }, { x: -12.99, y: -62.95 }, { x: -7.99, y: -62.95 }, { x: -2.99, y: -62.95 }, { x: 2.01, y: -62.95 }]],
	    [[{ x: 0, y: -62.5 }, { x: 0, y: -57.5 }, { x: 0, y: -52.5 }, { x: 0, y: -47.5 }, { x: 0, y: -42.5 }, { x: 0, y: -37.5 }, { x: 0, y: -32.5 }, { x: 0, y: -27.5 }, { x: 0, y: -22.5 }, { x: 0, y: -17.5 }, { x: 0, y: -12.5 }, { x: 0, y: -7.5 }, { x: 0, y: -2.5 }, { x: 0, y: 2.5 }, { x: 0, y: 7.5 }, { x: 0, y: 12.5 }, { x: 0, y: 17.5 }, { x: 0, y: 22.5 }, { x: 0, y: 27.5 }, { x: 0, y: 32.5 }, { x: 0, y: 37.5 }, { x: 0, y: 42.5 }, { x: 0, y: 47.5 }, { x: 0, y: 52.5 }, { x: 0, y: 57.5 }, { x: 0, y: 62.5 }]],
	    [[{ x: -42.24, y: -63.18 }, { x: -37.24, y: -63.18 }, { x: -32.24, y: -63.18 }, { x: -27.24, y: -63.18 }, { x: -22.24, y: -63.18 }, { x: -17.24, y: -63.18 }, { x: -12.24, y: -63.18 }, { x: -7.24, y: -63.18 }, { x: -2.24, y: -63.18 }, { x: 2.76, y: -63.18 }, { x: 7.76, y: -63.18 }, { x: 12.76, y: -63.18 }, { x: 17.76, y: -63.18 }, { x: 22.76, y: -63.18 }, { x: 27.62, y: -61.99 }, { x: 32.09, y: -59.78 }, { x: 36.04, y: -56.72 }, { x: 39.06, y: -52.74 }, { x: 41.2, y: -48.23 }, { x: 42.07, y: -43.31 }, { x: 42.22, y: -38.32 }, { x: 42.22, y: -33.32 }, { x: 42.22, y: -28.32 }, { x: 42.22, y: -23.32 }, { x: 42.22, y: -18.32 }, { x: 40.88, y: -13.51 }, { x: 38.43, y: -9.16 }, { x: 35.27, y: -5.28 }, { x: 31.12, y: -2.49 }, { x: 26.47, y: -0.64 }, { x: 21.5, y: -0.03 }, { x: 16.5, y: -0.03 }, { x: 11.5, y: -0.03 }, { x: 6.5, y: -0.03 }, { x: 1.5, y: -0.03 }, { x: -3.5, y: -0.03 }, { x: -8.5, y: -0.03 }, { x: -13.5, y: -0.03 }, { x: -18.5, y: -0.03 }, { x: -23.49, y: 0.38 }, { x: -28.28, y: 1.81 }, { x: -32.75, y: 4.04 }, { x: -36.46, y: 7.4 }, { x: -39.21, y: 11.57 }, { x: -40.97, y: 16.25 }, { x: -41.49, y: 21.22 }, { x: -41.49, y: 26.22 }, { x: -41.49, y: 31.22 }, { x: -41.49, y: 36.22 }, { x: -41.49, y: 41.22 }, { x: -41.06, y: 46.2 }, { x: -39.76, y: 51.02 }, { x: -37.06, y: 55.22 }, { x: -33.38, y: 58.58 }, { x: -29.1, y: 61.14 }, { x: -24.41, y: 62.84 }, { x: -19.43, y: 63.17 }, { x: -14.43, y: 63.17 }, { x: -9.43, y: 63.17 }, { x: -4.43, y: 63.17 }, { x: 0.57, y: 63.17 }, { x: 5.57, y: 63.17 }, { x: 10.57, y: 63.17 }, { x: 15.57, y: 63.17 }, { x: 20.57, y: 63.17 }, { x: 25.57, y: 63.17 }, { x: 30.57, y: 63.17 }, { x: 35.57, y: 63.17 }, { x: 40.57, y: 63.17 }]],
	    [[{ x: -42.49, y: -63 }, { x: -37.49, y: -63 }, { x: -32.49, y: -63 }, { x: -27.49, y: -63 }, { x: -22.49, y: -63 }, { x: -17.49, y: -63 }, { x: -12.49, y: -63 }, { x: -7.49, y: -63 }, { x: -2.49, y: -63 }, { x: 2.51, y: -63 }, { x: 7.51, y: -63 }, { x: 12.51, y: -63 }, { x: 17.51, y: -63 }, { x: 22.49, y: -62.64 }, { x: 27.39, y: -61.66 }, { x: 31.96, y: -59.65 }, { x: 36.04, y: -56.78 }, { x: 39.17, y: -52.89 }, { x: 41.16, y: -48.31 }, { x: 42.41, y: -43.47 }, { x: 42.47, y: -38.48 }, { x: 42.47, y: -33.48 }, { x: 42.47, y: -28.48 }, { x: 42.47, y: -23.49 }, { x: 42.22, y: -18.49 }, { x: 41.15, y: -13.61 }, { x: 38.75, y: -9.23 }, { x: 35.56, y: -5.38 }, { x: 31.48, y: -2.48 }, { x: 26.83, y: -0.61 }, { x: 21.89, y: 0.18 }, { x: 16.89, y: 0.18 }, { x: 11.89, y: 0.18 }, { x: 6.89, y: 0.18 }, { x: 1.89, y: 0.18 }, { x: -3.11, y: 0.18 }, { x: -8.11, y: 0.18 }, { x: -13.11, y: 0.18 }, { x: -18.11, y: 0.18 }, { x: -23.11, y: 0.18 }, { x: -28.11, y: 0.18 }, { x: -33.11, y: 0.18 }, { x: -38.11, y: 0.18 }], [{ x: -42.49, y: 63 }, { x: -37.49, y: 63 }, { x: -32.49, y: 63 }, { x: -27.49, y: 63 }, { x: -22.49, y: 63 }, { x: -17.49, y: 63 }, { x: -12.49, y: 63 }, { x: -7.49, y: 63 }, { x: -2.49, y: 63 }, { x: 2.51, y: 63 }, { x: 7.51, y: 63 }, { x: 12.51, y: 63 }, { x: 17.51, y: 63 }, { x: 22.51, y: 63 }, { x: 27.45, y: 62.28 }, { x: 32.03, y: 60.28 }, { x: 35.86, y: 57.08 }, { x: 39.22, y: 53.38 }, { x: 41.46, y: 48.91 }, { x: 42.48, y: 44 }, { x: 42.48, y: 39 }, { x: 42.48, y: 34.01 }, { x: 42.48, y: 29.01 }, { x: 42.48, y: 24.01 }, { x: 42.48, y: 19.01 }, { x: 41.12, y: 14.18 }, { x: 38.79, y: 9.76 }, { x: 35.45, y: 6.03 }, { x: 31.36, y: 3.14 }, { x: 26.78, y: 1.12 }, { x: 21.83, y: 0.37 }, { x: 16.83, y: 0.37 }, { x: 11.83, y: 0.37 }, { x: 6.83, y: 0.37 }, { x: 1.83, y: 0.37 }, { x: -3.17, y: 0.37 }, { x: -8.17, y: 0.37 }, { x: -13.17, y: 0.37 }, { x: -18.17, y: 0.37 }, { x: -23.17, y: 0.37 }, { x: -28.17, y: 0.37 }, { x: -33.17, y: 0.37 }, { x: -38.17, y: 0.37 }]],
	    [[{ x: 41.5, y: -62 }, { x: 41.5, y: -57 }, { x: 41.5, y: -52 }, { x: 41.5, y: -47 }, { x: 41.5, y: -42 }, { x: 41.5, y: -37 }, { x: 41.5, y: -32 }, { x: 41.5, y: -27 }, { x: 41.5, y: -22 }, { x: 41.5, y: -17 }, { x: 41.5, y: -12 }, { x: 41.5, y: -7 }, { x: 41.5, y: -2 }, { x: 41.5, y: 3 }, { x: 41.5, y: 8 }, { x: 41.5, y: 13 }, { x: 41.5, y: 18 }, { x: 41.5, y: 23 }, { x: 41.5, y: 28 }, { x: 41.5, y: 33 }, { x: 41.5, y: 38 }, { x: 41.5, y: 43 }, { x: 41.5, y: 48 }, { x: 41.5, y: 53 }, { x: 41.5, y: 58 }, { x: 41.5, y: 63 }], [{ x: -41.5, y: -63 }, { x: -41.5, y: -58 }, { x: -41.5, y: -53 }, { x: -41.5, y: -48 }, { x: -41.5, y: -43 }, { x: -41.5, y: -38 }, { x: -41.5, y: -33 }, { x: -41.5, y: -28 }, { x: -41.5, y: -23 }, { x: -41.03, y: -18.03 }, { x: -39.87, y: -13.18 }, { x: -37.56, y: -8.74 }, { x: -34.05, y: -5.19 }, { x: -29.96, y: -2.32 }, { x: -25.37, y: -0.38 }, { x: -20.45, y: 0.51 }, { x: -15.45, y: 0.51 }, { x: -10.45, y: 0.51 }, { x: -5.45, y: 0.51 }, { x: -0.45, y: 0.51 }, { x: 4.55, y: 0.51 }, { x: 9.55, y: 0.51 }, { x: 14.55, y: 0.51 }, { x: 19.55, y: 0.51 }, { x: 24.53, y: 0.51 }, { x: 29.53, y: 0.51 }, { x: 34.53, y: 0.51 }, { x: 39.53, y: 0.51 }]],
	    [[{ x: 41.48, y: -62.56 }, { x: 36.48, y: -62.56 }, { x: 31.48, y: -62.56 }, { x: 26.48, y: -62.56 }, { x: 21.48, y: -62.56 }, { x: 16.48, y: -62.56 }, { x: 11.48, y: -62.56 }, { x: 6.48, y: -62.56 }, { x: 1.48, y: -62.56 }, { x: -3.52, y: -62.56 }, { x: -8.52, y: -62.56 }, { x: -13.52, y: -62.56 }, { x: -18.52, y: -62.56 }, { x: -23.52, y: -62.56 }, { x: -28.38, y: -61.37 }, { x: -32.97, y: -59.37 }, { x: -36.54, y: -55.87 }, { x: -39.52, y: -51.85 }, { x: -41.22, y: -47.15 }, { x: -41.88, y: -42.2 }, { x: -41.88, y: -37.2 }, { x: -41.88, y: -32.2 }, { x: -41.88, y: -27.2 }, { x: -41.88, y: -22.2 }, { x: -41.47, y: -17.22 }, { x: -40.13, y: -12.41 }, { x: -37.51, y: -8.16 }, { x: -33.94, y: -4.67 }, { x: -29.66, y: -2.1 }, { x: -24.96, y: -0.42 }, { x: -19.98, y: -0.01 }, { x: -14.98, y: -0.01 }, { x: -9.98, y: -0.01 }, { x: -4.98, y: -0.01 }, { x: 0.02, y: -0.01 }, { x: 5.02, y: -0.01 }, { x: 10.02, y: -0.01 }, { x: 15.02, y: -0.01 }, { x: 20.02, y: -0.01 }, { x: 25, y: 0.37 }, { x: 29.8, y: 1.74 }, { x: 34.03, y: 4.4 }, { x: 37.39, y: 8.1 }, { x: 40.01, y: 12.35 }, { x: 41.43, y: 17.14 }, { x: 41.87, y: 22.12 }, { x: 41.87, y: 27.12 }, { x: 41.87, y: 32.12 }, { x: 41.87, y: 37.12 }, { x: 41.87, y: 42.12 }, { x: 41.12, y: 47.06 }, { x: 39.37, y: 51.74 }, { x: 36.46, y: 55.8 }, { x: 32.64, y: 59.03 }, { x: 28.27, y: 61.47 }, { x: 23.38, y: 62.55 }, { x: 18.38, y: 62.55 }, { x: 13.38, y: 62.55 }, { x: 8.38, y: 62.55 }, { x: 3.38, y: 62.55 }, { x: -1.62, y: 62.55 }, { x: -6.62, y: 62.55 }, { x: -11.62, y: 62.55 }, { x: -16.62, y: 62.55 }, { x: -21.62, y: 62.55 }, { x: -26.62, y: 62.55 }, { x: -31.62, y: 62.55 }, { x: -36.62, y: 62.55 }, { x: -41.62, y: 62.55 }]],
	    [[{ x: 41.45, y: -63.1 }, { x: 36.45, y: -63.1 }, { x: 31.45, y: -63.1 }, { x: 26.45, y: -63.1 }, { x: 21.45, y: -63.1 }, { x: 16.45, y: -63.1 }, { x: 11.45, y: -63.1 }, { x: 6.45, y: -63.1 }, { x: 1.45, y: -63.1 }, { x: -3.55, y: -63.1 }, { x: -8.55, y: -63.1 }, { x: -13.55, y: -63.1 }, { x: -18.55, y: -63.1 }, { x: -23.52, y: -62.48 }, { x: -28.38, y: -61.31 }, { x: -32.77, y: -58.92 }, { x: -36.51, y: -55.6 }, { x: -39.44, y: -51.55 }, { x: -41.09, y: -46.83 }, { x: -41.86, y: -41.89 }, { x: -41.86, y: -36.89 }, { x: -41.86, y: -31.89 }, { x: -41.86, y: -26.89 }, { x: -41.86, y: -21.9 }, { x: -41.86, y: -16.9 }, { x: -41.86, y: -11.9 }, { x: -41.86, y: -6.9 }, { x: -41.86, y: -1.9 }, { x: -41.86, y: 3.1 }, { x: -41.86, y: 8.1 }, { x: -41.86, y: 13.1 }, { x: -41.86, y: 18.1 }, { x: -41.86, y: 23.1 }, { x: -41.86, y: 28.1 }, { x: -41.86, y: 33.1 }, { x: -41.86, y: 38.09 }, { x: -41.86, y: 43.09 }, { x: -41.02, y: 48.01 }, { x: -39.08, y: 52.61 }, { x: -36.17, y: 56.66 }, { x: -32.22, y: 59.71 }, { x: -27.81, y: 62.05 }, { x: -22.9, y: 62.97 }, { x: -17.91, y: 63.09 }, { x: -12.91, y: 63.09 }, { x: -7.91, y: 63.09 }, { x: -2.91, y: 63.09 }, { x: 2.09, y: 63.09 }, { x: 7.09, y: 63.09 }, { x: 12.09, y: 63.09 }, { x: 17.09, y: 63.09 }, { x: 22.09, y: 63.09 }, { x: 27.02, y: 62.25 }, { x: 31.61, y: 60.27 }, { x: 35.63, y: 57.3 }, { x: 38.71, y: 53.36 }, { x: 40.85, y: 48.84 }, { x: 41.85, y: 43.94 }, { x: 41.85, y: 38.94 }, { x: 41.85, y: 33.94 }, { x: 41.85, y: 28.94 }, { x: 41.85, y: 23.94 }, { x: 41.85, y: 18.94 }, { x: 40.6, y: 14.09 }, { x: 38.25, y: 9.67 }, { x: 35.02, y: 5.84 }, { x: 30.83, y: 3.11 }, { x: 26.12, y: 1.41 }, { x: 21.18, y: 0.59 }, { x: 16.18, y: 0.44 }, { x: 11.18, y: 0.44 }, { x: 6.18, y: 0.44 }, { x: 1.18, y: 0.44 }, { x: -3.82, y: 0.44 }, { x: -8.82, y: 0.44 }, { x: -13.82, y: 0.44 }, { x: -18.82, y: 0.44 }, { x: -23.82, y: 0.44 }, { x: -28.82, y: 0.44 }, { x: -33.82, y: 0.44 }, { x: -38.82, y: 0.44 }]],
	    [[{ x: -42.44, y: -62.38 }, { x: -37.44, y: -62.38 }, { x: -32.44, y: -62.38 }, { x: -27.44, y: -62.38 }, { x: -22.44, y: -62.38 }, { x: -17.44, y: -62.38 }, { x: -12.44, y: -62.38 }, { x: -7.44, y: -62.38 }, { x: -2.44, y: -62.38 }, { x: 2.56, y: -62.38 }, { x: 7.56, y: -62.38 }, { x: 12.56, y: -62.38 }, { x: 17.56, y: -62.38 }, { x: 22.54, y: -62.05 }, { x: 27.42, y: -61.01 }, { x: 31.98, y: -58.97 }, { x: 35.92, y: -55.9 }, { x: 39.05, y: -52.01 }, { x: 41.23, y: -47.52 }, { x: 42.18, y: -42.62 }, { x: 42.43, y: -37.63 }, { x: 42.43, y: -32.63 }, { x: 42.43, y: -27.63 }, { x: 42.43, y: -22.63 }, { x: 42.43, y: -17.63 }, { x: 42.43, y: -12.63 }, { x: 42.43, y: -7.63 }, { x: 42.43, y: -2.63 }, { x: 42.43, y: 2.37 }, { x: 42.43, y: 7.37 }, { x: 42.43, y: 12.37 }, { x: 42.43, y: 17.37 }, { x: 42.43, y: 22.37 }, { x: 42.43, y: 27.37 }, { x: 42.43, y: 32.37 }, { x: 42.43, y: 37.37 }, { x: 42.43, y: 42.37 }, { x: 42.43, y: 47.37 }, { x: 42.43, y: 52.37 }, { x: 42.43, y: 57.37 }, { x: 42.43, y: 62.37 }]],
	    [[{ x: -0.26, y: -63.1 }, { x: 4.74, y: -63.1 }, { x: 9.74, y: -63.1 }, { x: 14.74, y: -63.1 }, { x: 19.74, y: -63.1 }, { x: 24.68, y: -62.37 }, { x: 29.37, y: -60.65 }, { x: 33.6, y: -58 }, { x: 37.14, y: -54.48 }, { x: 39.96, y: -50.36 }, { x: 41.4, y: -45.58 }, { x: 41.68, y: -40.59 }, { x: 41.68, y: -35.59 }, { x: 41.68, y: -30.59 }, { x: 41.68, y: -25.6 }, { x: 41.68, y: -20.6 }, { x: 41.19, y: -15.63 }, { x: 39.55, y: -10.91 }, { x: 36.55, y: -6.91 }, { x: 32.89, y: -3.5 }, { x: 28.5, y: -1.11 }, { x: 23.56, y: -0.3 }, { x: 18.58, y: 0.14 }, { x: 13.58, y: 0.14 }, { x: 8.58, y: 0.14 }, { x: 3.58, y: 0.14 }, { x: -1.42, y: 0.14 }, { x: -6.42, y: 0.14 }, { x: -11.42, y: 0.14 }, { x: -16.42, y: 0.14 }, { x: -21.42, y: 0.14 }, { x: -26.39, y: -0.43 }, { x: -31.1, y: -2.12 }, { x: -35.01, y: -5.25 }, { x: -38.35, y: -8.98 }, { x: -40.71, y: -13.39 }, { x: -41.86, y: -18.26 }, { x: -42.03, y: -23.26 }, { x: -42.03, y: -28.26 }, { x: -42.03, y: -33.26 }, { x: -42.03, y: -38.26 }, { x: -42.03, y: -43.26 }, { x: -41.18, y: -48.19 }, { x: -38.75, y: -52.56 }, { x: -35.58, y: -56.43 }, { x: -31.79, y: -59.69 }, { x: -27.13, y: -61.5 }, { x: -22.23, y: -62.46 }, { x: -17.25, y: -62.9 }, { x: -12.25, y: -62.9 }, { x: -7.25, y: -62.9 }, { x: -2.25, y: -62.9 }, { x: 2.75, y: -62.9 }], [{ x: -0.26, y: 62.9 }, { x: 4.74, y: 62.9 }, { x: 9.74, y: 62.9 }, { x: 14.74, y: 62.9 }, { x: 19.74, y: 62.9 }, { x: 24.74, y: 62.9 }, { x: 29.57, y: 61.62 }, { x: 33.8, y: 58.96 }, { x: 37.22, y: 55.31 }, { x: 39.74, y: 50.99 }, { x: 41.46, y: 46.28 }, { x: 42.02, y: 41.31 }, { x: 42.02, y: 36.31 }, { x: 42.02, y: 31.31 }, { x: 42.02, y: 26.31 }, { x: 42.02, y: 21.31 }, { x: 41.09, y: 16.39 }, { x: 39.46, y: 11.66 }, { x: 36.31, y: 7.76 }, { x: 32.65, y: 4.34 }, { x: 28.28, y: 1.89 }, { x: 23.57, y: 0.19 }, { x: 18.57, y: -0.07 }, { x: 13.57, y: -0.07 }, { x: 8.57, y: -0.07 }, { x: 3.57, y: -0.07 }, { x: -1.43, y: -0.07 }, { x: -6.43, y: -0.07 }, { x: -11.43, y: -0.07 }, { x: -16.43, y: -0.07 }, { x: -21.43, y: -0.07 }, { x: -26.33, y: 0.96 }, { x: -31.02, y: 2.7 }, { x: -35.05, y: 5.66 }, { x: -38.46, y: 9.32 }, { x: -40.86, y: 13.7 }, { x: -41.97, y: 18.57 }, { x: -41.97, y: 23.57 }, { x: -41.97, y: 28.57 }, { x: -41.97, y: 33.57 }, { x: -41.97, y: 38.56 }, { x: -41.97, y: 43.56 }, { x: -41.11, y: 48.48 }, { x: -39.06, y: 53.03 }, { x: -35.79, y: 56.8 }, { x: -31.93, y: 59.97 }, { x: -27.43, y: 62.12 }, { x: -22.53, y: 63.09 }, { x: -17.53, y: 63.09 }, { x: -12.53, y: 63.09 }, { x: -7.53, y: 63.09 }, { x: -2.53, y: 63.09 }, { x: 2.47, y: 63.09 }]],
	    [[{ x: -42.25, y: 62.63 }, { x: -37.25, y: 62.63 }, { x: -32.25, y: 62.63 }, { x: -27.25, y: 62.63 }, { x: -22.25, y: 62.63 }, { x: -17.25, y: 62.63 }, { x: -12.25, y: 62.63 }, { x: -7.25, y: 62.63 }, { x: -2.25, y: 62.63 }, { x: 2.75, y: 62.63 }, { x: 7.75, y: 62.63 }, { x: 12.75, y: 62.63 }, { x: 17.75, y: 62.63 }, { x: 22.75, y: 62.63 }, { x: 27.69, y: 61.88 }, { x: 32.19, y: 59.71 }, { x: 36.06, y: 56.54 }, { x: 39.02, y: 52.51 }, { x: 40.96, y: 47.9 }, { x: 41.91, y: 42.99 }, { x: 42.24, y: 38 }, { x: 42.24, y: 33 }, { x: 42.24, y: 28 }, { x: 42.24, y: 23 }, { x: 42.24, y: 18 }, { x: 42.24, y: 13 }, { x: 42.24, y: 8 }, { x: 42.24, y: 3 }, { x: 42.24, y: -2 }, { x: 42.24, y: -7 }, { x: 42.24, y: -12 }, { x: 42.24, y: -17 }, { x: 42.24, y: -22 }, { x: 42.24, y: -27 }, { x: 42.24, y: -32 }, { x: 42.24, y: -37 }, { x: 42.24, y: -42 }, { x: 41.3, y: -46.92 }, { x: 39.36, y: -51.54 }, { x: 36.49, y: -55.65 }, { x: 32.83, y: -59.06 }, { x: 28.32, y: -61.23 }, { x: 23.42, y: -62.24 }, { x: 18.43, y: -62.64 }, { x: 13.42, y: -62.64 }, { x: 8.42, y: -62.64 }, { x: 3.42, y: -62.64 }, { x: -1.58, y: -62.64 }, { x: -6.58, y: -62.64 }, { x: -11.58, y: -62.64 }, { x: -16.58, y: -62.64 }, { x: -21.58, y: -62.64 }, { x: -26.53, y: -61.92 }, { x: -31.28, y: -60.35 }, { x: -35.22, y: -57.27 }, { x: -38.52, y: -53.51 }, { x: -40.77, y: -49.05 }, { x: -41.78, y: -44.16 }, { x: -42.07, y: -39.17 }, { x: -42.07, y: -34.17 }, { x: -42.07, y: -29.17 }, { x: -42.07, y: -24.17 }, { x: -42.07, y: -19.17 }, { x: -41.06, y: -14.28 }, { x: -38.78, y: -9.84 }, { x: -35.51, y: -6.07 }, { x: -31.46, y: -3.14 }, { x: -26.88, y: -1.16 }, { x: -22.02, y: -0.01 }, { x: -17.03, y: 0.18 }, { x: -12.03, y: 0.18 }, { x: -7.03, y: 0.18 }, { x: -2.03, y: 0.18 }, { x: 2.97, y: 0.18 }, { x: 7.97, y: 0.18 }, { x: 12.97, y: 0.18 }, { x: 17.97, y: 0.18 }, { x: 22.97, y: 0.18 }, { x: 27.97, y: 0.18 }, { x: 32.97, y: 0.18 }, { x: 37.97, y: 0.18 }]]];
	exports.nums_object = nums_object;


/***/ }
/******/ ]);