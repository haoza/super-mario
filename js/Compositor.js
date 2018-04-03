
/**
 * 合成器
 * @constructor
 * @layers {Array} 层的集合
 **/
export default class Compositor{
    constructor(){
        this.layers = [];
    }
    /*
    * 遍历layers每个元素 执行元素
    * */
    draw(context, camera){
        this.layers.forEach((layer)=>{
            layer(context, camera)
        })
    }
}