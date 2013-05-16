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

		others: function(edge) {
			return this.shell.filter(function (e) {
				return e !== edge;
			});
		},

		reverse: function () {
			var reverseRing = this.shell.map(function (edge) {
				return edge.p;
			});
			reverseRing.push(this.shell[0].p);

			return new Polygon(reverseRing.reverse());
		},

		toString: function() {
			return "Polygon(" + this.shell.join(',') + ')';
		}

	});

	Polygon.from = function (coordinates) {
		var shell = coordinates.map(function(coordinate) {
			return jeos.point(coordinate[0], coordinate[1]);
		});
		shell.push(shell[0]);

		return new Polygon(shell);
	};
})(function () {
	return this.jeos;
}());