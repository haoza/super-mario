/*
* resolver : 解决 matrix : 矩阵
*
* */

export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        // Matrix 的实例
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    //得到这个点是在哪个矩阵块中 左边的点  起点
    toIndex(pos) {
        return Math.floor(pos / this.tileSize)
    }
    // 第二个参数为格子终点的位置
    toIndexRange(pos1, pos2){
        // pMax 占据格子的右边的 （终点）坐标
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];  //范围
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        }
        while (pos < pMax);
        return range;
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        const x1 = indexX * this.tileSize;
        const x2 = x1 + this.tileSize;
        const y1 = indexY * this.tileSize;
        const y2 = y1 + this.tileSize;
        if(tile){
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }
    // x1 mario的x坐标 x2 mario右边的x坐标 y同理
    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if(match){
                    matches.push(match)
                }
            })
        });

        return matches
    }
}
