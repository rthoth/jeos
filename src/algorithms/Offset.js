(function (jeos) {

	var Offset = jeos.Offset = jeos.Type({
		initialize: function (polygon) {
			this.polygon = polygon;
		}
	});


	Offset.from = function (points) {
		return new Offset(jeos.Polygon.from(points));
	};


})(function () {
	return this.jeos;
}());