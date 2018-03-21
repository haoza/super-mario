import SpriteSheet from './SpriteSheet';
import {loadImage} from './loaders';
/*加载mario雪碧图*/
export function loadMarioSprite(){
    return loadImage('../assets/img/characters.gif').then(image=>{
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites
    });
}

/*加载bg雪碧图*/
export function loadBackgroundSprite(){
    return loadImage('../assets/img/tiles.png').then(image=>{
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('group', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites
    });
}