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
        const span = 40;
        const n = Math.floor((this.route.length - this.bone.length) * this.step);
        const n1 = n % (span / 2);
        const n2 = n % span;
        const id = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bone.length / 2);
        const id2 = id + 1;
        const p1 = this.route[id];
        const p2 = this.route[id2];
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const r = Math.atan2(ty, tx) + Math.PI / 2;
        const x = Math.cos(r) * 40 + p1.x;
        const y = Math.sin(r) * 40 + p2.y;
        g.drawCircle(x, y, 2);

        const lp = this.route[Math.floor(n + this.bone.length / 2)];
        if (n1 < n2) {
            const id = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bone.length / 2) - span / 2;
            const id2 = id + 1;
            const p1 = this.route[id];
            const p2 = this.route[id2];
            const tx = p2.x - p1.x;
            const ty = p2.y - p1.y;
            const r = Math.atan2(ty, tx) + Math.PI / 2;
            const x2 = Math.cos(r) * 40 + p1.x;
            const y2 = Math.sin(r) * 40 + p2.y;
            const dx = (x - x2) * (n1 / (span / 2));
            const dy = (y - y2) * (n1 / (span / 2));
            g.moveTo(x2, y2);
            g.lineTo(x2 + dx, y2 + dy);
            console.log('b : ' + n1);
        }else {
            console.log('a : ' + n1);
            g.moveTo(lp.x, lp.y);
            g.lineTo(x, y);
        }
    }
}