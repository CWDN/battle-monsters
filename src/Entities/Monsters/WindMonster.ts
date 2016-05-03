/// <reference path="./BaseMonster.ts"/>
/// <reference path="../../Nodes/Multipliers/EarthMultiplier.ts"/>
/// <reference path="../../Nodes/Multipliers/WaterMultiplier.ts"/>

module BattleMonsters.Entities.Monsters {
    export class WindMonster extends BaseMonster {

        constructor(
            state: Kiwi.State,
            texture: Kiwi.Textures.SpriteSheet,
            x,
            y,
            health
        ) {
            super(state, texture, x, y, health);

            var earthNode = new BattleMonsters.Nodes.Multipliers.EarthMultiplier(2);
            var waterNode = new BattleMonsters.Nodes.Multipliers.WaterMultiplier(0.5);

            waterNode.addChild(this.damagePipeline);
            earthNode.addChild(waterNode);

            this.damagePipeline = earthNode;
        }
    }
}
