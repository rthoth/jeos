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

		edges.forEach(function (edge) {

			var projections = [];

			edge.forOthers(function (other) {
				if (edge.projects(other))
					projections.push(other);
			});

		});

		return false;
	};


	jeos.WeightedOffset = WeightedOffset;

})(typeof window === 'undefined' ? GLOBAL.jeos = GLOBAL.jeos || {} : window.jeos = window.jeos || {});