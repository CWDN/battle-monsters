import { TileEntity } from '../Entities/TileEntity';

class KeyboardMovement extends Kiwi.Component {

    /**
     * Key to press to make the entity go left.
     *
     * @protected
     * @type {Kiwi.Input.Key}
     */
    protected leftKey : Kiwi.Input.Key;


    /**
     * Key to press to make the entity go right.
     *
     * @protected
     * @type {Kiwi.Input.Key}
     */
    protected rightKey : Kiwi.Input.Key;


    /**
     * Key to press to make the entity go down.
     *
     * @protected
     * @type {Kiwi.Input.Key}
     */
    protected downKey : Kiwi.Input.Key;


    /**
     * Key to press to make the entity go up.
     *
     * @protected
     * @type {Kiwi.Input.Key}
     */
    protected upKey : Kiwi.Input.Key;

    /**
     * Creates an instance of KeyboardMovement.
     *
     * @param {Kiwi.IChild} child Child the component is attached to.
     */
    constructor (child : Kiwi.IChild) {
        super(child, 'KeyboardMovement');
        var keyboard = this.game.input.keyboard;

        this.leftKey = keyboard.addKey(Kiwi.Input.Keycodes.A);
        this.rightKey = keyboard.addKey(Kiwi.Input.Keycodes.D);
        this.downKey = keyboard.addKey(Kiwi.Input.Keycodes.S);
        this.upKey = keyboard.addKey(Kiwi.Input.Keycodes.W);
    }

    /**
     * Called on every physics update.
     */
    public update() {
        super.update();

        var owner = <TileEntity> this.owner;

        if (this.leftKey.isDown) {
            owner.moveLeft();
        }
        else if (this.rightKey.isDown) {
            owner.moveRight();
        }
        else if (this.downKey.isDown) {
            owner.moveDown();
        }
        else if (this.upKey.isDown) {
            owner.moveUp();
        }
    }
}

export { KeyboardMovement };
