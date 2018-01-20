class Circles {

    constructor() {
        this.cells = {};
    }

    inc(cell) {
        if (!this.cells[cell.cellId])
            this.cells[cell.cellId] = 0;

        this.cells[cell.cellId]++;
    }

    del(cell) {

        if (!this.cells[cell.cellId]) this.cells[cell.cellId] = 0;

        if (this.cells[cell.cellId] > 0) return --this.cells[cell.cellId];

        return 0;
    }

    get(cell) {
        return this.cells[cell.cellId] || 0;
    }
    
}

export default Circles;