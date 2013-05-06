;(function (jeos) {

	var antiClockWise;

	var vector = jeos.vector;

	antiClockWise = function (coordinates) {
		var pivot = coordinates.reduce(function(p1, p2) {
			return [p1[0]+p2[0], p1[1]+p2[1]];
		});

		pivot[0] = pivot[0] / coordinates.length;
		pivot[1] = pivot[1] / coordinates.length;

		var pivotAngle = function (p1, p2) {
			var result = jeos.aV2V(vector(pivot, p1), vector(pivot, p2));
			return result > 0 ? 1 : -1;
		};

		var length = coordinates.length - 1;
		var ng = pivotAngle(coordinates[length], coordinates[0]);

		for (var i=0; i < length; i++)
			ng += pivotAngle(coordinates[i], coordinates[i+1]);

		return (ng < 0) ? coordinates.slice(0).reverse() : coordinates;
	};

	jeos.antiClockWise = antiClockWise;

})(typeof GLOBAL !== 'undefined' ? GLOBAL.jeos : window.jeos);