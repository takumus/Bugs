import {LegPos} from './legPos';
import {Bug} from '.';
export class Leg {
    private _legPos: LegPos;
    private _length1: number;
    private _length2: number;
    private _bug: Bug;
    private _index: number;
    constructor(
        bug: Bug,
        length1: number,
        length2: number,
        span: number,
        spanOffset: number,
        radius: number,
        rotationOffset: number,
        index: number) {
            this._bug = bug;
            this._index = index;
            this._legPos = new LegPos(bug, span, radius, rotationOffset, spanOffset, index);
    }
    public getPos(): void {
        const fromPos = this._bug.bone[this._index];
        const toPos = this._legPos.getPos();
        const a = fromPos.distance(toPos);
        const b = this._length1;
        const c = this._length2;
        const ra = Math.acos((b * b + c * c - a * a) / (2 * b * c));
        const rb = Math.acos((a * a + c * c - b * b) / (2 * a * c));
        const rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    }
}