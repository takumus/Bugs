import {Bug} from './bugs';
let renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage: PIXI.Container = new PIXI.Container();
let canvas: HTMLCanvasElement;
let stageWidth: number = 0, stageHeight: number = 0;
const mouse: UTILS.Pos = new UTILS.Pos();
const props = {
    time: 900,
    delay: 200,
    S: 0.27,
    V: 0.80
}
function initBugs(): void {
    const guide = new ROUTES.Debugger();
    guide.setOption(0xCCCCCC, 1, false, false);
    stage.addChild(guide);
    const bug = new Bug(50);
    stage.addChild(bug.graphics);

    let pVecPos: UTILS.VecPos = new UTILS.VecPos(200, 200, 0);
    const next = () => {
        const nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 100 - 50, stageHeight / 2 + Math.random() * 100 - 50, Math.PI * 2 * Math.random());
        const route = ROUTES.RouteGenerator.getMinimumRoute(
            bug.getHeadVecPos(),
            nVecPos,
            200,
            200,
            5
        ).wave(20, 0.1);
        while (route.length % 50 != 0) {
            route.pop();
        }
        if (route.length == 0) {
            next();
            return;
        }
        pVecPos = nVecPos;
        guide.clear();
        guide.render(route);
        bug.setRoute(bug.getCurrentLine().pushLine(route));
        new TWEEN.Tween({s: 0})
        .to({s: 1}, 4000)
        .onUpdate(function(): void {
            bug.setStep(this.s);
            bug.render();
        })
        .onComplete(function(): void {
            // next();
        })
        .start();
    }
    next();
    window.addEventListener('mousedown', () => {
        next();
    })
}
function initGUI(): void {
    const gui = new dat.GUI();
    gui.add(props, 'S', 0, 1);
    gui.add(props, 'V', 0, 1);
}
function initPIXI(): void {
    renderer = PIXI.autoDetectRenderer(800, 800, {antialias: false, resolution: 2, transparent: false, backgroundColor: 0xFFFFFF});
    canvas = <HTMLCanvasElement>document.getElementById('content');
    canvas.appendChild(renderer.view);
    renderer.view.style.width = '100%';
    renderer.view.style.height = '100%';
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
}
function init(): void {
    const color = new UTILS.Color(0xffffff);
    initGUI();
    initPIXI();
    draw();
    resize();
    initBugs();
}
function draw(): void {
    requestAnimationFrame(draw);
    TWEEN.update();
    renderer.render(stage);
}
function resize(): void {
    stageWidth = canvas.offsetWidth;
    stageHeight = canvas.offsetHeight;
    renderer.resize(stageWidth, stageHeight);
}
window.onload = init;