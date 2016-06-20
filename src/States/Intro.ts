class Intro extends Kiwi.State {
    /**
     * Creates an instance of Intro.
     */
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

export { Intro };
