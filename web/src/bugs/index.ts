import {LegPos} from './legPos';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: LegPos;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        this.lp = new LegPos(this, 40, 80);
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
    }
}