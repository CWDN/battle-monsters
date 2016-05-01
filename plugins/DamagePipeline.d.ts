declare module Kiwi.Plugins.DamagePipeline {

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
    class PipelineNode {
        constructor(params: Object);

        /**
         * Adds a child. The child must be a pipeline node, and cannot share a name
         * with other children.
         *
         * @param  {Kiwi.Plugins.DamagePipeline.PipelineNode} child The child to add
         * @public
         */
        addChild(child: PipelineNode);

        /**
         * Adds a tag. The tag must be a String or Number, and cannot be a duplicate.
         *
         * @param  {string} tag Tag; can be either String or Number
         * @public
         */
        addTag(tag: string);

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

        /**
         * Attempts to send a pack to another node.
         *   Always removes the pack from this node.
         *   Deals with situations where the node does not exist,
         *   or the pack is exhausted.
         *   Call this from the "_operate()" function.
         *
         * @param  {Kiwi.Plugins.DamagePipeline.Pack}         pack Pack to dispatch
         * @param  {Kiwi.Plugins.DamagePipeline.PipelineNode} node Pack to dispatch
         * @public
         */
        dispatch(pack: Pack, node: PipelineNode);

        /**
         * Attempts to send a pack to the default child node.
         *   This is defined by "this.defaultChildIndex" and is normally index 0.
         *   Always removes the pack from this node.
         *   Deals with situations where the node does not exist,
         *   or the pack is exhausted.
         *   All packs are sent to default unless "doDefaultDispatch" is
         *   set to "false".
         *
         * @param  {Kiwi.Plugins.DamagePipeline.Pack} pack Pack to dispatch
         * @public
         */
        dispatchDefault(pack: Pack);

        /**
         * Extracts and returns a pack from any parents
         *
         * @param  {Kiwi.Plugins.DamagePipeline.Pack} pack Pack to extract
         *
         * @return {Kiwi.Plugins.DamagePipeline.Pack}
         * @public
         */
        extractPack(pack: Pack): PipelineNode;

        /**
         * Returns the child with this name, or null if it does not exist.
         *   Searches only direct children.
         *
         * @param  {string} name Name of desired child node
         *
         * @return {Kiwi.Plugins.DamagePipeline.PipelineNode}
         * @public
         */
        getChildByName(name: string): PipelineNode;

        /**
         * Returns whether this node has the specified tag.
         *
         * @param  {string} tag Tag; can be either String or Number
         *
         * @return {boolean}
         * @public
         */
        hasTag(tag: string): boolean;

        /**
         * Returns the type of object that this is.
         *
         * @return {string}
         */
        objType(): string;

        /**
         * Index of the default child, to which Packs that do not match
         *   any tags or are otherwise treated as defaults are sent.
         *
         * @type {number}
         * @default 0
         */
        defaultChildIndex: number;

        /**
         * Whether to send packs to the default dispatch automatically after
         *
         * @type {boolean}
         * @default true
         */
        doDefaultDispatch: boolean;

        /**
         * Signal dispatched on pack dispatch
         *   with parameters "this", "pack"
         * @property onDispatch
         * @type Kiwi.Signal
         * @public
         * @since 0.1.0
         */
        onDispatch : Kiwi.Signal;

        /**
         * Signal dispatched on pack exhaustion
         *   with parameters "this", "pack"
         * @property onExhaust
         * @type Kiwi.Signal
         * @public
         * @since 0.1.0
         */
        onExhaust : Kiwi.Signal;

        /**
        * Whether the node will run "process()" immediately upon receiving
        *    a Pack. If false, you will have to manually run "process()".
        * @property processOnReceive
        * @type Boolean
        * @default true
        * @public
        * @since 0.1.0
        */
        processOnReceive : boolean;

        /**
        * Whether to process a pack top-down; that is, the master pack
        *   followed by its children. This is DISABLED by default.
        *   If a top-level pack is emptied, its children will be discarded
        *   before they can be processed. For this reason we normally
        *   process bottom-up, doing the children first then their parent.
        *   However, in some cases it may be useful to extract the topmost
        *   case of a tag, not the bottommost, so this flag is provided.
        *
        * @property processTopDown
        * @type Boolean
        * @default false
        * @public
        * @since 0.1.0
        */
        processTopDown : boolean;

        /**
         * Performs the node operation on all current packs.
         *   The operation is only performed on those packs which match a tag of
         *   this node. If this node has no tags, all nodes are processed.
         *   All nodes are subsequently sent to dispatchDefault unless
         *   doDefaultDispatch has been set to false.
         *   <br><br>
         *   The process goes through each pack bottom-up;
         *   the deepest children are evaluated first, working up to
         *   the root pack.
         *   <br><br>
         *   If you want to evaluate top-down, set processTopDown to true.
         *   Be careful when evaulating top-down, as you may cause packs
         *   to be discarded with a parent before they are processed.
         *   <br><br>
         *   This is normally called directly after damage is received.
         *   However, if you have not set the processOnReceive flag,
         *   it will not execute immediately. You can call it according
         *   to your own requirements.
         * @method process
         * @public
         * @since 0.1.0
         */
        process()

        /**
         * Receives a damage pack
         * @method receive
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to receive
         * @public
         * @since 0.1.0
         */
        receive(pack : Pack);

        /**
         * Removes a child, if it is currently a child.
         * @method removeChild
         * @param child {Kiwi.Plugins.DamagePipeline.PipelineNode} The child to remove
         * @public
         * @since 0.1.0
         */
        removeChild(child : PipelineNode);

        /**
         * Removes a tag, if it is currently a tag.
         * @method removeTag
         * @param tag {String} Tag; can be either String or Number
         * @public
         * @since 0.1.0
         */
        removeTag(tag : string);
    }

    /**
     * Damage Pack, a message containing information about incoming damage.
     * @class Pack
     * @constructor
     * @param params {object} Parameter object
     * @param params.value {number} Value of the damage pack
     * @param [params.mode] {string} Operational mode: one of
     *   Kiwi.Plugins.DamagePipeline.Pack.prototype.SUBTRACT (default),
     *   Kiwi.Plugins.DamagePipeline.Pack.prototype.ADD, or
     *   Kiwi.Plugins.DamagePipeline.Pack.prototype.SET.
     *   You may also use string shortcuts "ADD", "SET", and "SUBTRACT".
     * @param [params.owner] {object} Whosoever dealt it.
     * @param [params.subPacks=[]] {array} List of subordinate Packs.
     * @param [params.tags=[]] {array} List of tags for this pack,
     *   as strings or numbers.
     * @return {Kiwi.Plugins.DamagePipeline.Pack}
     * @since 0.1.0
     */
    class Pack {
        constructor(params : Object);

        /**
        * An exhausted Pack will have no further effect.
        *   The tree may terminate its traversal.
        * @property exhausted
        * @default false
        * @type number
        * @public
        * @since 0.1.0
        */
        exhausted: number;

        /**
        * Sub-packs for this Pack, representing subordinate damage sources.
        * @property subPacks
        * @type Array
        * @default []
        * @public
        * @since 0.1.0
        */
        subPacks: Array<Pack>;

        /**
         * Damage mode: add to meters.
         * @property ADD
         * @type number
         * @default 0
         * @public
         * @since 0.1.0
         */
        public static ADD : number;

        /**
         * Damage mode: set meters to constant value.
         * @property SET
         * @type number
         * @default 1
         * @public
         * @final
         * @since 0.1.0
         */
        public static SET : number;

        /**
         * Damage mode: subtract from meters.
         * @property SUBTRACT
         * @type number
         * @default 2
         * @public
         * @final
         * @since 0.1.0
         */
        public static SUBTRACT : number;

        /**
         * Value of this Pack. If it falls to or below 0, it is exhausted.
         * <BR><BR>
         * When you modify value, it will automatically check and
         *  discard any exhausted subPacks. This is designed for a pipeline
         *  in which subPacks are evaluated before the parent pack.
         * @property value
         * @type Number
         * @public
         * @final
         * @since 0.1.0
         */
        value: number;

        /**
         * Checks for exhaustion on this and all subPacks
         * @method checkExhaustion
         * @return {Boolean} The current exhaustion state of this pack
         * @public
         * @since 0.1.0
         */
        checkExhaustion(): boolean;

        /**
         * Clones this Pack, along with all subpacks
         * @method clone
         * @return Kiwi.Plugins.DamagePipeline.Pack
         * @public
         * @since 0.1.0
         */
        clone(): Pack;

        /**
         * Removes all subPacks that are now exhausted. You do not normally need to call
         *   this method; it will automatically occur while modifying values.
         * @method discardExhaustedSubPacks
         * @public
         * @since 0.1.0
         */
        discardExhaustedSubPacks()

        /**
         * Extracts and returns a subPack from this Pack or subpacks.
         *   Some damage pipeline nodes may split packs onto different branches.
         *   If the subPack is not found, this returns null.
         * @method extractSubPack
         * @param pack {Pack} Pack to extract
         * @return Pack
         * @public
         * @since 0.1.0
         */
        extractSubPack(pack: Pack): Pack


        /**
        * Returns a list of all subPacks and this Pack.
        *   These will be in reverse order to a normal traversal, so this pack
        *   will be last in the list. This facilitates pipeline processing.
        * @method getAllPacks
        * @public
        * @return Array
        * @since 0.1.0
        */
        getAllPacks(): Array<Pack>;

        /**
         * Returns whether this pack has the specified tag.
         * @method hasTag
         * @param tag {String} Tag to check; may also be of type Number
         * @return Boolean
         * @public
         * @since 0.1.0
         */
        hasTag(tag: string): boolean;

        /**
        * Returns whether this pack has any tag from the specified array.
        *    An empty array is always true.
        * @method hasTagInArray
        * @param array {Array} Array of tags, either String or Number
        * @return Boolean
        * @public
        * @since 0.1.0
        */
        hasTagInArray(array: Array<string>): boolean;

        /**
         * Returns the type of object that this is.
         * @method objType
         * @return {string}
         * @public
         * @since 0.1.0
         */
        objType(): string;


        /**
         * Mode of this Pack, either ADD, SUBTRACT or SET.
         * @property mode
         * @type Number
         * @default this.SUBTRACT
         * @public
         * @since 0.1.0
         */
        mode: number;

        /**
         * Owner of this Pack. If the owner was not set, it returns null.
         * @property owner
         * @type Object
         * @default null
         * @public
         * @since 0.1.0
         */
        owner: Object;

        /**
         * Tags for this Pack, representing special information
         *   about damage types such as "fire" or "stun".
         * @property tags
         * @type Array
         * @default []
         * @public
         * @since 0.1.0
         */
        tags: Array<string>;
    }

    /**
     * Meter Node, a pipeline object that extends the standard
     *   Pipeline Node with a meter.
     * <br><br>
     * The Meter Node has several built-in functions.
     *   Each receives a Pack as its argument.
     *   You can override these to perform custom functionality.
     *   <ul>
     *   <li><code>doOnReceive</code>: called when the node receives a Pack.
     *   Default behaviour: Apply Pack to meter</li>
     *   <li><code>doOnZero</code>: called when the node drops to 0.
     *   Default behaviour: None</li>
     *   <li><code>doOnMax</code>: called when the node rises to maximum.
     *   Default behaviour: None</li>
     *   <li><code>doOnBreak</code>: called when the node drops below 0.
     *   Default behaviour: None</li>
     *   <li><code>doOnOverflow</code>: called when the node rises above maximum.
     *   Default behaviour: None</li>
     *   </ul>
     * <br><br>
     * The Pipeline Node inherits all functionality of the Pipeline Node,
     *   but it implements a custom version of the <code>_operation</code> method.
     *   You should override the above functions instead.
     *   As an extension of PipelineNode, the MeterNode will automatically
     *   process all packs and subpacks in bottom-up order. You do not need to
     *   write methods to deal with subpacks.
     *
     * @class MeterNode
     * @constructor
     * @extends Kiwi.Plugins.DamagePipeline.PipelineNode
     * @param params {Object} Parameter object
     *   @param [params.children] {Array} Array of child nodes, or a single node
     *   @param [params.name] {String} Unique identifier for this node
     *   @param [params.defaultChildIndex] {Number} Default output
     *   @param [params.doDefaultDispatch] {Boolean} Send packs to default output?
     *   @param [params.doOnBreak] {Function} Called on meter < 0
     *   @param [params.doOnMax] {Function} Called on meter = max
     *   @param [params.doOnOverflow] {Function} Called on meter > max
     *   @param [params.doOnReceive] {Function} Initial operation
     *   @param [params.doOnZero] {Function} Called on meter = 0
     *   @param [params.processOnReceive] {Boolean} Whether to process immediately
     *   @param [params.tags] {Array} Array of tags, or a single tag
     *   @param [params.value] {Number} Initial value of meter
     *   @param [params.valueMax=100] {Number} Maximum value of meter
     * @since 0.1.0
     */
    class MeterNode {

        constructor(params: Object);

        /**
        * Signal dispatched on meter break
        *   with parameter "this"
        * @property onBreak
        * @type Kiwi.Signal
        * @public
        * @since 0.1.0
        */
        onBreak: Kiwi.Signal;

        /**
        * Signal dispatched on meter max
        *	with parameter "this"
        * @property onMax
        * @type Kiwi.Signal
        * @public
        * @since 0.1.0
        */
        onMax: Kiwi.Signal;

        /**
         * Signal dispatched on meter overflow
         *   with parameter "this"
         * @property onOverflow
         * @type Kiwi.Signal
         * @public
         * @since 0.1.0
         */
        onOverflow: Kiwi.Signal;

        /**
         * Signal dispatched when the meter processes a pack
         *   with parameter "this"
         * @property onReceive
         * @type Kiwi.Signal
         * @public
         * @since 0.1.0
         */
        onReceive: Kiwi.Signal;

        /**
         * Signal dispatched on meter zero
         *   with parameter "this"
         * @property onZero
         * @type Kiwi.Signal
         * @public
         * @since 0.1.0
         */
        onZero: Kiwi.Signal;

        /**
         * Normalized value is equal to value divided by valueMax.
         * @property valueNormalized
         * @type Number
         * @public
         * @since 0.1.0
         */
        valueNormalized: number;

        /**
         * Maximum value of the meter
         * @property valueMax
         * @type Number
         * @default 100
         * @public
         * @since 0.1.0
         */
        valueMax: number;

        /**
         * Value of the meter
         * @property value
         * @type Number
         * @default 100
         * @public
         * @since 0.1.0
         */
        value: number;

        /**
         * Value of the meter before the current Pack operation
         * @property valueLast
         * @type Number
         * @public
         * @since 0.1.0
         */
        valueLast: number;

        /**
         * Empty method called on meter break, when the meter would go negative
         *   (that is, the meter is empty, the Pack still
         *   has value left, and the Pack is set to SUBTRACT mode).
         *   Override this with your custom functionality.
         * @method doOnBreak
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to process
         * @public
         * @since 0.1.0
         */
        doOnBreak(pack: Pack);

        /**
         * Empty method called on meter max, when the meter rises to maximum.
         *   Max does not occur if the meter was already at maximum.
         *   Override this with your custom functionality.
         * @method doOnMax
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to process
         * @public
         * @since 0.1.0
         */
        doOnMax(pack: Pack);


        /**
         * Empty method called on meter overflow, when the meter would overflow
         *   (that is, the meter is at max, the Pack still has value left, and
         *   the Pack is set to ADD mode).
         *   Override this with your custom functionality.
         * @method doOnOverflow
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to process
         * @public
         * @since 0.1.0
         */
        doOnOverflow(pack: Pack);

        /**
         * Default method executed upon receiving a Pack.
         *   This will transfer value from the Pack to the meter's value,
         *   according to the pack mode (ADD, SUBTRACT, or SET).
         *   If there is any value left over, it will remain in the Pack.
         *   It is not recommended that you override this function.
         * <br><br>
         * When receiving a Pack with mode SET, this function will assign as much value
         *   to this meter as it can fit. Any leftover value will remain in the Pack.
         *   This is intended to trigger overflow behaviour.
         *   It might create unexpected results if the pack is not discarded.
         * @method doOnReceive
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to process
         * @public
         * @since 0.1.0
         */
        doOnReceive(pack: Pack);


        /**
         * Empty method called on meter zero, when the meter drops to zero.
         *   Zero does not occur if the meter was already at zero.
         *   Override this with your custom functionality.
         * @method doOnZero
         * @param pack {Kiwi.Plugins.DamagePipeline.Pack} Pack to process
         * @public
         * @since 0.1.0
         */
        doOnZero(pack: Pack);
    }
}
