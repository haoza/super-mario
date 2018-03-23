import {Trait} from '../Entity'

export default class Velocity extends Trait{
    constructor() {
        super('Velocity');
    }
    update(entity, deltaTime) {
        // mario的位置是position，每次更新都会加上 vel 中的坐标
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}
