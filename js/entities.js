// 创建mario实例
import Entity  from "./Entity";
import Jump from './traits/Jump'
import Go from './traits/Go'
import {loadMarioSprite} from "./sprites";

// 创建mario


export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);
        // 添加行为
        mario.addTrait(new Jump());
        mario.addTrait(new Go());
        // 定义draw方法  绘制一个mario
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        };
        return mario
    })
}