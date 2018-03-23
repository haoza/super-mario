import {Trait} from '../Entity'

export default class Jump extends Trait{
    constructor() {
        super('Jump');
        // 持续时间 速度 参与时间
        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;
    }
    update(entity, deltaTime) {
       if (this.engageTime > 0){
           entity.vel.y = -this.velocity;
           this.engageTime -= deltaTime;
       }
    }

    start(){
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
    }
}
