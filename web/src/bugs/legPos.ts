import {Bug} from '.';
export class LegPos {
    private bug: Bug;
    private span: number;
    private radius: number;
    private radianOffset: number;
    private spanOffset: number;
    private _id: number;
    constructor(bug: Bug, span: number, radius: number, radianOffset: number, spanOffset: number) {
        this.bug = bug;
        this.span = span;
        this.radius = radius;
        this.radianOffset = radianOffset;
        this.spanOffset = spanOffset;
    }
    public getPos() {
        const fid = (this.bug.route.length - this.bug.currentLength) * this.bug.step + this.spanOffset;
        const iid = Math.floor(fid);
        const n1 = iid % (this.span / 2);
        const n1f = fid % (this.span / 2);
        const n2 = iid % this.span;
        const pid = Math.floor(Math.floor(iid / this.span) * this.span + this.bug.currentLength / 2) - this.spanOffset;
        console.log(pid);
        const p = this._getPos(pid);
        this._id = pid;
        if (n1 < n2) {
            const p = this._getPos(pid);
            const p2 = this._getPos(pid + this.span);
            const dx = (p2.x - p.x) * (n1f / (this.span / 2));
            const dy = (p2.y - p.y) * (n1f / (this.span / 2));
            // console.log('b : ' + n1);
            p.x += dx;
            p.y += dy;
            return p;
        }else {
            // console.log('a : ' + n1);
        }
        return p;
    }
    public _getPos(id: number): UTILS.Pos {
        const p1 = this.bug.route[id];
        let p2 = this.bug.route[id + 1];
        if (!p2) p2 = this.bug.route[id - 1];
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const r = Math.atan2(ty, tx) + this.radianOffset;
        return new UTILS.Pos(
            Math.cos(r) * this.radius + p1.x,
            Math.sin(r) * this.radius + p1.y
        );
    }
    public get id(): number {
        return this._id;
    }
}