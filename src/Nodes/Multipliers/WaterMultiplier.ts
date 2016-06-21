import { Multiplier } from "./Multiplier";

class WaterMultiplier extends Multiplier {
    /**
     * Creates an instance of WaterMultiplier.
     *
     * @param {number} multiplier Multiplier that will affect the pack.
     */
    constructor(multiplier: number) {
        super(
            multiplier,
            "Water Multiplier",
            "WATER"
        );
    }
}

export { WaterMultiplier };
