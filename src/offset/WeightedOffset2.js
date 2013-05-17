(function (jeos) {

	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (coordinates) {
			this.polygon = jeos.Polygon.from(coordinates).antiClockWise();
		},

		offset: function (func) {
			var polygon = this.polygon;

			var distances = polygon.shell.map(function (edge) {
				var projections = jeos.opposites(edge, polygon.others(edge), function (opposite) {

					return new jeos.Projection(opposite, edge);
				});

				return jeos.shadows(projections);
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