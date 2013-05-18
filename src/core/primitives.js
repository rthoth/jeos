/**
	@module core
*/
(function(jeos) {
	/**

		Q is left or right of P?

		@method normalLorR
		@static
		@for jeos
		@param {Vector} vec Normal vector
		@param {Point} p Reference point
		@param {Point} q Target point

		@returns {integer} 1 is left, 2 is right and 0 is collinear
	*/
	var normalLorR = jeos.normalLorR = function (vec, p, q) {
		var z = vec.j * (q.y - p.y) + vec.i * (q.x - p.x);

		return z > 0 ? 2 : (z < 0 ? 1 : 0);
	};

	/**
		@method clockWise
		@static
		@for jeos
		@param {Array} points Array of {{#crossLink "Point"}}{{/crossLink}}
	*/

	var clockWise = jeos.clockWise = function (points) {
		for (var i=0; i<points.length; i++) {
			var p = points[i];
			var q = points[(i+1) % points.length];
			var r = points[(i+2) % points.length];
			var z = (q.x - p.x) * (r.y - q.y);
			z -= (q.y - p.y) * (r.x - q.x);

			if (z > 0)
				count++;
			else if (z < 0)
				count--;
		}

		return clockWise;
	};

})(
	function(){
		return this.jeos;
	}()
);