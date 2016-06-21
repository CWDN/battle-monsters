import { Multiplier } from "./Multiplier";

class EarthMultiplier extends Multiplier {
    /**
     * Creates an instance of EarthMultiplier.
     *
     * @param {number} multiplier Multiplier that will affect the pack.
     */
    constructor(multiplier: number) {
        super(
            multiplier,
            "Earth Multiplier",
            "EARTH"
        );
    }
}

export { EarthMultiplier };
