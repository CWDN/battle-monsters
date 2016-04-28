/**
* @module HUD
* @submodule Widget 
*/

module Kiwi.HUD.Widget {

	/**
	* A MenuItem extends the Button Widget and is typically contained inside of a Menu Widget. 
	* Since a MenuItem extends the Button Widget you can access the Input Component that it has to listen to mouse events.
	*
	* @class MenuItem
	* @extends Kiwi.HUD.Widget.Button
	* @namespace Kiwi.HUD.Widget
	* @constructor
	* @param game {Kiwi.Game} The game that this MenuItem belongs to.
	* @param text {string} The text that is to be inside the menuitem.
	* @param x {number} The position of this menu item on the x-axis.
	* @param y {number} The position of this menu item on the y-axis.
	* @return {Kiwi.HUD.Widget.MenuItem}
	*/
	export class MenuItem extends Kiwi.HUD.Widget.Button {

		constructor(game:Kiwi.Game, text:string, x: number, y: number) {
			
			super(game, text, x, y);

			this.name = 'menuItem';
			this.class = 'kiwi-menuitem-widget kiwi-widget';

		}

		/**
		* The type of object that this is.
		* @method objType
		* @return {string} "MenuItem"
		* @public
		*/
		public objType():string {
			return 'MenuItem';
		}

		/**
		* The Menu that this belongs to.
		* @property menu
		* @type Kiwi.HUD.Widget.Menu
		* @public
		*/
		public menu: Kiwi.HUD.Widget.Menu;

	}

}
