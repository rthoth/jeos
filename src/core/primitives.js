/**
	@module core
*/
(function(jeos) {
	/**

		normal Point Relative Position

		@method normalPRP
		@static
		@for jeos
		@param {Vector} vec Normal vector
		@param {Point} p Reference point
		@param {Point} q Target point

		@returns {integer} 1: left, 0: collinear, 2: right
	*/
	var normalPRP = jeos.normalPRP = function (vec, p, q) {
		var lr = vec.j * (q.y - p.y) + vec.i * (q.x - p.x);
		// Remember: lr is inverse!
		return lr < 0 ? 1 : (lr > 0 ? 2 : 0);
	};

	/**
		@method clockWise
		@static
		@for jeos
		@param {Array} points Array of {{#crossLink "Point"}}{{/crossLink}}
		@returns {Integer} 1 clockWise, -1 counterClockWise and 0 is strange!
	*/

	var clockWise = jeos.clockWise = function (points) {
		var sum = 0;
		for (var i=0; i<points.length; i++) {
			var p = points[i];
			var q = points[(i+1) % points.length];

			sum += p.x * q.y - q.x * p.y;
		}

		return  sum > 0 ? -1 : (sum < 0 ? 1 : 0);
	};


	var straightPointDistance = jeos.spd = function (straightPoint, vec, point) {
		var vpa = jeos.vector(straightPoint, point);
		var z = vpa.i * vec.j - vpa.j * vec.i;

		return jeos.sqrt( (z * z) / (jeos.pow(vec.i, 2) + jeos.pow(vec.j, 2)));
	};

	/**
		Point Relative Position

		@method prp
		@for jeos
		@static
		@param {Point} p Origin point
		@param {Vector} vec Vector
		@param {Point} q Point
		@returns {Int} 1: Left, 0: Collinear, 2: Right
	*/
	var prp = jeos.prp = function (p, vec, q) {
		var z = vec.i * (q.y - p.y) - vec.j * (q.x - p.x);
		return (z > 0) ? 1 : (z < 0 ? 2: 0);
	};

})(
	function(){
		return this.jeos;
	}()
);