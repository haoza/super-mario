import Compositor from './Compositor';
import Timer from './Timer';
import Keyboard from './KeyboardState'
import {loadLevel} from './loaders';
import {loadBackgroundSprite} from "./sprites";
import {createBackgroundLayer, createSpriteLayer} from "./layers";
import {createMario} from "./entities";
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const input = new Keyboard();
const SPACE = 32;

Promise.all([
    createMario(),
    loadBackgroundSprite(),
    loadLevel('1-1')
]).then(([mario, sprites, level])=>{
    /*
    * sprites : 背景雪碧图SpriteSheet的实例
    * */
    const comp = new Compositor();
    const timer = new Timer(1/60);
    const gravity = 2000;
    const spriteLayer = createSpriteLayer(mario);
    const backgroundLayer = createBackgroundLayer(level.background, sprites);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    // 设置位置和偏移量的初始值
    mario.pos.set(64, 240);
    mario.vel.set(200, -600);

    // 每帧更新时候
    timer.update = function(deltaTime) {
        // 先更新合成器里面的
        comp.draw(context);
        // 调用mario的update方法
        mario.update(deltaTime);
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
    input.listenTo(window);

});
