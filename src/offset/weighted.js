(function(jeos){

	/**
		@class WeightedOffset
		@constructor
		@param {Polygon} polygon Polygon to offset
	*/
	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (polygon) {
			this.polygon = polygon.isClockWise() ? polygon.reverse() : polygon;
			this.emitter = new jeos.Emitter();
		},

		offset: function (func) {
			var edges = this.polygon.edges;
			var projections = jeos.detectProjections(edges, function (source, target) {
				return jeos.Projection.from(source, target);
			});
			this.emitter.fire('project', projections);

			var shadows = jeos.shadows(projections, func);
			this.emitter.fire('shadow', shadows);

			var raw = shadows.map(function (projections, edgeIndex) {
				var currentEdge = edges[edgeIndex];

				return projections.map(function  (proj) {
					var length = func(proj[1]);
					var externalVector = currentEdge.normal(-length);
					var point = currentEdge.pointAt(proj[0]);
					return jeos.point(point.x + externalVector.i, point.y + externalVector.j);
				});
			});
			this.emitter.fire('offset', raw);

			var result = jeos.sie(raw.reduce(function (current, next) {
				return current.concat(next);
			}, []));

			return result.map(function (ring) {
				return ring.map(function (point) {
					return [point.x, point.y];
				});
			});
		},

		on: function (evt, handler) {
			this.emitter.on(evt, handler);
			return this;
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