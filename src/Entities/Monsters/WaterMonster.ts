/// <reference path="./BaseMonster.ts"/>
/// <reference path="../../Nodes/Multipliers/WindMultipler.ts"/>
/// <reference path="../../Nodes/Multipliers/FireMultiplier.ts"/>


module BattleMonsters.Entities.Monsters {
    export class WaterMonster extends BaseMonster {

        constructor(
            state: Kiwi.State,
            texture: Kiwi.Textures.SpriteSheet,
            x,
            y,
            health
        ) {
            super(state, texture, x, y, health);

            var windNode = new BattleMonsters.Nodes.Multipliers.WindMultiplier(2);
            var fireNode = new BattleMonsters.Nodes.Multipliers.FireMultiplier(0.5);

            fireNode.addChild(this.damagePipeline);
            windNode.addChild(fireNode);

            this.damagePipeline = windNode;
        }
    }
}
