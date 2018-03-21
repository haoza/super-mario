export default class Timer{
    constructor(deltaTime = 1/60) {

        let lastTime = 0;
        let accumulatedTime = 0;

        this.updateProxy = (time) =>{
            accumulatedTime += (time - lastTime) / 1000;
            //当实际帧数消耗累积的时间 超过1/60的时候，进入 while
            while (accumulatedTime > deltaTime){
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue()
    }
}