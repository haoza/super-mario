
/**
 *  @constructor
 *  @grid {number} 格子集合
 *
 *
 */
export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callback) {
        /*
         * 遍历背景图片数组，
         * */
        this.grid.forEach((column, x) => {
            column.forEach((tile, y) => {
                callback(tile, x, y)
            })
        });
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
