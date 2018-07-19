// 创建mario实例
import Entity from "./Entity";
import Jump from './traits/Jump'
import Go from './traits/Go'
import {loadSpriteSheet} from "./loaders";
import {createAnim} from "./anim";

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

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

            mario.go.dragFactor = SLOW_DRAG;

            // 速度切换 涡轮增压
            mario.turbo = function setTurboState(turboOn) {
                this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
            }

            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 6);

            function routeFrame(mario) {
                // 是否正在往下落
                if(mario.jump.falling){
                    return "jump"
                }
                if(mario.go.distance > 0){
                    // 按键方向和向量的增量方向相反 则break
                    if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                        return "break"
                    }
                    return runAnim(mario.go.distance);
                }

                return 'idle'
            }
            // 定义draw方法  绘制一个mario 坐标都是0,0 绘制到context上
            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
            }
            // 返回mario实例
            return mario
        })
}