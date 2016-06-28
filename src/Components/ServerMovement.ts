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

        Socket.on("entity_move", (data) => {
            let owner = <TileEntity> this.owner;
            console.log(data);
            if (owner.uuid === data.uuid) {
                owner.setDestination(new Kiwi.Geom.Point(
                   data.x,
                   data.y
                ));
            }
        });
    }
}

export { ServerMovement };
