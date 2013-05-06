;(function (jeos) {

	var isLeft,
			isLR,
			isRight,
			vector
	;

	isLeft = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 1;
	};

	isLR = function (v1, v2) {
		var z = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		if (z > 0)
			z = 1;
		else if (z < 0)
			z = 2;

		return z;
	};

	isRight = function (a, b, c) {
		return isLR(vector(a,b), vector(a,c)) === 2;
	};

	vector = function (a, b) {
		return [b[0] - a[0], b[1] - a[1]];
	};


	jeos.isLeft = isLeft;
	jeos.isLR = isLR;
	jeos.isRight = isRight;
	jeos.vector = vector;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});