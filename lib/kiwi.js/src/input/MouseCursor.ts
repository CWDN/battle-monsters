/**
* 
* @module Kiwi
* @submodule Input
* 
*/

module Kiwi.Input {

	/**
	* Holds the information about a Mouse Cursor, such as the position of the
	* cursor, the mouse wheel's delta, the button that was used, e.t.c.
	* Note: A mouse cursor is always active.
	*
	* @class MouseCursor
	* @namespace Kiwi.Input
	* @extends Pointer
	*/
	export class MouseCursor extends Pointer {

		/**
		* The type of object this class is.
		* @method objType
		* @return {string} "MouseCursor"
		* @public
		*/
		public objType(): string {
			return "MouseCursor";
		}

		/**
		* The offset of the mouse wheel on the X axis.
		* @property wheelDeltaX
		* @type number
		* @default 0 
		* @public
		*/
		public wheelDeltaX: number = 0;

		/**
		* The offset of the mouse wheel on the Y axis.
		* @property wheelDeltaY
		* @type number
		* @default 0 
		* @public
		*/
		public wheelDeltaY: number = 0;

		/**
		* If the ctrl key is down.
		* @property ctrlKey
		* @type boolean
		* @public
		*/
		public ctrlKey: boolean;

		/**
		* If the shift key is down.
		* @property shiftKey
		* @type boolean
		* @public
		*/
		public shiftKey: boolean;

		/**
		* If the alt key is down.
		* @property altKey
		* @type boolean
		* @public
		*/
		public altKey: boolean;

		/**
		* The button that got pressed. Eg. If the LEFT mouse button was pressed this number would be 0
		* @property button
		* @type number
		* @public
		*/
		public button: number;

		/**
		* Indicates if the "preventDefault" method should be executed whenever a 'down' mouse event occurs.
		* @property preventDown
		* @type boolean
		* @public
		*/
		public preventDown: boolean = true;

		/**
		* Indicates if the "preventDefault" method should be executed whenever a 'up' mouse event occurs.
		* @property preventUp
		* @type boolean
		* @public
		*/
		public preventUp: boolean = true;

		/**
		* Indicates if the "preventDefault" method should be executed whenever a 'wheel' mouse event occurs.
		* @property preventWheel
		* @type boolean
		* @public
		*/
		public preventWheel: boolean = true;

		/**
		* Gets executed when the mouse cursor gets initally pressed.
		* @method start
		* @param {event} event
		* @public
		*/
		public start(event) {

			if (this.preventDown)  event.preventDefault();

			this.ctrlKey = event.ctrlKey;
			this.shiftKey = event.shiftKey;
			this.altKey = event.altKey;
			this.button = event.button;

			super.start(event);
		}

		/**
		* Gets executed when the mouse cursor gets initally released.
		* @method stop
		* @param {event} event
		* @public
		*/
		public stop(event) {

			if (this.preventUp)  event.preventDefault();

			this.move(event);
			super.stop(event);
		}

		/**
		* When the mouse wheel event fires and the mouse's delta changes.
		* @method wheel
		* @param {event} event
		* @public
		*/
		public wheel(event) { 

			if (this.preventWheel)  event.preventDefault();

			if (event['wheelDeltaX']) {
				this.wheelDeltaX = event['wheelDeltaX'];
			} else {
				this.wheelDeltaX = event.deltaX;
			}

			if (event['wheelDeltaY']) {
				this.wheelDeltaY = event['wheelDeltaY'];
			} else {
				this.wheelDeltaY = event.deltaY;
			}
		}

	}

}
