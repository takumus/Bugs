import {LegPos} from './legPos';
import {Leg, PosSet} from './leg';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private prevPos: UTILS.Pos;
    private pp: UTILS.Pos;
    private pp2: UTILS.Pos;
    private pid: number;
    private pid2: number;
    private len: number;
    private pStep: number;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        this.prevPos;
        this.len = 0;
        this.pStep = 0;
        this.pid = 0;
        this.pid2 = 0;
        this.pp = new UTILS.Pos();
        this.pp2 = new UTILS.Pos();
    }
    public get graphics(): PIXI.Graphics {
        return this._graphics;
    }
    public render() {
        const g = this._graphics;
        g.clear();
        g.lineStyle(6, 0xff0000);
        for (let i = 0; i < this.currentLength; i ++) {
            const pos = this.bone[i];
            if (i == 0) {
                g.moveTo(pos.x, pos.y);
            }else {
                g.lineTo(pos.x, pos.y);
            }
        };
        if (this.prevPos) this.len += this.prevPos.distance(this.bone[0]) * (this.step > this.pStep ? 1 : -1);
        // console.log(this.bone[0]);
        this.prevPos = this.bone[0].clone();
        this.pStep = this.step;
        const span = 180;
        // console.log(Math.abs(this.pid - this.len) / 120);
        const l1 = this.len;
        if (Math.abs(this.pid - l1) > span) {
            this.pid = l1;
            this.pp = this._getPos(0);
        }
        const l2 = this.len + span / 2;
        if (Math.abs(this.pid2 - l2) > span) {
            this.pid2 = l2;
            this.pp2 = this._getPos(0, -Math.PI / 2);
        }
        g.drawCircle(this.pp.x, this.pp.y, 10);
        g.drawCircle(this.pp2.x, this.pp2.y, 10);
    }
    public _getPos(id: number, o: number = Math.PI / 2): UTILS.Pos {
        id = Math.floor(id);
        const p1 = this.bone[id];
        const p2 = this.bone[id + 1];
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const r = Math.atan2(ty, tx) + o;
        const radius = 100;
        return new UTILS.Pos(
            Math.cos(r) * radius + p1.x,
            Math.sin(r) * radius + p1.y
        );
    }
    public setRoute(route: ROUTES.Line, nextLength?: number): void {
        super.setRoute(route, nextLength);
    }
}