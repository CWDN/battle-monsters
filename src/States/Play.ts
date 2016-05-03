/// <reference path="../Entities/Monsters/FireMonster.ts"/>

module BattleMonsters.States {
    export class Play extends Kiwi.State {

        protected tilemap : Kiwi.GameObjects.Tilemap.TileMap;
        protected character : BattleMonsters.Entities.Monsters.BaseMonster;

        constructor() {
            super('Play');
        }

        public update() {
            super.update();

        }

        /**
        * Is executed once all of the assets have loaded and the game is ready to be 'created'.
        */
        public create() {
            this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);
            this.character = new BattleMonsters.Entities.Monsters.FireMonster(
                this,
                this.textures.character,
                0,
                0,
                100
            );

            var pack = new Kiwi.Plugins.DamagePipeline.Pack({
                value: 20,
                tags: "WATER",
                mode: "SUBTRACT"
            });

            console.log(this.character.damagePipeline);
            this.character.attack(pack);
            console.log(this.character.damagePipeline);

            this.character.components.add(
                new BattleMonsters.Components.KeyboardMovement(this, 'KeyboardMovement')
            );

            this.character.animation.add('idle', [0], 0.1, true, false);
            this.character.animation.add('down', [0, 1, 2, 3], 0.2, true, false);
            this.character.animation.add('up', [12, 13, 14, 15], 0.2, true, false);
            this.character.animation.add('left', [8, 9, 10, 11], 0.2, true, false);
            this.character.animation.add('right', [4, 5, 6, 7], 0.2, true, false);

            this.addChild(this.tilemap.layers[0]);
            this.addChild(this.character);
        }
    }
}
