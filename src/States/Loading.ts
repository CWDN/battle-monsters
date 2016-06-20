class Loading extends Kiwi.State {
    constructor() {
        super('Loading');
    }

    /**
    * This method is where you would load of all the assets that are requried
    * for this state or in the entire game.
    */
    public preload() : void {
        super.preload();
        this.addImage('kiwiName', 'assets/img/kiwijs-name.png');
        this.addSpriteSheet('icons', 'assets/img/kiwijs-icons.png', 100, 90);
        this.addSpriteSheet('tiles', 'assets/textures/tileset.png', 96, 96);
        this.addJSON('tilemap', 'assets/tilemaps/arena.json');
        this.addSpriteSheet('character', 'assets/textures/character.png', 96, 96);
    }

    public create() : void {
        this.game.states.switchState('Play');
    }
}

export { Loading };
