import { BaseMonster, FireMonster } from "../Entities/Monsters";
import { KeyboardMovement } from "../Components/KeyboardMovement";
import { ServerMovement } from "../Components/ServerMovement";

class Play extends Kiwi.State {

    protected tilemap: Kiwi.GameObjects.Tilemap.TileMap;
    protected character: BaseMonster;

    /**
     * Creates an instance of Play.
     */
    constructor() {
        super("Play");
    }

    /**
    * Is executed once all of the assets have loaded and the game is ready to be 'created'.
    */
    public create() {
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, "tilemap", this.textures.tiles);
        this.character = new FireMonster(
            this,
            this.textures.character,
            0,
            0,
            100
        );

        let  pack = new Kiwi.Plugins.DamagePipeline.Pack({
            value: 20,
            tags: "WATER",
            mode: "SUBTRACT"
        });

        this.character.components.add(
            new KeyboardMovement(this.character)
        );

        this.character.components.add(
            new ServerMovement(this.character)
        );


        this.character.animation.add("idle", [0], 0.1, true, false);
        this.character.animation.add("down", [0, 1, 2, 3], 0.2, true, false);
        this.character.animation.add("up", [12, 13, 14, 15], 0.2, true, false);
        this.character.animation.add("left", [8, 9, 10, 11], 0.2, true, false);
        this.character.animation.add("right", [4, 5, 6, 7], 0.2, true, false);

        let  data = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        let  map = new Kiwi.Plugins.PathFinding.Graph(data);

        let  start = map.nodes[0][0];
        let  end = map.nodes[2][0];
        console.log(start);
        console.log(end);
        let  queue = Kiwi.Plugins.PathFinding.astar.search(map.nodes, start, end, false, false);
        console.log(queue);

        this.addChild(this.tilemap.layers[0]);
        this.addChild(this.character);
    }
}

export { Play };
