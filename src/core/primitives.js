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

})(
	function(){
		return this.jeos;
	}()
);