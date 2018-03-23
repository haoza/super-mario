import {vec2} from './math'

export class Trait {
    constructor(name) {
        this.NAME = name;
    }
    update() {
        console.log('Trait is Update')
    }
}

export default class Entity {
    constructor(){
        this.vel = new vec2(0, 0);
        this.pos = new vec2(0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        // Entity update方法每次都去 遍历 traits ， 并且执行他的update方法
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}