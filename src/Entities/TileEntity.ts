import UUID from "node/node-uuid";
import Sprite = Kiwi.GameObjects.Sprite;
import Socket from "../Network/Socket";
import { ServerMovement } from "../Components/ServerMovement";

abstract class TileEntity extends Sprite {
    /**
     * Number of tiles per second to move.
     *
     * @type {number}
     */
    public speed: number = 2;

    /**
     * Unique identifier to share with the server.
     *
     * @type {string}
     */
    public uuid: string;

    /**
     * X grid position of this entity.
     *
     * @type {number}
     */
    public gridX: number;

    /**
     * Y grid position of this entity.
     *
     * @type {number}
     */
    public gridY: number;

    public direction: Kiwi.Geom.Vector2;

    public nextDirection: Kiwi.Geom.Vector2;

    public destination: Kiwi.Geom.Point;

    public isMoving: boolean;

    /**
     * Creates an instance of TileEntity.
     *
     * @param state {Kiwi.State} state State entity is in
     * @param texture {Kiwi.Textures.SpriteSheet} texture Texture to draw
     * @param x {number} Starting X position
     * @param y {number} Starting Y position
     * @param uuid {string} Unique identifier to talk to the server with.
     */
    constructor(
        state: Kiwi.State,
        texture: Kiwi.Textures.SpriteSheet,
        x: number,
        y: number,
        uuid: string
    ) {
        super(state, texture, x, y);

        this.gridX = x;
        this.gridY = y;

        this.x = x * this.width;
        this.y = y * this.height;

        this.uuid = uuid;
        this.direction = new Kiwi.Geom.Vector2(0, 0);
        this.destination = new Kiwi.Geom.Point(this.gridX, this.gridY);
        this.components.add(new ServerMovement(this));
    }

    /**
     * Updates the entities data ready for the render.
     */
    public update() {
        super.update();

        let delta: number = this.game.time.delta();

        if (this.direction.equal(this.calculateVectorFromDest()) === false) {
            this.direction = this.calculateVectorFromDest();
        }

        let movementChange = Math.floor((this.speed * this.width) * (delta / 1000));
        let velocity = this.direction.clone().multiplyScalar(movementChange);

        this.playAnimationAccordingToDirection();
        this.applyVelocity(velocity);
        this.nextDirection = new Kiwi.Geom.Vector2(0, 0);
    }

    protected applyVelocity(velocity: Kiwi.Geom.Vector2) {
        let pixelDestination = this.getPixelDestination();
        let pixelsLeftToDest = this.transform.getPositionPoint().distanceTo(pixelDestination);

        if (pixelsLeftToDest < Math.abs(velocity.x) || pixelsLeftToDest < Math.abs(velocity.y)) {
            this.x = pixelDestination.x;
            this.y = pixelDestination.y;
            this.gridX = this.destination.x;
            this.gridY = this.destination.y;

            if (this.isNextDirectionZero()) {
                this.resetDirection();
            } else {
                this.direction = this.nextDirection;
            }

            return;
        }

        this.x += velocity.x;
        this.y += velocity.y;
    }

    protected calculateVectorFromDest() {
        let diff = this.destination.clone().subtractFrom(this.gridX, this.gridY);

        return new Kiwi.Geom.Vector2(
            diff.x,
            diff.y
        );
    }

    protected calculateDestFromDirection() {
        let position = new Kiwi.Geom.Point(this.gridX, this.gridY);

        return position.addTo(this.direction.x, this.direction.y);
    }

    protected calculateDirFromDestination() {
        let distancePoint = this.destination.clone().subtractFrom(this.gridX, this.gridY);

        return Kiwi.Geom.Vector2.fromPoint(distancePoint);
    }

    protected isDirectionZero() {
        return this.direction.equal(new Kiwi.Geom.Vector2(0, 0));
    }

    protected isNextDirectionZero() {
        return this.nextDirection.equal(new Kiwi.Geom.Vector2(0, 0));
    }

    protected resetDirection() {
        this.direction = new Kiwi.Geom.Vector2(0, 0);
    }

    protected getPixelDestination() {
        return new Kiwi.Geom.Point(
            this.destination.x * this.width,
            this.destination.y * this.height
        );
    }

    protected playAnimationAccordingToDirection() {
        if (this.direction.x > 0) {
            this.playAnimation("right");
            return;
        }

        if (this.direction.x < 0) {
            this.playAnimation("left");
            return;
        }

        if (this.direction.y > 0) {
            this.playAnimation("down");
            return;
        }

        if (this.direction.y < 0) {
            this.playAnimation("up");
            return;
        }

        this.playAnimation("idle");
    }

    /**
     * Moves the actor upwards.
     *
     * @return {void}
     */
    public moveUp() {
        let newDirection = new Kiwi.Geom.Vector2(0, -1);
        this.applyNewDirection(newDirection);
    }

    /**
     * Moves the actor downwards.
     *
     * @return {void}
     */
    public moveDown() {
        let newDirection = new Kiwi.Geom.Vector2(0, 1);
        this.applyNewDirection(newDirection);
    }

    /**
     * Moves the actor right
     *
     * @return {void}
     */
    public moveRight() {
        let newDirection = new Kiwi.Geom.Vector2(1, 0);
        this.applyNewDirection(newDirection);
    }

    public setDestination(destination: Kiwi.Geom.Point) {
        if (this.destination.equals(destination) === false) {
            this.destination.copyFrom(destination);
            let newDirection = this.calculateDirFromDestination();
            this.direction.copyFrom(newDirection);
        }
    }

    /**
     * Moves the actor left.
     *
     * @return {void}
     */
    public moveLeft() {
        let newDirection = new Kiwi.Geom.Vector2(-1, 0);
        this.applyNewDirection(newDirection);
    }

    public applyNewDirection(newDirection: Kiwi.Geom.Vector2) {
        if (this.isDirectionZero()) {
            this.direction = newDirection;
            Socket.emit("move", this.direction);
            this.destination = this.calculateDestFromDirection();
        }

        // this.nextDirection = newDirection;
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
