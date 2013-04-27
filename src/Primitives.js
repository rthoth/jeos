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

	/**
		C is left of AB

		a - [double, double]
		b - [double, double]
		c - [double, double]
	*/

	jeos.isLeft = function (a, b, c) {

		var vector = external([b[0]-a[0], b[1] - a[1]], [c[0]-a[0],c[1]-a[1]]);

		return vector[2] > 0;
	};

	jeos.isRight = function (a, b, c) {
		var vector = external([a,b], [a,c]);

		return vector[2] < 0;
	};


	jeos.external = external;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});