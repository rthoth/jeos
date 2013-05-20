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
		},

		/**
			Returns i-th edge

			@method edge
			@param {integer} index 0 index

			@returns {Edge}
		*/
		edge: function (i) {
			return this.edges[i];
		},

		/**
			Polygon is ClockWise?

			@method isClockWise
			@returns {Boolean}
		*/
		isClockWise: function () {
			var clockWise = jeos.clockWise(this.points);
			if (clockWise === 1)
				return true;
			else if (clockWise === 0)
				throw new Error("Irregular polygon!");

			return false;
		},

		isCounterClockWise: function() {
			var clockWise = jeos.clockWise(this.points);
			if (clockWise === -1)
				return true;
			else if (clockWise === 0)
				throw new Error("Irregular polygon!");

			return false;
		},

		reverse: function() {
			return new Polygon(this.points.slice(0).reverse());
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