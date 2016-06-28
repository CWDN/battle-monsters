import { Player } from "../Entities/Player";
import { Human } from "../Entities/Human";
import { TileEntity } from "../Entities/TileEntity";
import Socket from "../Network/Socket";
import { ServerMovement } from "../Components/ServerMovement";

class Play extends Kiwi.State {

    protected tilemap: Kiwi.GameObjects.Tilemap.TileMap;

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

        Socket.emit("player_joined");

        Socket.on("new_player", (data) => {
            let player = new Player(
                this,
                data.x,
                data.y,
                data.uuid
            );

            this.addChild(player);
        });

        Socket.on("new_entity", (data) => {
            let entity = new Human(
                this,
                data.x,
                data.y,
                data.uuid
            );

            this.addChild(entity);
        });

        Socket.on("remove_entity", (data) => {
            this.getAllChildren().forEach((child: TileEntity) => {
                if (child.uuid === data.uuid) {
                    this.removeChild(child);
                }
            });
        });

        let pack = new Kiwi.Plugins.DamagePipeline.Pack({
            value: 20,
            tags: "WATER",
            mode: "SUBTRACT"
        });

        let data = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        let map = new Kiwi.Plugins.PathFinding.Graph(data);

        let start = map.nodes[0][0];
        let end = map.nodes[2][0];
        console.log(start);
        console.log(end);
        let queue = Kiwi.Plugins.PathFinding.astar.search(map.nodes, start, end, false, false);
        console.log(queue);

        this.addChild(this.tilemap.layers[0]);
    }
}

export { Play };
