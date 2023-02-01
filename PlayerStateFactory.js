class PlayerStateFactory {
    constructor () {
        this.groundedState = new PlayerGroundedState();
        this.jumpingState = new PlayerJumpingState();
        this.fallingState = new PlayerFallingState();
    }
}