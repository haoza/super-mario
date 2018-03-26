import SpriteSheet from './SpriteSheet';
import {loadImage} from './loaders';
/*加载mario雪碧图*/
export function loadMarioSprite(){
    return loadImage('../assets/img/characters.gif').then(image=>{
        const sprites = new SpriteSheet(image, 16, 16);
        // 创建正常状态的mario
        sprites.define('idle', 276, 44, 16, 16);
        return sprites
    });
}

/*加载bg雪碧图*/
export function loadBackgroundSprite(){
    return loadImage('../assets/img/tiles.png').then(image=>{
        // 实例化精灵对象
        const sprites = new SpriteSheet(image, 16, 16);
        // 定义天空和地面的瓦片
        sprites.defineTile('group', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites
    });
}