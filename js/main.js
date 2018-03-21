import Compositor from './Compositor'
import {loadLevel} from './loaders';
import {loadBackgroundSprite, loadMarioSprite} from "./sprites";
import {createBackgroundLayer} from "./layers";

function createSpriteLayer(sprite, pos){
    return function drawSpriteLayer(){
        sprite.draw('idle', context, pos.x, pos.y)
    }
}
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprite(),
    loadLevel('1-1')
]).then(([marioSprite, sprites, level])=>{
    /*
    * sprites : 背景雪碧图SpriteSheet的实例
    * */
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.background, sprites);
    comp.layers.push(backgroundLayer);

    let pos = {
        x:64,
        y:64
    };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);
    function update(){
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update)
    }
    update()
});
