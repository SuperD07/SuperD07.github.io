const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 512;
const canvasHeight = canvas.height = 256;

const player = new Player({
    initialPosition: new Vector(100, 100),
    initialVelocity: new Vector(0, 0),
    hitbox: new Hitbox(50, 150),
});


const loop = () => {
    player.update();

    window.requestAnimationFrame(loop);
}
loop();