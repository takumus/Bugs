import {LegPos} from './legPos';
import {Leg, PosSet} from './leg';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    constructor(length: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
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
    }
    public setRoute(route: ROUTES.Line, nextLength?: number): void {
        super.setRoute(route, nextLength);
    }
}