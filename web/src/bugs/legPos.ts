import {Bug} from '.';
export class LegPos {
    constructor(private bug: Bug) {
    }
    public getPos() {
        const span = 40;
        const n = Math.floor((this.bug.route.length - this.bug.bone.length) * this.bug.step);
        const n1 = n % (span / 4);
        const n12 = (this.bug.route.length - this.bug.bone.length) * this.bug.step % (span / 4);
        const n2 = n % (span / 2);
        const id = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bug.bone.length / 2);
        const p = this._getPos(id);
        //g.drawCircle(p.x, p.y, 2);

        const lp = this.bug.bone[this.bug.bone.length / 2]; // this.bug.route[Math.floor(n + this.bug.bone.length / 2)];
        if (n1 < n2) {
            const id = Math.floor(n / (span / 2)) * (span / 2) + Math.floor(this.bug.bone.length / 2);
            const p = this._getPos(id);
            const p2 = this._getPos(id + span / 2);
            const dx = (p2.x - p.x) * (n12 / (span / 4));
            const dy = (p2.y - p.y) * (n12 / (span / 4));
            // g.moveTo(lp.x, lp.y);
            // g.lineTo(p.x + dx, p.y + dy);
            console.log('b : ' + n1);
        }else {
            console.log('a : ' + n1);
            // g.moveTo(lp.x, lp.y);
            // g.lineTo(p.x, p.y);
        }
        // g.moveTo(lp.x, lp.y);
        // g.lineTo(x, y);
    }
    public _getPos(id: number): UTILS.Pos {
        const id2 = id + 1;
        console.log(id2);
        const p1 = this.bug.route[id];
        const p2 = this.bug.route[id2];
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const r = Math.atan2(ty, tx) + Math.PI / 2;
        return new UTILS.Pos(
            Math.cos(r) * 80 + p1.x,
            Math.sin(r) * 80 + p2.y
        );
    }
}