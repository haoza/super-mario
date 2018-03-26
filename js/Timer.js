/*
* 构造一个时间函数  传入 增量时间（每一帧消耗的时间）
*
* */
export default class Timer{
    constructor(deltaTime = 1/60) {
        let lastTime = 0;
        // 当前累积时间 只要超过规定每帧消耗的时间 就会进入循环，执行 update 函数
        let accumulatedTime = 0;
        this.updateProxy = (time) =>{
            accumulatedTime += (time - lastTime) / 1000;
            //当实际帧数消耗累积的时间 超过1/60的时候，进入 while
            while (accumulatedTime > deltaTime){
                // update在实例化过后添加
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
        }
    }

    enqueue() {
        // setTimeout(this.updateProxy, 10, performance.now())
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue()
    }
}