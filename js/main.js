import Compositor from './Compositor';
import Timer from './Timer';
import {loadLevel} from './loaders';
import {loadBackgroundSprite} from "./sprites";
import {createBackgroundLayer, createSpriteLayer} from "./layers";
import {createMario} from "./entities";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


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
    const gravity = 50;
    const spriteLayer = createSpriteLayer(mario);
    const backgroundLayer = createBackgroundLayer(level.background, sprites);
    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    mario.pos.set(64, 240);
    mario.vel.set(200, -600);

    timer.update = function(deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    };

    timer.start()
});
