// 层级合成
/*
 * 构造一个数组
 * draw : 遍历执行layers中的每个元素 需要传入 context
 *
 * */
export default class Compositor{
    constructor(){
        this.layers = [];
    }
    draw(context, camera){
        this.layers.forEach((layer)=>{
            layer(context, camera)
        })
    }
}