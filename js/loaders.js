// 加载图片
import {createBackgroundLayer, createSpriteLayer} from "./layers";
import Level from "./Level";
import SpriteSheet from './SpriteSheet'


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

function loadJSON(url) {
    return fetch(url)
        .then(r => r.json())
}

function createTiles(level, backgrounds) {

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type,
                })
            }
        }
    }


    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen)
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1)
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1)
            }
        })
    })
}

// 加载精灵对应的皮肤位置 比如 sky 在雪碧图上的位置
// sheetSpec.imageURL 对应皮肤的图片位置
// sheetSpec 定义了各种tile，比如地面的，天空 他们在图片上位置
function loadSpriteSheet(name) {
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
            sheetSpec.tiles.forEach(tileSpec => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.index[0],
                    tileSpec.index[1])
            });
            return sprites;
        })
}

/*
* 请求本地关卡资源
* */
export function loadLevel(name) {
    // levelSpec 就是 一个 json对象
    // levelSpec.spriteSheet 名称
    return loadJSON(`/assets/levels/${name}.json`).then(levelSpec =>
             Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet)
            ])
    ).then(([levelsSpec, backgroundSprites]) => {
        let level = new Level();
        createTiles(level, levelsSpec.background);
        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
        return level
    })
}