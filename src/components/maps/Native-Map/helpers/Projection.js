/**
 * It's a Robison Projection
 *
 * https://en.wikipedia.org/wiki/Robinson_projection
 */


class Projection {

    constructor(width) {

        this.X = [594090, 593258.274, 591357.186, 588149.1, 583515.198, 578049.5700000001, 570326.4, 560048.643, 547513.3439999999, 532423.4580000001, 515610.71099999995, 496065.14999999997, 474440.274, 451330.173, 426913.07399999996, 399941.388, 369108.11699999997, 339938.298, 316174.698]

        this.Y = [0, 58689.82, 117379.64, 176069.46000000002, 234759.28, 293449.10000000003, 352138.92000000004, 410828.74000000005, 470275.848, 527356.431, 584626.336, 640760.3089999999, 695379.706, 748105.883, 798465.5349999999, 845890.696, 889245.434, 923986.021, 946610]

        this.EPS = 1e-8;
        this.INTERVAL = 5;

        this.radians = Math.PI / 180;
        this.degrees = 180 / Math.PI;

        this._width = width;
        this._r = this._width / 5.332539516;
    }

    _project(lat, lng)
    {
        // 5 degree intervals, so find right indices
        let lI = Math.floor((Math.abs(lat)-this.EPS)/this.INTERVAL);
        lI = Math.max(lI, 0);
        let hI = lI + 1;
        let ratio = (Math.abs(lat)-lI*this.INTERVAL) / this.INTERVAL;

        // interpolate x and y
        let xDist = this.X[hI]/700000-this.X[lI]/700000;
        let yDist = this.Y[hI]/700000-this.Y[lI]/700000;

        let x = ((xDist*ratio)+this.X[lI]/700000) * (Math.abs(lng) * this.radians);
        x = lng < 0 ? -x : x;
        let y = (yDist*ratio)+this.Y[lI]/700000;
        y = lat < 0 ? -y : y;

        return {
            x : x,
            y : y
        };
    }

    project(lat, lng) {
        let p = this._project(lat, lng);
        return {
            x: p.x * this._r,
            y: p.y * this._r
        };
    }
}

export default Projection;