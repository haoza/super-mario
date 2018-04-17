import Compositor from "./Compositor";
import {Matrix} from "./math";
import TileCollider from "./TileCollider";

/*
 * 关卡类
 * @constructor
 * @gravity {number} 重力
 * @comp {Object} 合成器
 * @entities {Set} Set类型  不重复的数组
 * @tiles {Object} 矩阵
 **/
export default class Level {
    constructor() {
        this.gravity = 2000;
        this.comp = new Compositor();
        this.entities = new Set();
        //此处代表的是 矩阵类
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
    }
    /*
    *  deltaTime 增量时间（每一帧消耗的时间）
    *  遍历entities 执行每个元素的update方法
    *  每个元素的pos x，y 都加上vel * deltaTime
    *  每个元素vel.y += 重力 * 增量时间
    * */
    update(deltaTime) {
        this.entities.forEach(entity => {
            // 先执行mario的update方法，update会执行mario的特征库里面元素的update方法
            entity.update(deltaTime);

            // 改变mario X 的坐标，立刻检查X
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            // 改变mario Y 的坐标，立刻检查Y
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            // 改变vel的y坐标 为重力 * 帧数间隔时间
            entity.vel.y += this.gravity * deltaTime;
        })
    }
}