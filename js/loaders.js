
export function loadImage(url){
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.addEventListener('load',()=>{
            resolve(img)
        });
        img.src = url;
    })
}

export function loadLevel(name){
    return fetch(`../assets/levels/${name}.json`)
        .then( r => r.json())
}