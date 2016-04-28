module BattleMonsters.States {
    export class Play extends Kiwi.State {

        protected tilemap : Kiwi.GameObjects.Tilemap.TileMap;
        protected character : Kiwi.GameObjects.Sprite;

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
            this.character = new BattleMonsters.Entities.TileEntity(
                this,
                this.textures.character,
                0,
                0
            );

            this.character.animation.add('idle', [0], 0.1, false);
            this.character.animation.add('down', [0, 1, 2, 3, 0], 0.2, false);
            this.character.animation.add('up', [12, 13, 14, 15, 12], 0.2, false);
            this.character.animation.add('left', [8, 9, 10, 11, 8], 0.2, false);
            this.character.animation.add('right', [4, 5, 6, 7, 4], 0.2, false);

            this.addChild(this.tilemap.layers[0]);
            this.addChild(this.character);
        }
    }
}
