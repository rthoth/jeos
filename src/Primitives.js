;(function (jeos) {

	var external,
			internal,
			isLeft,
			isLR,
			isRight,
			angle,
			vector,
			angleVV
	;
	/**
		external product:
		v1 - [[double, double],[double,double]]
		v2 - [[double, double],[double,double]]
	*/
	external = function (v1, v2) {
		var k = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		return [0, 0, k];
	};

	internal = function (v1, v2) {
		return v1[0] * v2[1] + v1[1] * v2[0];
	};


	vector = function (a, b) {
		return [b[0] - a[0], b[1] - a[1]];
	};

	isLR = function (v1, v2) {
		var z = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		if (z > 0)
			z = 1;
		else if (z < 0)
			z = 2;

		return z;
	};

	isLeft = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 1;
	};

	isRight = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 2;
	};

	angle = function (vec) {
		var x = Math.abs(vec[0]), y = Math.abs(vec[1]);
		var angle;

		if (x > y)
			angle = y / x;
		else
			angle = 2 - x / y;

		if (vec[0] < 0)
			angle = 4 - angle;

		if (vec[1] < 0)
			angle = 0 - angle;

		return angle;
	};


	angleVV = function(v1, v2) {
		return angle(v2) - angle(v1);
	};

	jeos.external = external;
	jeos.vector = vector;
	jeos.isLR = isLR;
	jeos.isLeft = isLeft;
	jeos.isRight = isRight;
	jeos.angle = angle;
	jeos.angleVV = angleVV;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});