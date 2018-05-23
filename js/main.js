import Timer from './Timer';
import {loadLevel} from './loaders';
import {createMario} from "./entities";
// import {createCollisionLayer, createCameraLayer} from "./layers";
import {setupKeyboard} from './input'
import Camera from "./Camera";
import {setupMouseControl} from "./debug";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {

    const timer = new Timer(1 / 60);
    const camera = new Camera();
    level.entities.add(mario);
    //
    // level.comp.layers.push(
    //     createCollisionLayer(level),
    //     createCameraLayer(camera));
    // 设置位置和偏移量的初始值
    mario.pos.set(64, 64);
    // mario.vel.set(200, -600);
    // 每帧更新时候
    timer.update = function (deltaTime) {

        // 更新关卡
        level.update(deltaTime);

        if(mario.pos.x > 100){
            camera.pos.x = mario.pos.x - 100;
        }

        // 先更新合成器里面的
        level.comp.draw(context, camera);
    };

    timer.start();


    // debug 给canvas添加事件监听
    setupMouseControl(canvas, mario, camera);
    setupKeyboard(mario).listenTo(window);

});
