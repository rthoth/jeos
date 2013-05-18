/**
	@module core
*/
(function (jeos) {

	/**
		It's a pseudo angle!

		@method angle
		@for jeos
		@static

		@param {Vector} vec Vector
		@returns {double} [0,8) angle value
	*/
	var angle = jeos.angle = function (vec) {
		var x = vec.i < 0 ? - vec.i : vec.i;
		var y = vec.j < 0 ? - vec.j : vec.j;
		var angle;

		if (x >= y)
			angle = y / x;
		else
			angle = 2 - x / y;

		if (vec.i < 0)
			angle = 4 - angle;

		if (vec.j < 0)
			angle = 8 - angle;

		return angle;
	};

})(
	function () {
		return this.jeos;
	}
);