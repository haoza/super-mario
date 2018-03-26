// 创建mario实例
import Entity  from "./Entity";
import Jump from './traits/Jump'
import Velocity from './traits/Velocity'
import {loadMarioSprite} from "./sprites";

// 创建mario


export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();
        // 添加行为
        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());
        // 定义draw方法  绘制一个mario
        mario.draw = function drawMario(context) {
            // console.log('mario 绘制坐标 ： '+mario.pos.x, mario.pos.y);
            sprite.draw('idle', context, mario.pos.x, mario.pos.y);
            // var node = document.createElement("canvas");
            // node.height = 20;
            // node.width = 20;
            // node.getContext('2d').drawImage(sprite.tiles.get('idle'),0,0);
            // document.getElementById('dev').appendChild(node)
        };
        return mario
    })
}