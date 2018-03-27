import Keyboard from "./KeyboardState";

export function setupKeyboard(entity) {

    const input = new Keyboard();
    input.addMapping('Space', keyState => {
        if(keyState){
            entity.Jump.start();
        }
        else{
            entity.Jump.cancel();
        }
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.Go.dir = -keyState;
    });
    input.addMapping('ArrowRight', keyState => {
        entity.Go.dir = keyState;
    });


    return input
}