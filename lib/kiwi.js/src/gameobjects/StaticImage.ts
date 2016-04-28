/**
* 
* @module Kiwi
* @submodule GameObjects 
* 
*/

module Kiwi.GameObjects {

	/**
	* A light weight game object for displaying static images that would have little or no interaction with other GameObjects. An Example of this would be a background image. Note: Since a StaticImage is lightweight it doesn't have any AnimationManager to handle the switching of cells (If you were using a SpriteSheet/TextureAtlas). In order to switch cells you can change the value of the cellIndex property.
	*
	* @class StaticImage
	* @namespace Kiwi.GameObjects
	* @extends Kiwi.Entity
	* @constructor
	* @param state {Kiwi.State} The state that this static image belongs to 
	* @param atlas {Kiwi.Textures.TextureAtlas} The texture atlas to use as the image.
	* @param [x=0] {Number} Its coordinates on the x axis
	* @param [y=0] {Number} The coordinates on the y axis
	* @return {StaticImage}
	*/
	export class StaticImage extends Kiwi.Entity {

		constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, x: number = 0, y: number = 0) {

			super(state, x, y);

			if (this.game.renderOption === Kiwi.RENDERER_WEBGL) {
				this.glRenderer = this.game.renderer.requestSharedRenderer("TextureAtlasRenderer");
			}

			//Texture atlas error check.
			if (typeof atlas == "undefined") {
				Kiwi.Log.error('A Texture Atlas was not passed when instantiating a new Static Image.', '#static-image', '#texture');
				this.visible = false;
				this.active = false;
				return;
			} 

			//Set coordinates and texture
			this.atlas = atlas;
			this.cellIndex = this.atlas.cellIndex;
			this.width = atlas.cells[this.cellIndex].w;
			this.height = atlas.cells[this.cellIndex].h;
			this.transform.rotPointX = this.width / 2;
			this.transform.rotPointY = this.height / 2;
			
			this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));

		}

		/**
		* Returns the type of object that this is.
		* @method objType
		* @return {string} "StaticImage"
		* @public
		*/
		public objType(): string {
			return "StaticImage";
		}

		/** 
		* The Bounds component that controls the bounding box around this Game Object
		* @property box
		* @type Kiwi.Components.Box
		* @public
		*/
		public box: Kiwi.Components.Box;

		/**
		* Called by the Layer to which this Game Object is attached
		* @method render
		* @param {Kiwi.Camara} camera
		* @public
		*/
		public render(camera: Kiwi.Camera) {

			super.render(camera);

			//if it is would even be visible.
			if (this.alpha > 0) {

				var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
				ctx.save();

				if (this.alpha > 0 && this.alpha <= 1) {
					ctx.globalAlpha = this.alpha;
				}

				//get entity/view matrix
				var t: Kiwi.Geom.Transform = this.transform;
				var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
				
				ctx.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
				
				var cell = this.atlas.cells[this.cellIndex];
				ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
				ctx.restore();

			}

		}

		/**
		* Renders the GameObject using WebGL. 
		* @method renderGL
		* @param {WebGLRenderingContext} gl
		* @param {Kiwi.Camera} camera
		* @param {Object} params
		* @public
		*/

		public renderGL(gl: WebGLRenderingContext, camera: Kiwi.Camera, params: any = null) {
			(<Kiwi.Renderers.TextureAtlasRenderer>this.glRenderer).addToBatch(gl, this, camera);
		}

	}

}
