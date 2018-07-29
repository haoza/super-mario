import Timer from './Timer';
import {loadLevel} from './loaders/level';
import {createMario} from "./entities";
// import {createCollisionLayer, createCameraLayer} from "./layers";
import {setupKeyboard} from './input'
import Camera from "./Camera";
import {setupMouseControl} from "./debug";

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
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {

    const timer = new Timer(1 / 60);
    const camera = new Camera();
    level.entities.add(mario);

    // 设置位置和偏移量的初始值
    mario.pos.set(64, 64);

    // 每帧更新时候
    timer.update = function (deltaTime) {

        // 更新关卡
        level.update(deltaTime);

        //改变camera的坐标
        if(mario.pos.x > 100){
            camera.pos.x = mario.pos.x - 100;
        }

        // 更新合成器里面的
        level.comp.draw(context, camera);

    };

    timer.start();


    // debug 给canvas添加事件监听
    setupMouseControl(canvas, mario, camera);
    setupKeyboard(mario).listenTo(window);

});
