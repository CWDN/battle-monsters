/// <reference path="./BaseMonster.ts"/>
/// <reference path="../../Nodes/Multipliers/WaterMultiplier.ts"/>
/// <reference path="../../Nodes/Multipliers/EarthMultiplier.ts"/>

module BattleMonsters.Entities.Monsters {
    export class FireMonster extends BaseMonster {

        constructor(
            state: Kiwi.State,
            texture: Kiwi.Textures.SpriteSheet,
            x,
            y,
            health
        ) {
            super(state, texture, x, y, health);

            var waterNode =  new BattleMonsters.Nodes.Multipliers.WaterMultiplier(2);
            var earthNode = new BattleMonsters.Nodes.Multipliers.EarthMultiplier(0.5);

            earthNode.addChild(this.damagePipeline);
            waterNode.addChild(earthNode);

            this.damagePipeline = waterNode;
        }
    }
}
