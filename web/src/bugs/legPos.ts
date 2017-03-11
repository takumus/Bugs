import {Bug} from '.';
export class LegPos {
    public bug: Bug;
    public span: number;
    public radius: number;
    public radianOffset: number;
    public spanOffset: number;
    public beginOffset: number;
    private _id: number;
    private _baseId: number;
    constructor(bug: Bug, span: number, radius: number, radianOffset: number, spanOffset: number, beginOffset: number) {
        this.bug = bug;
        this.span = span;
        this.radius = radius;
        this.radianOffset = radianOffset;
        this.spanOffset = spanOffset % span;
        this.beginOffset = beginOffset + 2000;
        this._baseId = 0;
    }
    public getPos() {
        this._baseId = (this.bug.route.length - this.bug.currentLength) * this.bug.step;
        const fid = this._baseId + this.spanOffset;
        const nf = fid % (this.span / 2);
        const pid = Math.floor(Math.floor(fid / this.span) * this.span - this.spanOffset + (this.bug.currentLength - this.beginOffset));
        const pos = this._getPos(pid);
        this._id = pid;
        if (nf < fid % this.span) {
            const ppos = this._getPos(pid + this.span);
            let p = (Math.cos(nf / (this.span / 2) * Math.PI - Math.PI) + 1) / 2;
            // p = nf / (this.span / 2);
            pos.x += (ppos.x - pos.x) * p;
            pos.y += (ppos.y - pos.y) * p;
            return pos;
        }
        return pos;
    }
    public _getPos(id: number): UTILS.Pos {
        id = Math.floor(id);
        if (id < 0) id = 0;
        if (id >= this.bug.route.length - 1) id = this.bug.route.length - 2;
        const p1 = this.bug.route[id];
        const p2 = this.bug.route[id + 1];
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
    public get baseId(): number {
        return this._baseId;
    }
}