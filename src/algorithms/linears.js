/**
	@module algorithms
*/
(function (jeos) {

	/**
		@method indexOf
		@static
		@for jeos

		@param {Point} r
		@param {Point} q
		@param {Vector} vec

		@returns {double} 
	*/
	var indexOf = jeos.indexOf = function (r, p, vec) {
		var dx = p.x - r.x, dy = p.y - r.y;
		return - (vec.i * dx + vec.j * dy) / (jeos.pow(vec.i,2) + jeos.pow(vec.j,2));
	};

})(
	function() {
		return this.jeos;
	}()
);