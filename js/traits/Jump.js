import {Trait, Sides} from '../Entity'

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = 0;
        // 持续时间 速度 参与时间
        this.duration = 0.3;
        //速度
        this.velocity = 200;
        // 参与时间
        this.engageTime = 0;
        //
        this.requestTime = 0;
        // 宽限期
        this.gracePeriod = 0.1;
    }

    get falling() {
        return this.ready < 0
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if(this.ready > 0){
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
        this.ready = 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

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
