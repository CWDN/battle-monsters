import { BaseMonster } from './BaseMonster';
import { WindMultiplier, FireMultiplier } from '../../MultiplierLibrary';

class WaterMonster extends BaseMonster {
    /**
     * Creates an instance of WaterMonster.
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

        var windNode = new WindMultiplier(2);
        var fireNode = new FireMultiplier(0.5);

        fireNode.addChild(this.damagePipeline);
        windNode.addChild(fireNode);

        this.damagePipeline = windNode;
    }
}

export { WaterMonster };
