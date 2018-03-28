import Compositor from "./Compositor";
import {Matrix} from "./math";
import TileCollider from "./TileCollider";

export default class Level {
    constructor() {
        this.gravity = 2000;

        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
    }
    update(deltaTime) {
        this.entities.forEach(entity => {

            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            // this.tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            // 改变vel的y坐标 为重力 * 帧数间隔时间
            entity.vel.y += this.gravity * deltaTime;
        })
    }
}