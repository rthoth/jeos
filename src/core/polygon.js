(function (jeos) {

	/**
		@class Polygon

		@constructor
		@param {Array} points Array of {{#crossLink "Point"}}{{/crossLink}}
	*/
	var Polygon = jeos.Polygon = jeos.Type({
		initialize: function (points) {
			this.edges = [];
			this.points = points;
			for (var i=0; i<points.length; i++) {
				var p = points[i];
				var q = points[(i + 1) % points.length];
				this.edges.push(new jeos.Edge(p, q));
			}
		}
	});


	/**
		Array of coordinates, example:

		[[1,0], [0,1], [-1, 0]]


		@method from
		@static
		@param {Array} coordinates Array of coordinates
		@returns {Polygon}
	*/
	Polygon.from = function (coordinates) {
		return new Polygon(coordinates.map(function(coordinate){
			return jeos.point(coordinate);
		}));
	};
})(
	function() {
		return this.jeos;
	}()
);