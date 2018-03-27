const PRESSED = 1;
const PELEASED = 0;
/*
*
* */
export default class KeyboardState {
    constructor(){
        // 按键的状态
        this.keyStates = new Map();
        // 存放需要监听的按键 键名： code ，值为fn
        this.keyMap = new Map();
    }
    // 添加Map对象属性
    addMapping(code, callback) {
        this.keyMap.set(code, callback)
    }
    // 触发事件
    // 监听了按键---》 是否需要存放和更新按键状态---》 存放或者更新 ----》 执行按键回调
    handleEvent(event) {
        const { code } = event;
        // 如果在监听事件对象中没有这个键 则结束
        if (!this.keyMap.has(code)) {
            return;
        }
        // 阻止默认事件
        event.preventDefault();
        // 按钮按下 当前按钮状态为按下 1 否则为 0
        const keyState = event.type === 'keydown' ? PRESSED : PELEASED;
        // 当前按键状态和存放中的状态一致，则结束
        if (this.keyStates.has(code) === keyState) {
            return
        }
        // 存放按钮状态 键名为 按钮Code
        this.keyStates.set(code, keyState);
        // 调用当前按键的回调函数 传入按钮状态
        this.keyMap.get(code)(keyState)
     }
    // 开始监听 按键 按下 和 松开两个事件
    // 需要传入上下文
     listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            })
        });
     }
}