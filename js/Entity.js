// import {vec2} from './math'
// export const Sides = {
//     TOP:Symbol("top"),
//     BOTTOM:Symbol("bottom"),
// };
// // 特征基类 实例化的时候传入name 键名NAME
// export class Trait {
//     constructor(name) {
//         this.NAME = name;
//     }
//     //子类可以实现该方法
//     obstruct(entity, side){
//
//     }
//     // 子类自己实现该方法
//     update() {
//         console.warn('Unhandled update call in Trait');
//     }
// }
//
//
// /*
// * 实体类
// * 实例化三个属性
// * pos vec2实例 当前位置
// * vel（vector）  vec2实例 偏移位置
// * size  vec2实例 实例的大小 高宽
// * traits 特征 array
// * */
// export default class Entity {
//     constructor(){
//         this.vel = new vec2(0, 0);
//         this.pos = new vec2(0, 0);
//         this.size = new vec2(0, 0);
//
//         this.traits = [];
//     }
//     // 添加特征
//     addTrait(trait) {
//         this.traits.push(trait);
//         this[trait.NAME] = trait;
//     }
//     // 遇到阻碍了
//     obstruct(side){
//         this.traits.forEach(trait => {
//             trait.obstruct(this, side)
//         })
//     }
//
//     // 遍历特征数组，执行元素的update方法
//     update(deltaTime) {
//         // Entity update方法每次都去 遍历 traits ， 并且执行他的update方法
//         this.traits.forEach(trait => {
//             trait.update(this, deltaTime)
//         })
//     }
// }


import {Vec2} from './math.js';
import BoundingBox from './BoundingBox.js';

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
};

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

    }

    update() {
        console.warn('Unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });

        this.lifetime += deltaTime;
    }
}
