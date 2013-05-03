;(function (jeos) {

	var Edge = jeos.Edge;
	/**
		@type WeightedOffset

		@parameter coordinates [[double, double]+]
	*/
	var WeightedOffset = function (coordinates) {
		this.edges = Edge.from(coordinates);
	};

	/**
		@method offset

		@parameter offsetFunc (double)=>double based on distance between edges calculate offset
	*/
	WeightedOffset.prototype.offset = function(offsetFunc) {

		var edges = this.edges;
		var self = this;

		var offsetCoordinates = edges.map(function (edge) {

			var projections = [];

			edge.forOthers(function (other) {
				if (edge.projects(other))
					projections.push(other);
			});

			projections = projections.map(function (e) {
				var distances = [edge.distanceOfPoint(e.p) , edge.distanceOfPoint(e.q)];

				if (distances[1] < distances[0]) {
					e = e.invert();
					distances = distances.reverse();
				}

				return {
					edge: e, distances: distances
				};

			}).sort(function (e1, e2) {
				return (e1.distances[0] < e2.distances[0]) ? -1 : ((e2.distances[0] > e1.distances[0]) ? 1 : 0);
			});

			return offsetOf(edge, projections, offsetFunc);
		});

		return false;
	};


	var offsetOf = function (edge, projections, func) {
		while (projections.length > 0) {
			var process = projections.shift();
			var inclusive = projections.filter(function (other) {
				return other.distances[0] <= process.distances[1];
			});
		}
	};


	jeos.WeightedOffset = WeightedOffset;

})(typeof window === 'undefined' ? GLOBAL.jeos = GLOBAL.jeos || {} : window.jeos = window.jeos || {});