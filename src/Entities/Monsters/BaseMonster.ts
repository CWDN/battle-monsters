/// <reference path="../TileEntity.ts"/>

module BattleMonsters.Entities.Monsters {
    export class BaseMonster extends BattleMonsters.Entities.TileEntity {

        damagePipeline: Kiwi.Plugins.DamagePipeline.PipelineNode;

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
}
