import {vec2} from './math'

// 特征基类 实例化的时候传入name 键名NAME
export class Trait {
    constructor(name) {
        this.NAME = name;
    }
    update() {
        console.log('Trait is Update')
    }
}
/*
* 实体类
* 实例化三个属性
* pos vec2实例 当前位置
* vel（vector）  vec2实例 偏移位置
* size  vec2实例 实例的大小 高宽
* traits 特征 array
* */
export default class Entity {
    constructor(){
        this.vel = new vec2(0, 0);
        this.pos = new vec2(0, 0);
        this.size = new vec2(0, 0);

        this.traits = [];
    }
    // 添加特征
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    // 遍历特征数组，执行元素的update方法
    update(deltaTime) {
        // Entity update方法每次都去 遍历 traits ， 并且执行他的update方法
        this.traits.forEach(trait => {
            trait.update(this, deltaTime)
        })
    }
}