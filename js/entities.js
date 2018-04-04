// 创建mario实例
import Entity  from "./Entity";
import Jump from './traits/Jump'
import Go from './traits/Go'
import {loadMarioSprite} from "./sprites";



// 实例化 Entity 类
export function createMario() {
    // 返回加载mariro的后的 srpite 实例
    //已经定义了 空闲时候的 mario buffer了
    return loadMarioSprite().then(sprite => {

        const mario = new Entity();

        // mario的大小
        mario.size.set(14, 16);
        // 添加行为  traits 是 Array
        mario.addTrait(new Jump());
        mario.addTrait(new Go());

        // 定义draw方法  绘制一个mario 坐标都是0,0 绘制到context上
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        };
        // 返回mario实例
        return mario
    })
}