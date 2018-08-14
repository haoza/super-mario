import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

/**
 * 创建 mario和 加载关卡结束后，把mario添加到关卡的实例的entities中
 * 设置mario的初始位置， 给Timer添加 update方法。每次刷新的执行
 *   1、执行level的 update方法  该方法会遍历 level的 entities 每个entity 并且执行 entity的 update方法，改变 x。y数值并并检测碰撞。最后改变 向量的 y值
 *   2、更新camera的坐标
 *   3、更新level的Comp中的layer层
 * */
Promise.all([
    loadEntities(),
    loadLevel('1-1'),
]).then(([entity, level]) => {

    const camera = new Camera();
    window.camera = camera;

    const mario = entity.mario();
    mario.pos.set(64, 64);

    const goomba = entity.goomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);


    const koopa = entity.koopa();
    koopa.pos.x = 260;
    level.entities.add(koopa);


    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1/60);
    // 每帧更新时候
    timer.update = function update(deltaTime) {
        // 更新关卡
        level.update(deltaTime);
        //改变camera的坐标
        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }
        // 更新合成器里面的
        level.comp.draw(context, camera);
    }

    timer.start();
});
