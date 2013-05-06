;(function (jeos) {

	var orientedAngle, angleV2V, angle;

	angle = function (vec) {
		var x = (vec[0] < 0) ? 0 - vec[0] : vec[0];
		var y = (vec[1] < 0) ? 0 - vec[1] : vec[1];
		var angle;

		if (x >= y)
			angle = y / x;
		else
			angle = 2 - x / y;

		if (vec[0] < 0)
			angle = 4 - angle;

		if (vec[1] < 0)
			angle = 8 - angle;

		return angle;

	};

	angleV2V = function (vec1, vec2) {
		return angle(vec2) - angle(vec1);
	};

	orientedAngle = function (vec) {
		var x = (vec[0] < 0) ? 0 - vec[0] : vec[0],
				y = (vec[1] < 0) ? 0 - vec[1] : vec[1],
				angle
		;

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

	jeos.angle = angle;
	jeos.orientedAngle = orientedAngle;
	jeos.aV2V = angleV2V;

})(typeof GLOBAL !== 'undefined' ? GLOBAL.jeos = GLOBAL.jeos || {} : window.jeos = window.jeos || {});