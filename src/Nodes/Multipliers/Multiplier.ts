import PipelineNode = Kiwi.Plugins.DamagePipeline.PipelineNode;
import Pack = Kiwi.Plugins.DamagePipeline.Pack;

abstract class Multiplier extends PipelineNode {

    multiplier: number;

    /**
     * Creates an instance of Multiplier.
     *
     * @param {number} multiplier Multiple to apply to the pack
     * @param {string} name Name of this multiplier
     * @param {(string | string[])} tags Tags used to pull specific packs from pipeline
     */
    constructor(multiplier: number, name: string, tags: string | string[]) {
        super({
            name: name,
            tags: tags
        });

        this.multiplier = multiplier;
    }

    /**
     * Perform any modifications to the pack given.
     *
     * @param {Kiwi.Plugins.DamagePipeline.Pack} pack Pack to modify
     * @returns (description)
     */
    _operate(pack: Pack) {
        pack.value *= this.multiplier;
        return pack;
    }
}

export { Multiplier };
