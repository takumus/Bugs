import {LegPos} from './legPos';
import {Leg, PosSet} from './leg';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: Leg;
    private lp2: Leg;
    private lp3: Leg;
    private lp4: Leg;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        const scale = 0.4;
        this.lp = new Leg(this, false, 100 * scale, 100 * scale, 50 * scale, 25 * scale, 180 * scale, -Math.PI / 2 + 1, 0);
        this.lp2 = new Leg(this, true, 100 * scale, 100 * scale, 50 * scale, 0 * scale, 180 * scale, Math.PI / 2 - 1, 0);
        this.lp3 = new Leg(this, true, 100 * scale, 120 * scale, 50 * scale, 10 * scale, 120 * scale, -Math.PI / 2 - 0.8, 0);
        this.lp4 = new Leg(this, false, 100 * scale, 120 * scale, 50 * scale, 35 * scale, 120 * scale, Math.PI / 2 + 0.8, 0);
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
        this.lp.index = this.lp2.index = Math.floor(this.currentLength * 0.15);
        this.lp3.index = this.lp4.index = Math.floor(this.currentLength * 0.4);

        this.renderP(this.lp.getPos());
        this.renderP(this.lp2.getPos());
        this.renderP(this.lp3.getPos());
        this.renderP(this.lp4.getPos());
    }
    private renderP(p: PosSet): void {
        const g = this._graphics;
        g.moveTo(p.begin.x, p.begin.y);
        g.lineTo(p.middle.x, p.middle.y);
        g.lineTo(p.end.x, p.end.y);
    }
}