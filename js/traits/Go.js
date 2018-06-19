import {Trait} from '../Entity'

export default class Go extends Trait{
    constructor() {
        super('go');
        // direction  方向  0没有按键  -1左键  1右键
        this.dir = 0;
        // acceleration:促进
        this.acceleration = 400;
        //减速
        this.deceleration = 300;
        // 拖动因子
        this.dragFactor = 1/5000;
        // distance 距离
        this.distance = 0;
        // 头部方向 1右边 -1左边
        this.heading = 1;
    }
    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if(this.dir !== 0){
            entity.vel.x += this.acceleration * deltaTime * this.dir;
            this.heading = this.dir;
        }
        // 不控制mario的时候
        else if(entity.vel.x !== 0){
            // 减速距离，缓动和向量比较
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        }
        else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        this.distance += absX * deltaTime;
    }
}
