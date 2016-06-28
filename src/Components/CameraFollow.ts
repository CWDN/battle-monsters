import { TileEntity } from "../Entities/TileEntity";
import Socket from "../Network/Socket";

class CameraFollow extends Kiwi.Component {

    /**
     * Creates an instance of KeyboardMovement.
     *
     * @param {Kiwi.IChild} child Child the component is attached to.
     */
    constructor(child: Kiwi.IChild) {
        super(child, "CameraFollow");
    }

    /**
     * Called on every physics update.
     */
    public update() {
        super.update();

        let owner = <TileEntity>this.owner;
        let defaultCamera = this.game.cameras.defaultCamera;
        let cameraTransform = defaultCamera.transform.clone();

        cameraTransform.x = this.calculateMiddle(
            owner.x,
            defaultCamera.width,
            owner.width
        );

        cameraTransform.y = this.calculateMiddle(
            owner.y,
            defaultCamera.height,
            owner.height
        );

        defaultCamera.transform.copyFrom(cameraTransform);
    }

    protected calculateMiddle(position: number, screenWidth: number, tileWidth: number) {
        return Math.floor(
            -position + ((screenWidth / 2) - (tileWidth / 2))
        );
    }
}

export { CameraFollow };
