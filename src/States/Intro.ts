module BattleMonsters.States {
    export class Intro extends Kiwi.State {
        constructor() {
            super('Intro');
        }

        /**
        * Is executed once all of the assets have loaded and the game is ready to be 'created'.
        */
        public create() {
            // @TODO Create main menu
            this.game.states.switchState("Play");
        }
    }
}
