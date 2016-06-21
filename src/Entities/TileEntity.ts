import Sprite = Kiwi.GameObjects.Sprite;

abstract class TileEntity extends Sprite {
    /**
     * Speed of the Actor.
     *
     * @type {number}
     */
    public speed: number = 225;

    /**
     * Next X Pos which is the actual X position.
     *
     * @type {number}
     */
    private nextXPos: number = 0;

    /**
     * Next Y Pos which is the actual Y position.
     *
     * @type {number}
     */
    private nextYPos: number = 0;

    /**
     * Previous dx (velocity)
     *
     * @type {number}
     */
    private prevDx: number = 0;

    /**
     * Previous dy (velocity)
     *
     * @type {number}
     */
    private prevDy: number = 0;

    /**
     * Current X velocity
     *
     * @type {number}
     */
    public dx: number = 0;

    /**
     * Current Y velocity
     *
     * @type {number}
     */
    public dy: number = 0;

    /**
     * Creates an instance of TileEntity.
     *
     * @param {Kiwi.State} state State entity is in
     * @param {Kiwi.Textures.SpriteSheet} texture Texture to draw
     * @param x Starting X position
     * @param y Starting Y position
     */
    constructor(
        state: Kiwi.State,
        texture: Kiwi.Textures.SpriteSheet,
        x: number,
        y: number
    ) {
        super(state, texture, x, y);
        this.nextXPos = x;
        this.nextYPos = y;
    }

    /**
     * Updates the entities data ready for the render.
     */
    public update() {
        super.update();
        let delta: number = this.game.time.delta();

        // run emulated update
        let xChange = this.prevDx * (delta / 1000);
        let yChange = this.prevDy * (delta / 1000);
        this.nextXPos += xChange;
        this.nextYPos += yChange;

        /*
         * X Movement
         */
        if (this.dx === 0 && this.prevDx !== 0) {
            let progress = this.x / this.width;
            let lowest = Math.floor(progress);
            let leftPercentage = 1 - (progress - lowest);

            if (this.prevDx < 0) {
                leftPercentage = 1 - leftPercentage;
            }

            let left = leftPercentage * this.width;

            if (left !== 0) {
                if (left < Math.abs(xChange)) {
                    this.x += left * (xChange / Math.abs(xChange));
                    this.prevDx = 0;
                    this.idle();
                } else {
                    this.x = this.nextXPos;
                }
            } else {
                this.idle();
                this.prevDx = 0;
            }
        }

        /*
         * Y Movement
         */
        if (this.dy === 0 && this.prevDy !== 0) {
            let progress = this.y / this.width;
            let lowest = Math.floor(progress);
            let leftPercentage = 1 - (progress - lowest);

            if (this.prevDy < 0) {
                leftPercentage = 1 - leftPercentage;
            }

            let left = leftPercentage * this.width;

            if (left !== 0) {
                if (left < Math.abs(yChange)) {
                    this.y += left * (yChange / Math.abs(yChange));
                    this.prevDy = 0;
                    this.idle();
                } else {
                    this.y = this.nextYPos;
                }
            } else {
                this.prevDy = 0;
                this.idle();
            }
        }

        if (this.dx !== 0) {
            this.prevDx = this.dx;
        }

        if (this.dy !== 0) {
            this.prevDy = this.dy;
        }

        this.x += this.dx * (delta / 1000);
        this.y += this.dy * (delta / 1000);

        this.dx = 0;
        this.dy = 0;
    }

    /**
     * Moves the actor upwards.
     *
     * @return {void}
     */
    public moveUp() {
        this.resetHorizontalMovement();
        this.playAnimation("up");

        if (this.prevDx === 0) {
            this.dy = -this.speed;
        }
    }

    /**
     * Moves the actor downwards.
     *
     * @return {void}
     */
    public moveDown() {
        this.resetHorizontalMovement();
        this.playAnimation("down");

        if (this.prevDx === 0) {
            this.dy = this.speed;
        }
    }

    /**
     * Moves the actor right
     *
     * @return {void}
     */
    public moveRight() {
        this.resetVerticalMovement();
        this.playAnimation("right");

        if (this.prevDy === 0) {
            this.dx = this.speed;
        }
    }

    /**
     * Moves the actor left.
     *
     * @return {void}
     */
    public moveLeft() {
        this.resetVerticalMovement();
        this.playAnimation("left");

        if (this.prevDy === 0) {
            this.dx = -this.speed;
        }
    }

    /**
     * Plays the idle animation.
     */
    public idle() {
        this.playAnimation("idle");
    }

    /**
     * Resets the velocity of the vertical movement.
     *
     * @return {void}
     */
    public resetVerticalMovement() {
        this.dy = 0;
    }

    /**
     * Resets the velocity of the horizontal movement.
     *
     * @return {void}
     */
    public resetHorizontalMovement() {
        this.dx = 0;
    }

    /**
     * Plays a animation given by the name
     *
     * @param {string} name Animation name to play.
     */
    public playAnimation(name: string) {
        this.animation.play(name, false);
    }
}

export { TileEntity };
