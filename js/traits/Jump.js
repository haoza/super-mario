import {Trait, Sides} from '../Entity'

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = 0;
        // 持续时间 速度 参与时间
        this.duration = 0.3;
        // 速度
        this.velocity = 200;
        // 参与时间
        this.engageTime = 0;
        // 请求时间
        this.requestTime = 0;
        // 宽限期
        this.gracePeriod = 0.1;
    }

    get falling() {
        return this.ready < 0
    }
    /**
    *  每次更新都重置ready为0
     * 在地面上的时候ready为-1
    * */
    update(entity, deltaTime) {

        // 大于0，需要判断mario是否需要运动
        if (this.requestTime > 0) {
            //mario在地面上站着
            if(this.ready < 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }
        // mario在空中的持续时间
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
        this.ready = 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }
    // 遇到阻碍
    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready--;
        }
        else if (side === Sides.TOP) {
            this.cancel();
        }
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
}
