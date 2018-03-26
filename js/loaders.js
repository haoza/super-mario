
// 加载图片
export function loadImage(url){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.addEventListener('load',()=>{
            resolve(img)
        });
        img.src = url;
    })
}
/*
* 请求本地关卡资源
* */
export function loadLevel(name){
    return fetch(`../assets/levels/${name}.json`)
        .then( r => r.json())
}