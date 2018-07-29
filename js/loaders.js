import SpriteSheet from './SpriteSheet'
import {createAnim} from "./anim";


// 得到图片HTMLObject
export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img)
        });
        img.src = url;
    })
}

export function loadJSON(url) {
    return fetch(url)
        .then(r => r.json())
}

// 加载精灵对应的皮肤位置 比如 sky 在雪碧图上的位置
// sheetSpec.imageURL 对应皮肤的图片位置
// sheetSpec 定义了各种tile，比如地面的，天空 他们在图片上位置
export function loadSpriteSheet(name) {
    return loadJSON(`/assets/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL),
        ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(
                image,
                sheetSpec.tileW,
                sheetSpec.tileH);
            // 定义所有tile
            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(
                        tileSpec.name,
                        tileSpec.index[0],
                        tileSpec.index[1])
                });
            }
           if(sheetSpec.frames){
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect)
                })
           }

           if(sheetSpec.animations){
                sheetSpec.animations.forEach(animSpec => {
                    const animation = createAnim(animSpec.frames, animSpec.frameLen);
                    sprites.defineAnima(animSpec.name, animation);
                })
           }
            return sprites;
        })
}
