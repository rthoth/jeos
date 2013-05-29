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

			var raw = shadows.map(function (projections, edgeIndex) {
				var currentEdge = edges[edgeIndex];

				return projections.map(function  (proj) {
					var length = func(proj[1]);
					var externalVector = currentEdge.normal(-length);
					var point = currentEdge.pointAt(proj[0]);
					return jeos.point(point.x + externalVector.i, point.y + externalVector.j);
				});
			});

			var result = jeos.sie(raw, edges);

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


	var leftMiddleVector = function (u, v) {
		var lu = u.length();
		var lv = v.length();

		return jeos.vector([
			u.i/lu - v.i/lv,
			u.j/lu - v.j/lv
		]);
	};

	var rightMiddleVector = function (u, v) {
		var lu = u.length();
		var lv = v.length();

		return jeos.vector([
			v.i/lv - u.i/lu,
			v.j/lv - u.j/lv
		]);
	};

})(
	function(){
		return this.jeos;
	}()
);