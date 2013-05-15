(function (jeos) {

	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (coordinates) {
			this.polygon = jeos.Polygon.from(coordinates).antiClockWise();
		},

		offset: function (func) {
			var polygon = this.polygon;

			polygon.shell.forEach(function (edge) {
				var opposites = jeos.opposites(edge, polygon.others(edge), function () {
					
				});
			});
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