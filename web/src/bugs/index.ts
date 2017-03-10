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
        this.bone.forEach((pos, id) => {
            if (id == 0) {
                g.moveTo(pos.x, pos.y);
            }else {
                g.lineTo(pos.x, pos.y);
            }
        });
        const n1 = Math.floor((this.route.length - this.bone.length) * this.step) % 20;
        const n2 = Math.floor((this.route.length - this.bone.length) * this.step) % 40;
        if (n1 < n2) {
            console.log('b : ' + n1);
        }else {
            console.log('a : ' + n1);
        }
    }
}