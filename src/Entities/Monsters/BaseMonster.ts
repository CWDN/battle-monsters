import { TileEntity } from '../TileEntity';

abstract class BaseMonster extends TileEntity {

    damagePipeline: Kiwi.Plugins.DamagePipeline.PipelineNode;

    /**
     * Creates an instance of BaseMonster.
     *
     * @param {Kiwi.State} state State entity is in
     * @param {Kiwi.Textures.SpriteSheet} texture Texture to draw
     * @param x Starting X position
     * @param y Starting Y position
     * @param health Initial health
     */
    constructor(
        state: Kiwi.State,
        texture: Kiwi.Textures.SpriteSheet,
        x,
        y,
        health
    ) {
        super(state, texture, x, y);

        this.damagePipeline = new Kiwi.Plugins.DamagePipeline.MeterNode({
            name: "Health Meter",
            value: health,
            valueMax: health
        });
    }

    public attack(pack: Kiwi.Plugins.DamagePipeline.Pack) {
        this.damagePipeline.receive(pack);
    }
}

export { BaseMonster };
