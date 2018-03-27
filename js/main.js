import Timer from './Timer';
import Keyboard from './KeyboardState'
import {loadLevel} from './loaders';
import {createMario} from "./entities";
import {createCollisionLayer} from "./layers";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const input = new Keyboard();
const SPACE = 32;


Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level])=>{
    /*
    * sprites : 背景雪碧图SpriteSheet的实例
    * */
    const timer = new Timer(1/60);
    const gravity = 2000;
    level.entities.add(mario);
    level.comp.layers.push(createCollisionLayer(level));
    // 设置位置和偏移量的初始值
    mario.pos.set(64, 64);
    // mario.vel.set(200, -600);

    createCollisionLayer(level);

    // 每帧更新时候
    timer.update = function(deltaTime) {
        // 先更新合成器里面的
        level.comp.draw(context);

        level.update(deltaTime);
        // 改变vel的y坐标 为重力 * 帧数间隔时间
        mario.vel.y += gravity * deltaTime;
    };

    timer.start();

    input.addMapping(SPACE, keyState => {
        if(keyState){
            mario.Jump.start();
        }
        else{
            mario.Jump.cancel();
        }
    });

    input.addMapping(37, keyState => {
        mario.Go.dir = -keyState;
    });
    input.addMapping(39, keyState => {
        mario.Go.dir = keyState;
    });

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if(event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        })
    });

    input.listenTo(window);

});
