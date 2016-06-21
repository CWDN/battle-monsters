import { BaseMonster } from './BaseMonster';
import { EarthMultiplier, WaterMultiplier } from '../../MultiplierLibrary';

class WindMonster extends BaseMonster {
    /**
     * Creates an instance of WindMonster.
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
        super(state, texture, x, y, health);

        var earthNode = new EarthMultiplier(2);
        var waterNode = new WaterMultiplier(0.5);

        waterNode.addChild(this.damagePipeline);
        earthNode.addChild(waterNode);

        this.damagePipeline = earthNode;
    }
}

export { WindMonster };
