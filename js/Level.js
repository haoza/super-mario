import Compositor from "./Compositor";
import TileCollider from "./TileCollider";

/**
 * 关卡类
 * @constructor
 * @gravity {number} 重力
 * @comp {Object} 合成器
 * @entities {Set} Set类型  不重复的数组
 * @tiles {Object} 矩阵
 **/
export default class Level {
    constructor() {
        this.gravity = 1500;

        this.totalTime = 0;

        // 合成类，draw方法会遍历 layers里面的每个方法，执行
        // layers的函数在实力和level添加
        this.comp = new Compositor();
        // 实体类
        this.entities = new Set();


        // 检查mario 在 X轴和Y轴 是否运动
        this.tileCollider = null;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    /**
    *  deltaTime 增量时间（每一帧消耗的时间）
    *  遍历entities 执行每个元素的update方法
    *  每个元素的pos x，y 都加上vel * deltaTime
    *  每个元素vel.y += 重力 * 增量时间
    */
    update(deltaTime) {
        this.entities.forEach(entity => {
            // 先执行mario的update方法，update会执行mario的特征库里面元素的update方法
            entity.update(deltaTime);

            // 改变mario X 的坐标，立刻检查X
            // 在检查的函数中，如果mario已经碰到，则给向量vel的y赋值为0 ！！！藏在这儿的
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            // 改变mario Y 的坐标，立刻检查Y
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            // 改变vel的y坐标 为重力 * 帧数间隔时间
            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}