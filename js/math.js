
/*
* 矩阵
* */
export class Matrix {
    constructor() {
        this.grid = [];
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y]
        }
        return undefined;
    }
}


/*
* vector 向量
*
* */
export class vec2 {
    constructor(x, y) {
        this.set(x, y)
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
