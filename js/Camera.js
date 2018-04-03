import {vec2} from './math'

/*
 * 相机
 * @param
 * @constructor
 * @pos {vec2} 位置
 * @size {vec2}  大小
 */
export default class Camera {
    constructor() {
        this.pos = new vec2(0, 0);
        this.size = new vec2(250, 206);
    }
}