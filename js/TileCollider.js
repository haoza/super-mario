import TileResolver from './TileResolver'

export default class TileCollider {

    constructor(tileMatrix) {
        // 处理一个矩阵的返回类
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        })
    }

    checkY(entity) {
        // mario占据的格子集合
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        // 判断如果不是地面就结束
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            // 向量大于0 mario往下掉
            if (entity.vel.y > 0) {
                // mario最下面的y的坐标  和 当前格子的上面的y坐标比较
                // 意味着 mario掉进地面里面了 则让他的位置出现在地面上  同事不再往下掉 vel = 0
                if (entity.pos.y + entity.size.y > match.y1) {
                    // mario的y坐标 等于 格子上面的y坐标 - mario的高度
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }
            // 往上跳
            // 如果mario占据的格子中地面的下面 大于 mario 的头部位置 说明mario进入的天上的地面上了
            // 让mario位置 等于 格子的下面  vel = 0  vel每帧都会等于 重力 * 每帧消耗的世界

            else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        })
    }

}