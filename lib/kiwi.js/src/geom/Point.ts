/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

	/**
	* Represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
	*
	* @class Point
	* @constructor
	* @namespace Kiwi.Geom
	* @param [x=0] {Number} Position of this point on the x-axis.
	* @param [y=0] {Number} Position of this point on the y-axis.
	*
	*/
	export class Point {

		constructor (x: number = 0, y: number = 0) {

			this.setTo(x, y);

		}


		/**
		* The type of this object.
		* @method objType
		* @return {String} "Point"
		* @public
		*/
		public objType() {
			return "Point";
		}

		/** 
		* The horizontal position of this point.
		* @property x
		* @type Number
		* @public
		*/
		public x: number;

		/** 
		* The vertical position of this point.
		* @property y
		* @type Number
		* @public
		*/
		public y: number;


		/**
		* Converts a pair of polar coordinates to a Cartesian point coordinate and sets them on the point instance.
		* @method polar
		* @param length {Number} The length coordinate of the polar pair.
		* @param angle {Number} The angle, in radians, of the polar pair.
		* @return {Kiwi.Geom.Point} The new Cartesian Point object.
		* @public
		*/
		public polar(distance: number, angle: number): Point {
			//Note: Would be badarse if it did this based on the current x/y coordinates
			this.x = distance * Math.cos(angle); 
			this.y = distance * Math.sin(angle);
			return this;
		}

		/**
		* Adds the coordinates of another point to the coordinates of this point to create a new point.
		* @method add
		* @param toAdd {Kiwi.Geom.Point} The point to be added.
		* @param output {Kiwi.Geom.Point} 
		* @return {Kiwi.Geom.Point} The new Point object.
		* @public
		*/
		public add(toAdd: Point, output: Point = new Point): Point {

			return output.setTo(this.x + toAdd.x, this.y + toAdd.y);

		}

		/**
		* Adds the given values to the coordinates of this point and returns it
		* @method addTo
		* @param x {Number} The amount to add to the x value of the point
		* @param y {Number} The amount to add to the x value of the point
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public addTo(x: number = 0, y: number = 0): Point {

			return this.setTo(this.x + x, this.y + y);

		}

		/**
		* Adds the given values to the coordinates of this point and returns it
		* @method subtractFrom
		* @param x {Number} The amount to subtract from the x value of the point
		* @param y {Number} The amount to subtract from the x value of the point
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public subtractFrom(x: number = 0, y: number = 0): Point {

			return this.setTo(this.x - x, this.y - y);

		}

		/**
		* Inverts the x and y values of this point
		* @method invert
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public invert(): Point {

			return this.setTo(this.y, this.x);

		}

		/**
		* Clamps this Point object to be between the given min and max.
		* @method clamp
		* @param min {number} The minimum value to clamp this Point to.
		* @param max {number} The maximum value to clamp this Point to.
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public clamp(min: number, max: number): Point {

			this.clampX(min, max);
			this.clampY(min, max);
			return this;

		}

		/**
		* Clamps the x value of this Point object to be between the given min and max
		* @method clampX
		* @param min {Number} The minimum value to clamp this Point to
		* @param max {Number} The maximum value to clamp this Point to
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public clampX(min: number, max: number): Point {

			this.x = Math.max(Math.min(this.x, max), min);

			return this;

		}

		/**
		* Clamps the y value of this Point object to be between the given min and max
		* @method clampY
		* @param min {Number} The minimum value to clamp this Point to
		* @param max {Number} The maximum value to clamp this Point to
		* @return {Kiwi.Geom.Point} This Point object.
		* @public
		*/
		public clampY(min: number, max: number): Point {

			this.x = Math.max(Math.min(this.x, max), min);
			this.y = Math.max(Math.min(this.y, max), min);

			return this;

		}

		/**
		* Creates a copy of this Point.
		* @method clone
		* @param [output] {Kiwi.Geom.Point} Optional Point object. If given the values will be set into this object, otherwise a new Point object will be created.
		* @return {Kiwi.Geom.Point} 
		* @public
		*/
		public clone(output: Point = new Point): Point {

			return output.setTo(this.x, this.y);

		}

		/**
		* Copies the point data from the source Point object into this Point object.
		* @method copyFrom
		* @param source {Kiwi.Geom.Point} The point to copy from.
		* @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
		* @public
		*/
		public copyFrom(source: Point): Point {

			return this.setTo(source.x, source.y);

		}

		/**
		* Copies the point data from this Point object to the given target Point object.
		* @method copyTo
		* @param target {Kiwi.Geom.Point} target - The point to copy to.
		* @return {Kiwi.Geom.Point} The target Point object.
		* @public
		*/
		public copyTo(target: Point): Point {

			return target.setTo(this.x, this.y);

		}


		/**
		* Get the angle from this Point object to given Point object.
		* @method angleTo
		* @param target {Kiwi.Geom.Point} destination Point object.
		* @return {Number} angle to point
		* @public
		*/
		public angleTo(target: Point): number {

			//Y then X ....cause JavaScript :P
			return Math.atan2(target.y - this.y, target.x - this.x);

		}

		/**
		* Get the angle from this Point object to given X,Y coordinates.
		* @method angleToXY
		* @param x {Number} x value.
		* @param y {Number} y value.
		* @return {Number} angle to point.
		*/
		public angleToXY(x: number, y: number): number {
			
			//Y then X ....cause JavaScript :P
			return Math.atan2(y - this.y, x - this.x);

		}
		
		/**
		* Returns the distance from this Point object to the given Point object.
		* @method distanceTo
		* @param target {Kiwi.Geom.Point} The destination Point object.
		* @param round {boolean} Round the distance to the nearest integer (default false)
		* @return {Number} The distance between this Point object and the destination Point object.
		* @public
		*/
		public distanceTo(target: Point, round: boolean = false): number {

			var dx = this.x - target.x;
			var dy = this.y - target.y;

			if (round === true)
			{
				return Math.round(Math.sqrt(dx * dx + dy * dy));
			}
			else
			{
				return Math.sqrt(dx * dx + dy * dy);
			}

		}

		/**
		* Returns the distance from this Point object to the given Point object.
		* @method distanceToXY
		* @param x {Number} The x value.
		* @param y {Number} The y value.
		* @param [round=false] {boolean} Round the distance to the nearest integer (default false)
		* @return {Number} The distance between this Point object and the x/y values.
		* @public
		*/
		public distanceToXY(x: number, y: number, round: boolean = false): number {

			var dx = this.x - x;
			var dy = this.y - y;

			if (round === true)
			{
				return Math.round(Math.sqrt(dx * dx + dy * dy));
			}
			else
			{
				return Math.sqrt(dx * dx + dy * dy);
			}

		}

		/**
		* Returns the distance between the two Point objects.
		* @method distanceBetween
		* @param pointA {Kiwi.Geom.Point} The first Point object.
		* @param pointB {Kiwi.Geom.Point} The second Point object.
		* @param [round=false] {boolean} Round the distance to the nearest integer (default false)
		* @return {Number} The distance between the two Point objects.
		* @public
		*/
		static distanceBetween(pointA: Point, pointB: Point, round: boolean = false): number {

			var dx: number = pointA.x - pointB.x;
			var dy: number = pointA.y - pointB.y;

			if (round === true)
			{
				return Math.round(Math.sqrt(dx * dx + dy * dy));
			}
			else
			{
				return Math.sqrt(dx * dx + dy * dy);
			}

		}
		
		/**
		* Creates a new point with cartesian coordinates from a pair of polar coordinates
		* @method polar
		* @param length {Number} The length coordinate of the polar pair.
		* @param angle {Number} The angle, in radians, of the polar pair.
		* @return {Kiwi.Geom.Point} The new Cartesian Point object.
		* @public
		*/
		static polar(length: number, angle: number): Point {
			return new Point(length * Math.cos(angle), length * Math.sin(angle));
				   
		}

		/**
		* Returns true if the distance between this point and a target point is greater than or equal a specified distance.
		* This avoids using a costly square root operation
		* @method distanceCompare
		* @param target {Kiwi.Geom.Point} The Point object to use for comparison.
		* @param distance {Number} The distance to use for comparison.
		* @return {Boolean} True if distance is >= specified distance.
		* @public
		*/
		public distanceCompare(target: Point, distance: number): boolean {

			if (this.distanceTo(target) >= distance)
			{
				return true;
			}
			else
			{
				return false;
			}

		}

		/**
		* Determines whether this Point object and the given point object are equal. They are equal if they have the same x and y values.
		* @method equals
		* @param point {Kiwi.Geom.Point} The point to compare against.
		* @return {boolean} A value of true if the object is equal to this Point object; false if it is not equal.
		* @public
		*/
		public equals(toCompare: Point): boolean {

			if (this.x === toCompare.x && this.y === toCompare.y)
			{
				return true;
			}
			else
			{
				return false;
			}

		}

		/**
		* Determines a point between two specified points. 
		* The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2.
		*
		* The closer the value of the parameter f is to 1.0, 
		* the closer the interpolated point is to the first point (parameter pt1). 
		* The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
		*
		* @method interpolate
		* @param pointA{Kiwi.Geom.Point} The first Point object.
		* @param pointB {Kiwi.Geom.Point} The second Point object.
		* @param f {Number} The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
		* @return {Kiwi.Geom.Point} The new interpolated Point object.
		* @public
		*/
		public static interpolate(pointA:Point, pointB:Point, f:number):Point {
			
			var xDiff: number = pointB.x - pointA.x;
			var yDiff: number = pointB.y - pointA.y;
			return new Point(pointB.x - xDiff * f, pointB.y - yDiff * f);

		}

		/**
		* Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value.
		* The value of dy is added to the original value of y to create the new y value.
		*
		* @method offset
		* @param dx {Number} The amount by which to offset the horizontal coordinate, x.
		* @param dy {Number} The amount by which to offset the vertical coordinate, y.
		* @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
		* @public
		*/
		public offset(dx: number, dy: number): Point {

			this.x += dx;
			this.y += dy;

			return this;

		}


		/**
		* Sets the x and y values of this Point object to the given coordinates.
		* @method setTo
		* @param x {Number} The horizontal position of this point.
		* @param y {Number} The vertical position of this point.
		* @return {Kiwi.Geom.Point} This Point object. Useful for chaining method calls.
		* @public
		*/
		public setTo(x: number, y: number): Point {

			this.x = x;
			this.y = y;

			return this;

		}

		/**
		* Subtracts the coordinates of another point from the coordinates of this point to create a new point.
		* @method subtract
		* @param point {Kiwi.Geom.Point} The point to be subtracted.
		* @param output {Kiwi.Geom.Point} Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
		* @return {Kiwi.Geom.Point} The new Point object.
		* @public
		*/
		public subtract(point: Point, output: Point = new Point): Point {

			return output.setTo(this.x - point.x, this.y - point.y);

		}

		public getCSS(): string {

			return this.x + 'px ' + this.y + 'px';

		}

		/**
		* Returns a string representation of this object.
		* @method toString
		* @return {String} a string representation of the instance.
		* @public
		*/
		public toString(): string {

			return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';

		}

	}

}
