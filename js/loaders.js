// 加载图片
import {createBackgroundLayer, createSpriteLayer} from "./layers";
import Level from "./Level";
import {loadBackgroundSprite} from "./sprites";

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img)
        });
        img.src = url;
    })
}

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, y1, x2, y2]) => {
            for(let x = x1; x < y1; x++ ){
                for(let y = x2; y < y2; y++ ){
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                }
            }
        })
    })
}


/*
* 请求本地关卡资源
* */
export function loadLevel(name) {
    return Promise.all([
        fetch(`../assets/levels/${name}.json`)
            .then(r => r.json()),
        loadBackgroundSprite()
    ]).then(([levelsSpec, backgroundSprites]) => {
        let level = new Level();

        createTiles(level, levelsSpec.background);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
        return level
    })
}