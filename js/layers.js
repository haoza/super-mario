/*
* 创建一个背景buffer对象，给背景buffer 绘制 关卡瓦片
* 返回一个函数 需要传入上下文 把背景buffer绘制到上下文中
* */
export function createBackgroundLayer(level, sprites) {
    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;
    /*
    *  创建 背景图片 buffer
    *  固定宽高
    * */

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 360;

    const context = buffer.getContext('2d');


    let startIndex, endIndex;


    function renderRaw(drawFrom, drawTo) {
        if(drawFrom === startIndex && drawTo === endIndex){
            return;
        }

        startIndex = drawFrom;
        endIndex = drawTo;

        for (let x = startIndex; x < endIndex; ++x){
            const col = tiles.grid[x];
            if(col){
                col.forEach((tile, y) => {
                    sprites.drawTile(tile.name, context, x - startIndex, y)
                })
            }
        }
    }
    
    
    /*
    * 遍历背景图片数组，绘制在buffer上
    * */
    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);

    });
    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        renderRaw(drawFrom, drawTo);

        context.drawImage(buffer,
            -camera.pos.x % 16,
            -camera.pos.y)
    }
}

/*
* 传入实体
* return 一个函数 传入上下文 buffer
* 实体执行 draw 函数  就是mario精灵执行 draw函数 把mario 绘制到 上下文buffer上
*
* */
export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');
    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y)
        })
    }
}


export function createCollisionLayer(level) {

    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y)
    };

    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize, tileSize);
            context.stroke();
        });
        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke()
        });
        resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDarw) {
    return function drawCameraRect(context, formCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDarw.pos.x - formCamera.pos.x,
            cameraToDarw.pos.y - formCamera.pos.y,
            cameraToDarw.size.x,
            cameraToDarw.size.y);
        context.stroke()
    }
}