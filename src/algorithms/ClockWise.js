(function(jeos) {

	var isClockWise = jeos.isClockWise = function (points) {
		var delta = 0;
		var limit = points.length - 1;
		for (var i=0; i<limit; i++) {
			var p = points[i];
			var q = points[(i+1) % limit];
			var n = points[(i+2) % limit];

			if (n.leftOf(p, q))
				delta++;
			else if (n.rightOf(p,q))
				delta--;
		}

		return delta < 0;
	};

	jeos.Polygon.prototype.isClockWise = function () {
		var points = this.shell.map(function(edge) {
			return edge.p;
		});
		points.push(points[0]);
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