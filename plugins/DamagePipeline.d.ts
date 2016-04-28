declare module Kiwi.Plugins.DamagePipeline {

    class PipelineNode {
        /**
         *  Pipeline Node, a pipeline object that processes Pack objects.
         *  <br><br>
         *  A PipelineNode receives Packs, performs some operation on them, and then
         *  normally passes them on to one or another of its children.
         *  Typically if a Pack becomes exhausted it is simply removed and
         *  no children are called. The PipelineNode has no knowledge of stack;
         *  it can only direct dispatches to its children and expects no response.
         *  <br><br>
         *  You may customise this node extensively just using the params object.
         *  Add children of type PipelineNode or MeterNode, then define
         *  an operation function that processes Packs and forwards them
         *  to children using "getChildByName".
         *  <br><br>
         *  To create nodes with your own functionality, use the
         *  <code>Kiwi.extend</code> method, and overwrite the
         *  <code>_operate</code> function with your own custom code.
         *  <br><br>
         *
         *      // Extend this code only if normal customisation is insufficient
         *     var MyNode = function( params ) {
         *
         *      // Super
         *      Kiwi.Plugins.DamagePipeline.PipelineNode.call( this, params );
         *
         *      // Your constructor code goes here
         *      };
         *      Kiwi.extend( MyNode, Kiwi.Plugins.DamagePipeline.PipelineNode );
         *
         *      MyNode.prototype._operate = function( pack ) {
         *           // Your operation goes here
         *      };
         *
         * @param {object} params Parameter object
         *     @param  {array}   children          Array of child nodes, or a single node
         *     @param  {string}  name              Unique identifier for this node
         *     @param  {number}  defaultChildIndex Default output
         *     @param  {boolean} doDefaultDispatch Send packs to default output?
         *     @param  {boolean} operation         Function to run on received Packs
         *     @param  {boolean} processOnReceive  Whether to process immediately
         *     @param  {boolean} processTopDown    Whether to process top-down
         *     @param  {array}   tags              Array of tags, or a single tag
         */
        constructor(params : Object);

        /**
         * Adds a child. The child must be a pipeline node, and cannot share a name
         * with other children.
         *
         * @param  {Kiwi.Plugins.DamagePipeline.PipelineNode} child The child to add
         * @public
         */
        addChild(child : Kiwi.Plugins.DamagePipeline.PipelineNode);

        /**
         * Adds a tag. The tag must be a String or Number, and cannot be a duplicate.
         *
         * @param  {string} tag Tag; can be either String or Number
         * @public
         */
        addTag(tag : string);

        /**
         * Removes all children from this node.
         *
         * @public
         */
        clearChildren();

        /**
         * Removes all tags from this node.
         *
         * @public
         */
        clearTags();

    }

}
