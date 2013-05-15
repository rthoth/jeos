(function(jeos){

	var edges = function (points) {
		var length = points.length - 1;
		var result = [];
		for (var i=0; i<length; i++)
			result.push(new jeos.Edge(points[i], points[i+1]));

		return result;
	};

	var Polygon = jeos.Polygon = jeos.Type({

		initialize: function (ring) {
			if (ring.length >= 4) {
				if (ring[0].equals(ring[ring.length-1])) {
					this.shell = edges(ring);
				} else
					throw new Error("Invalid Polygon!");
			} else
				throw new Error("Polygon must have 3 points!");
		},

		reverse: function () {
			var reverseRing = this.shell.map(function (edge) {
				return edge.p;
			});
			reverseRing.push(this.shell[0].p);

			return new Polygon(reverseRing);
		}

	});

	Polygon.from = function (points) {
		var shell = points.map(function(point) {
			return jeos.point(point[0], point[1]);
		});
		shell.push(shell[0]);

		return new Polygon(shell);
	};
})(function () {
	return this.jeos;
}());