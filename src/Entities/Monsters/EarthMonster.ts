import { BaseMonster } from './BaseMonster';
import { FireMultiplier, WindMultiplier } from '../../MultiplierLibrary';

class EarthMonster extends BaseMonster {

    /**
     * Creates an instance of EarthMonster.
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
        x: number,
        y: number,
        health: number
    ) {
        super(state, texture, x, y, health);

        var fireNode = new FireMultiplier(2);
        var windNode = new WindMultiplier(0.5);

        fireNode.addChild(this.damagePipeline);
        windNode.addChild(fireNode);

        this.damagePipeline = windNode;
    }
}

export { EarthMonster };
