/**
	Core fo jeos
	@module core
*/

/**
	@class jeos
	@static
*/
(function(jeos) {

	var pow = jeos.pow = Math.pow;
	var sqrt = jeos.sqrt = Math.sqrt;

	/**
		@class Type
	*/
	var Type = jeos.Type = function (prototype) {
		var type = function () {
			if (this.initialize)
				this.initialize.apply(this, arguments);
		};

		for (var key in prototype) {
			if (prototype.hasOwnProperty(key))
				type.prototype[key] = prototype[key];
		}

		return type;
	};

	/**
		Axiomatic truth

		@class Point
	*/
	/**
		@property {double} x
	*/
	/**
		@property {double} y
	*/
	var Point = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Point.prototype.toString = function () {
		return "(" + this.x + ", " + this.y + ")";
	};

	/**

		2D point

		@method point
		@for jeos
		@static
		@param {double} x x coordinate
		@param {double} y y coordinate
		@returns {Point} point

	*/

	/**
		2D point
		@method point
		@static
		@for jeos
		@param {Array} array Coordinates with a array size 2
	*/
	var point = jeos.point = function (arg1, arg2) {
		if (arguments.length === 1)
			return new Point(arg1[0], arg1[1]);
		else
			return new Point(arg1, arg2);
	};

	/**
		Another axiomatic truth

		2D Vector
		@class Vector
	*/

	/**
		I vector vale
		@property i
		@type double
	*/

	/**
		J vector value
		@property j
		@type double
	*/

	var Vector = function (i, j) {
		this.i = i;
		this.j = j;
	};

	/**
		Returns length of vector
		@method length
		@returns {double}
	*/
	Vector.prototype.length = function () {
		return sqrt(pow(this.i, 2) + pow(this.j, 2));
	};

	/**
		Returns reverse vector
		@method reverse
		@returns {Vector}
	*/
	Vector.prototype.reverse = function () {
		return new Vector(-this.i, -this.j);
	};

	/**
		@method vector
		@for jeos
		@static

		@param {Point} originPoint
		@param {Point} targetPoint

		@returns {Vector} vector
	*/

	/**
		Simple form!

		@method vector
		@for jeos
		@static

		@param {Array} array Coordinates
	*/
	var vector = jeos.vector =  function (arg1, arg2) {
		if (arguments.length === 1)
			return new Vector(arg1[0], arg1[1]);
		else
			return new Vector(
				arg2.x - arg1.x,
				arg2.y - arg1.y
			);
	};

})(
	function () {
		this.jeos = {
			toString: "jeos"
		};
		return this.jeos;
	}()
);