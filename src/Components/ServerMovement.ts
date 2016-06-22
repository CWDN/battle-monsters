import { TileEntity } from "../Entities/TileEntity";
import Socket from "../Network/Socket";

class ServerMovement extends Kiwi.Component {

    /**
     * Creates an instance of KeyboardMovement.
     *
     * @param {Kiwi.IChild} child Child the component is attached to.
     */
    constructor (child: Kiwi.IChild) {
        super(child, "ServerMovement");

        Socket.on("move", (data) => {
            let owner = <TileEntity> this.owner;

            let direction = data.direction;
            switch (direction) {
                case "down":
                    owner.moveDown();
                    break;
                case "up":
                    owner.moveUp();
                    break;
                case "left":
                    owner.moveLeft();
                    break;
                case "right":
                    owner.moveRight();
                    break;
            }

        });
    }
}

export { ServerMovement };
