/**
	@module algorithms
*/
(function(jeos){

	/**
		Represents projection in a edge
		@class Projection
		@constructor
		@param {Edge} other Edge source of projection
		@param {Edge} target Edge receive projection
	*/
	var Projection = jeos.Projection = jeos.Type({
		initialize: function (other, target) {
		}
	});

	/**
		Detect has projection between edges (in counter clockwise orientation)

		@method hasProjection
		@static
		@for jeos
		@param {Edge} source Edge source of projection
		@param {Edge} target Edge receive projection

		@returns {Boolean}
	*/
	var hasProjection = jeos.hasProjection = function (source, target) {
		
	};

	/**
		Determine projections between edges!


		@method detectProjections
		@static
		@for jeos

		@param {Array} edges Array of {{#crossLink "Edge"}}{{/crossLink}} Counter ClockWise ordered
		@param {Function} func Callback function, arguments are other, current

		@returns {Array} Array with projections result per edge
	*/
	var detectProjections = jeos.detectProjections = function (edges, func) {
		var result = [];
		for (var i=0; i<edges.length; i++) {
			var projections = [];
			for (var j=0; i<edges.length; j++) {
				if (j !== i && hasProjection(edges[j], edges[i]))
					if (func)
						projections.push(func(edges[j], edges[i]));
					else
						projections.push(edges[i]);
				}
			}
		}
	};

})(
	function () {
		return this.jeos;
	}()
);