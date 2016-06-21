import { Multiplier } from "./Multiplier";

class FireMultiplier extends Multiplier {
    /**
     * Creates an instance of FireMultiplier.
     *
     * @param {number} multiplier Multiplier that will affect the pack.
     */
    constructor(multiplier: number) {
        super(
            multiplier,
            "Fire Multiplier",
            "FIRE"
        );
    }
}

export { FireMultiplier };
