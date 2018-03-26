/*
*  传入一个背景图片对象，通过两个嵌套的for循环绘制 范围（ranges）
*  绘制实现：通过传入的sprite 实例上的drawTile的方法
* */

function drawBackground(background, context, sprite){
    background.ranges.forEach(([x1, y1, x2, y2])=>{
        for(let x = x1; x < y1; x++ ){
            for(let y = x2; y < y2; y++ ){
                sprite.drawTile(background.tile, context, x, y);
            }
        }
    })
}
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
    buffer.width = 400;
    buffer.height = 360;

    const context = buffer.getContext('2d');
    /*
    * 遍历背景图片数组，
    * */
    level.tiles.grid.forEach((column, x) => {
       column.forEach((tile, y) => {
           sprites.drawTile(tile.name, context, x, y);
       })
    });
    return function drawBackgroundLayer(context){
        context.drawImage(buffer,0 ,0)
    }
}
/*
* 传入实体
* return 一个函数 传入上下文 buffer
* 实体执行 draw 函数  就是mario精灵执行 draw函数 把mario 绘制到 上下文buffer上
*
* */
export function createSpriteLayer(entities){
    return function drawSpriteLayer(context){
        entities.forEach(entity => {
          entity.draw(context)
        })
    }
}
