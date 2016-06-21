import { Multiplier } from "./Multiplier";

class WindMultiplier extends Multiplier {
    /**
     * Creates an instance of WindMultiplier.
     *
     * @param {number} multiplier Multiplier that will affect the pack.
     */
    constructor(multiplier: number) {
        super(
            multiplier,
            "Wind Multiplier",
            "WIND"
        );
    }
}

export { WindMultiplier };
