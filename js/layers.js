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

export function createBackgroundLayer(backgrounds, sprites) {
    /*
    *  创建 背景图片 buffer
    *  固定宽高
    * */
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    /*
    * 遍历背景图片数组，
    * */
    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites)
    });

    return function drawBackgroundLayer(context){
        context.drawImage(buffer,0 ,0)
    }
}