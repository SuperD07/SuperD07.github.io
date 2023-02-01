class Player {
    constructor () {
        this.factory = new PlayerStateFactory();
        this.groundedState = this.factory.groundedState;
        this.fallingState = this.factory.fallingState;
        this.jumpingState = this.factory.fallingState;
        this.currentState;
    }
}