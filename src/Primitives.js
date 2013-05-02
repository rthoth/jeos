;(function (jeos) {

	/**
		external product:
		v1 - [[double, double],[double,double]]
		v2 - [[double, double],[double,double]]
	*/
	var external = function (v1, v2) {
		var k = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		return [0, 0, k];
	};

	var vector = function (a, b) {
		return [b[0] - a[0], b[1] - a[1]];
	};

	var isLR = function (v1, v2) {
		var z = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		if (z > 0)
			z = 1;
		else if (z < 0)
			z = 2;

		console.log({"DEBUG": "isLR", v1: v1, v2: v2, z: z});

		return z;
	};

	jeos.isLR = isLR;

	/**
		C is left of AB

		a - [double, double]
		b - [double, double]
		c - [double, double]
	*/


	jeos.isLeft = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 1;
	};

	jeos.isRight = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 2;
	};

	jeos.external = external;
	jeos.vector = vector;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});