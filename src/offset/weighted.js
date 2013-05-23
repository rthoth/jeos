(function(jeos){

	/**
		@class WeightedOffset
		@constructor
		@param {Polygon} polygon Polygon to offset
	*/
	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (polygon) {
			this.polygon = polygon.isClockWise() ? polygon.reverse() : polygon;
		},

		offset: function (func) {
			var edges = this.polygon.edges;
			var projections = jeos.detectProjections(edges, function (source, target) {
				return jeos.Projection.from(source, target);
			});

			var shadows = jeos.shadows(projections, func);

			var result = [];
			shadows.forEach(function (projections, edgeIndex) {
				var edge = edges[edgeIndex];

				projections.forEach(function  (proj) {
					var length = func(proj[1]);
					var externalVector = edge.normal(-length);
					var point = edge.pointAt(proj[0]);
					result.push([point.x + externalVector.i, point.y + externalVector.j]);
				});
			});

			return result;
		}
	});

	/**
		Create a WeightedOffset form Array of coordinates
		@method from
		@static
		@param {Array} coordinates Array of coordinates
		@returns {WeightedOffset}
	*/
	WeightedOffset.from = function (coordinates) {
		return new WeightedOffset(jeos.Polygon.from(coordinates));
	};

})(
	function(){
		return this.jeos;
	}()
);