import { Human } from "./Human";
import { KeyboardMovement } from "../Components/KeyboardMovement";
import { CameraFollow } from "../Components/CameraFollow";

/**
 * Player
 */
class Player extends Human {
    /**
     * Creates an instance of TileEntity.
     *
     * @param state {Kiwi.State} state State entity is in
     * @param x {number} Starting X position
     * @param y {number} Starting Y position
     * @param uuid {string} Unique identifier to talk to the server with.
     */
    constructor(
        state: Kiwi.State,
        x: number,
        y: number,
        uuid: string
    ) {
        super(state, x, y, uuid);

        this.components.add(new KeyboardMovement(this));
        this.components.add(new CameraFollow(this));
    }
}

export { Player };
