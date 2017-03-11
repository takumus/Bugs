import {LegPos} from './legPos';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: LegPos;
    private lp2: LegPos;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        this.lp = new LegPos(this, 40, 80, -Math.PI / 2, 0);
        this.lp2 = new LegPos(this, 40, 80, Math.PI / 2, 20);
    }
    public get graphics(): PIXI.Graphics {
        return this._graphics;
    }
    public render() {
        const g = this._graphics;
        g.clear();
        g.lineStyle(6, 0xff0000);
        this.bone.forEach((pos, id) => {
            if (id == 0) {
                g.moveTo(pos.x, pos.y);
            }else {
                g.lineTo(pos.x, pos.y);
            }
        });
        const p = this.lp.getPos();
        g.moveTo(this.bone[this.bone.length / 2].x, this.bone[this.bone.length / 2].y);
        g.lineTo(p.x, p.y);
        g.drawCircle(p.x, p.y, 5);

        const p2 = this.lp2.getPos();
        g.moveTo(this.bone[this.bone.length / 2].x, this.bone[this.bone.length / 2].y);
        g.lineTo(p2.x, p2.y);
        g.drawCircle(p2.x, p2.y, 5);

        const pp = this.route[this.lp.id];
        g.drawCircle(pp.x, pp.y, 10);

        const pp2 = this.route[this.lp2.id];
        g.drawCircle(pp2.x, pp2.y, 10);
    }
}