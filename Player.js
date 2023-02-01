class Player {
    constructor ({ initialPosition, initialVelocity, hitbox }) {
        this.factory = new PlayerStateFactory();
        this.groundedState = this.factory.groundedState;
        this.fallingState = this.factory.fallingState;
        this.jumpingState = this.factory.fallingState;

        this.currentState = this.groundedState;


        this.position = initialPosition;
        this.velocity = initialVelocity;
        this.hitbox = hitbox;
    }

    update () {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
    }
}