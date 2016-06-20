import { BaseMonster } from './BaseMonster';
import { WaterMultiplier, EarthMultiplier } from '../../Nodes/Multipliers';

class FireMonster extends BaseMonster {

    /**
     * Creates an instance of FireMonster.
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

        var waterNode = new WaterMultiplier(2);
        var earthNode = new EarthMultiplier(0.5);

        earthNode.addChild(this.damagePipeline);
        waterNode.addChild(earthNode);

        this.damagePipeline = waterNode;
    }
}

export { FireMonster };
