module BattleMonsters.Components {
    export class KeyboardMovement extends Kiwi.Component {

        protected leftKey : Kiwi.Input.Key;
        protected rightKey : Kiwi.Input.Key;
        protected downKey : Kiwi.Input.Key;
        protected upKey : Kiwi.Input.Key;

        constructor (child : Kiwi.IChild, name : string) {
            super(child, name);

            this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
            this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
            this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
            this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
        }

        public update() {
            super.update();

            var owner = <BattleMonsters.Entities.TileEntity> this.owner;

            if (this.leftKey.isDown) {
                owner.moveLeft();
            }
            else if (this.rightKey.isDown) {
                owner.moveRight();
            }
            else if (this.downKey.isDown) {
                owner.moveDown();
            }
            else if (this.upKey.isDown) {
                owner.moveUp();
            }
        }
    }
}
