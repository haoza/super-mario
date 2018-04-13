/*
* resolver : 解决 matrix : 矩阵
* 检查点的矩阵坐标
* 返回范围的里面的tile
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
    /**
     * @param pos1 x左边坐标 (x1)
     * @param pos2 x右边坐标 (x2)
     * @returns pos1 到 pos2 经过的所有格子的坐标点
    * */
    toIndexRange(pos1, pos2){
        // pMax x2的占据的格子的右边的坐标
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];  //范围
        let pos = pos1;

        // 把x1到x2之间的格子坐标全部记录下来
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        }
        while (pos < pMax);

        // 返回所有的坐标
        return range;
    }
    // 返回矩阵中某个格子他的tile和坐标
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
    // return 这个范围里面所有的tile
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
        // 返回某个返回内所有的tile集合
        return matches
    }
}
