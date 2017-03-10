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
        g.lineStyle(2, 0xff0000);
        this.bone.forEach((pos, id) => {
            if (id == 0) {
                g.moveTo(pos.x, pos.y);
            }else {
                g.lineTo(pos.x, pos.y);
            }
        });
    }
}