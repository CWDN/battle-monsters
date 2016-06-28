import { TileEntity } from "./TileEntity";

class Human extends TileEntity {
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
        super(state, state.textures.character, x, y, uuid);

        this.animation.add("idle", [0], 0.1, true, false);
        this.animation.add("down", [0, 1, 2, 3], 0.2, true, false);
        this.animation.add("up", [12, 13, 14, 15], 0.2, true, false);
        this.animation.add("left", [8, 9, 10, 11], 0.2, true, false);
        this.animation.add("right", [4, 5, 6, 7], 0.2, true, false);
    }
}

export { Human };
