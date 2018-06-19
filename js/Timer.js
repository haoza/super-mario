/*
* 构造一个时间函数  传入 增量时间（每一帧消耗的时间）
*
* */
export default class Timer{
    constructor(deltaTime = 1/60) {
        // 上一次的时间
        let lastTime = 0;
        // 当前累积时间 只要超过规定每帧消耗的时间 就会进入循环，执行 update 函数
        let accumulatedTime = 0;

        this.updateProxy = (time) =>{
            accumulatedTime += (time - lastTime) / 1000;  //得到的是s
            // 超过1s
            if(accumulatedTime > 1){
                accumulatedTime = 1;
            }

            //当实际帧数消耗累积的时间 超过1/60的时候，进入 while
            // 比如是设定每秒30帧，浏览器是每秒60帧，那么 第一次进来 accumulatedTime 为1/60
            // 不会执行update 再次执行队列函数
            while (accumulatedTime > deltaTime){
                // update在实例化过后添加
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue();
        }
    }
    // 排队
    enqueue() {
        // setTimeout(this.updateProxy, 10, performance.now())
        // 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
        // 该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue()
    }
}