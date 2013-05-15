(function (jeos) {

	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (coordinates) {
			this.polygon = jeos.Polygon.from(coordinates).antiClockWise();
		},

		offset: function (func) {
			var polygon = this.polygon;

			var distances = polygon.shell.map(function (edge) {
				var opposites = jeos.opposites(edge, polygon.others(edge), function (opposite) {
					var pDistance = edge.distanceOfPoint(opposite.p);
					var qDistance = edge.distanceOfPoint(opposite.q);

					return pDistance <= qDistance ?
						{
							edge: opposite,
							p: pDistance,
							q: qDistance
						} : {
							edge: opposite.revese(),
							p: qDistance,
							q: pDistance
						};
				}).sort(function (o1, o2) {
					return o1.p < o2.p ? -1 : (o2.p > o1.p ? 1 : 0);
				});

				return jeos.distances(edge, opposites);
			});

			console.log(distances);
		},

		toString: function () {
			return "WeightedOffset(" + this.polygon + ")";
		}

	});

})(
	function () {
		return this.jeos;
	}()
);