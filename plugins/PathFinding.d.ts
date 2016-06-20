declare module Kiwi.Plugins.PathFinding {
    enum GraphNodeType {
        OPEN = 1,
        WALL = 0
    }

    /**
     * Creates a Kiwi.Plugins.PathFinding.Graph class used in the
     * Kiwi.Plugins.PathFinding.astar search algorithm.
     */
    class Graph {
        constructor (grid: Array<any>);

        nodes: Array<Array<GraphNode>>;

        toString (): string;
    }

    class GraphNode {
        constructor (x: number, y: number, type: GraphNodeType);

        toString (): string;

        isWall () : boolean;
    }

    class BinaryHeap {
        constructor(scoreFunction: Function);

        push (element);

        pop (): any;

        remove (node);

        size () : number;

        rescoreElement (node);

        sinkDown (n);

        bubbleUp (n);
    }

    // javascript-Kiwi.Plugins.PathFinding.astar
    // http://github.com/bgrins/javascript-Kiwi.Plugins.PathFinding.astar
    // Freely distributable under the MIT License.
    // Implements the Kiwi.Plugins.PathFinding.astar search algorithm in javascript using a binary heap.
    class astar {
        static init (grid: Array<any>);

        static heap () : BinaryHeap;

        static search (grid: Array<any>, start: GraphNode, end: GraphNode, diagonal: boolean, heuristic: boolean) : Array<any>;

        static manhattan (pos0, pos1);

        static neighbors (grid: Array<any>, node, diagonals: boolean) : Array<any>;
    }
}
