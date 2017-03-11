import {LegPos} from './legPos';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: LegPos;
    private lp2: LegPos;
    private lp3: LegPos;
    private lp4: LegPos;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        this.lp = new LegPos(this, 40, 120, -Math.PI / 2 , 0, 10);
        this.lp2 = new LegPos(this, 40, 120, Math.PI / 2 , 20, 10);
        this.lp3 = new LegPos(this, 40, 120, Math.PI / 2, 0, 40);
        this.lp4 = new LegPos(this, 40, 120, -Math.PI / 2, 20, 40);
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
        const bp1 = this.bone[Math.floor(this.currentLength * 0.7)];
        const bp2 = this.bone[Math.floor(this.currentLength * 0.3)];
        const p = this.lp.getPos();
        g.moveTo(bp1.x, bp1.y);
        g.lineTo(p.x, p.y);
        g.drawCircle(p.x, p.y, 5);

        const p2 = this.lp2.getPos();
        g.moveTo(bp1.x, bp1.y);
        g.lineTo(p2.x, p2.y);
        g.drawCircle(p2.x, p2.y, 5);
        if (this.lp3) {
            const p3 = this.lp3.getPos();
            g.moveTo(bp2.x, bp2.y);
            g.lineTo(p3.x, p3.y);
            g.drawCircle(p3.x, p3.y, 5);
            const p4 = this.lp4.getPos();
            g.moveTo(bp2.x, bp2.y);
            g.lineTo(p4.x, p4.y);
            g.drawCircle(p4.x, p4.y, 5);
        }
    }
}