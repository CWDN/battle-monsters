/// <reference path="./BaseMonster.ts"/>
/// <reference path="../../Nodes/Multipliers/FireMultiplier.ts"/>
/// <reference path="../../Nodes/Multipliers/WindMultipler.ts"/>

module BattleMonsters.Entities.Monsters {
    export class EarthMonster extends BaseMonster {

        constructor(
            state: Kiwi.State,
            texture: Kiwi.Textures.SpriteSheet,
            x,
            y,
            health
        ) {
            super(state, texture, x, y, health);

            var fireNode =  new BattleMonsters.Nodes.Multipliers.FireMultiplier(2);
            var windNode = new BattleMonsters.Nodes.Multipliers.WindMultiplier(0.5);

            fireNode.addChild(this.damagePipeline);
            windNode.addChild(fireNode);

            this.damagePipeline = windNode;
        }
    }
}
