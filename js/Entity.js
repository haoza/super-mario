import {vec2} from './math'

export default class Entity {
    constructor(){
        this.vel = new vec2(0, 0);
        this.pos = new vec2(0, 0);
    }
}