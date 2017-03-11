import {LegPos} from './legPos';
import {Leg} from './leg';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: Leg;
    private lp2: Leg;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        this.lp = new Leg(this, true, 120, 120, 80, 40, 100, -Math.PI / 2, 0);
        this.lp2 = new Leg(this, false, 120, 120, 80, 0, 100, Math.PI / 2, 0);
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
        const id1 = Math.floor(this.currentLength * 0.1);
        const id2 = Math.floor(this.currentLength * 0.9);
        this.lp.legPos.beginOffset = this.lp2.legPos.beginOffset = id1;
        const bp1 = this.bone[id1];
        const bp2 = this.bone[id2];
        const p = this.lp.getPos();
        g.moveTo(p.begin.x, p.begin.y);
        g.lineTo(p.middle.x, p.middle.y);
        g.lineTo(p.end.x, p.end.y);

        const p2 = this.lp2.getPos();
        g.moveTo(p2.begin.x, p2.begin.y);
        g.lineTo(p2.middle.x, p2.middle.y);
        g.lineTo(p2.end.x, p2.end.y);
    }
}