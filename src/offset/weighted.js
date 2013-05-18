(function(jeos){

	/**
		@class WeightedOffset
		@constructor
		@param {Polygon} polygon Polygon to offset
	*/
	var WeightedOffset = jeos.WeightedOffset = jeos.Type({

		intialize: function (polygon) {
			this.polygon = polygon.isClockWise() ? polygon.reverse() : polygon;
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
		return new WeightedOffset(Polygon.from(coordinates));
	};

})(
	function(){
		return this.jeos;
	}()
);