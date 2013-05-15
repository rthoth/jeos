(function (jeos) {

	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		initialize: function (coordinates) {
			this.polygon = jeos.Polygon.from(coordinates).antiClockWise();
		}

	});

})(
	function () {
		return this.jeos;
	}()
);