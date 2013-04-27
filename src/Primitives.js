;(function (jeos) {

	/**
		external product:
		v1 - [[double, double],[double,double]]
		v2 - [[double, double],[double,double]]
	*/
	var external = function (v1, v2) {
		var k = (v1[0] * v2[1]) - (v1[1] * v2[0]);
		console.log({
			v1: v1, v2: v2, k: k
		});

		return [0, 0, k];
	};

	var vector = function (a, b) {
		return [b[0] - a[0], b[1] - a[1]];
	};

	/**
		C is left of AB

		a - [double, double]
		b - [double, double]
		c - [double, double]
	*/

	jeos.isLeft = function (a, b, c) {

		var vec = external(vector(a,b), vector(a,c));

		return vec[2] > 0;
	};

	jeos.isRight = function (a, b, c) {
		var vec = external(vector(a,b), vector(a,c));

		return vec[2] < 0;
	};


	jeos.external = external;
	jeos.vector = vector;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});