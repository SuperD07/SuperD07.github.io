const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 512;
const canvasHeight = canvas.height = 256;

const player = new Player();


const loop = () => {
    player.update();

    window.requestAnimationFrame(loop);
}
loop();