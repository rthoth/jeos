(function(jeos) {

	var count = function (points) {
		var result = 0;
		var limit = points.length;
		for (var i=0; i<limit; i++) {
			var p = points[i];
			var q = points[(i+1) % points.length];
			var r = points[(i+2) % points.length];
			var z = (q.x - p.x) * (r.y - q.y);
			z -= (q.y - p.x) * (r.x - q.x);

			if (z > 0)
				result++;
			else if (z < 0)
				result--;
		}
		return result;
	};

	var isClockWise = jeos.isClockWise = function (points) {
		return count(points) < 0;
	};

	jeos.Polygon.prototype.isClockWise = function () {
		var points = this.shell.map(function(edge) {
			return edge.p;
		});

		//points.push(points[0]);
		return isClockWise(points);
	};

	jeos.Polygon.prototype.antiClockWise = function () {
		if (this.isClockWise())
			return this.reverse();
		else
			return this;
	};

})(
	function () {
		return this.jeos;
	}()
);