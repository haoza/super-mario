// 创建mario实例
import Entity from "./Entity";
import Jump from './traits/Jump'
import Go from './traits/Go'
import {loadSpriteSheet} from "./loaders";
import {createAnim} from "./anim";

// 实例化 Entity 类
export function createMario() {
    // 返回加载mariro的后的 srpite 实例
    //已经定义了 空闲时候的 mario buffer了
    return loadSpriteSheet('mario')
        .then(sprite => {

            const mario = new Entity();

            // mario的大小
            mario.size.set(14, 16);
            // 添加行为  traits 是 Array
            mario.addTrait(new Jump());
            mario.addTrait(new Go());

            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);

            function routeAnim(mario) {
                if(mario.Go.dir !== 0){
                    return runAnim(mario.Go.distance)
                }

                return 'idle'
            }
            // 定义draw方法  绘制一个mario 坐标都是0,0 绘制到context上
            mario.draw = function drawMario(context) {
                sprite.draw(routeAnim(this), context, 0, 0, this.Go.heading < 0);
            };
            // 返回mario实例
            return mario
        })
}