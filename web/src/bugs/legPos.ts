import {Bug} from '.';
export class LegPos {
    private bug: Bug;
    private span: number;
    private radian: number;
    constructor(bug: Bug, span: number, radian: number) {
        this.bug = bug;
        this.span = span;
        this.radian = radian;
    }
    public getPos() {
        const fid = (this.bug.route.length - this.bug.bone.length) * this.bug.step;
        const iid = Math.floor(fid);
        const n1 = iid % (this.span / 2);
        const n12 = fid % (this.span / 2);
        const n2 = iid % this.span;
        const pid = Math.floor(Math.floor(iid / this.span) * this.span + this.bug.bone.length / 2);
        const p = this._getPos(pid);

        if (n1 < n2) {
            const p = this._getPos(pid);
            const p2 = this._getPos(pid + this.span);
            const dx = (p2.x - p.x) * (n12 / (this.span / 2));
            const dy = (p2.y - p.y) * (n12 / (this.span / 2));
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
        const r = Math.atan2(ty, tx) + Math.PI / 2;
        return new UTILS.Pos(
            Math.cos(r) * this.radian + p1.x,
            Math.sin(r) * this.radian + p1.y
        );
    }
}