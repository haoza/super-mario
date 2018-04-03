import SpriteSheet from './SpriteSheet';
import {loadImage} from './loaders';
/*加载mario雪碧图*/
export function loadMarioSprite(){
    return loadImage('/assets/img/characters.gif').then(image=>{
        const sprites = new SpriteSheet(image, 16, 16);
        // 创建正常状态的 mario
        // 一个canvas对象存放在 实例上的 tiles Map对象上
        sprites.define('idle', 276, 44, 16, 16);
        return sprites
    });
}
