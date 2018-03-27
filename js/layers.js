/*
* 创建一个背景buffer对象，给背景buffer 绘制 关卡瓦片
* 返回一个函数 需要传入上下文 把背景buffer绘制到上下文中
* */
export function createBackgroundLayer(level, sprites) {
    /*
    *  创建 背景图片 buffer
    *  固定宽高
    * */
    const buffer = document.createElement('canvas');
    buffer.width = 1400;
    buffer.height = 360;

    const context = buffer.getContext('2d');
    /*
    * 遍历背景图片数组，
    * */
    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);

    });
    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y)
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