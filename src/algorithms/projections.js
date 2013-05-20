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
		var pointValue = function (point)  {
			var rp = jeos.normalPRP(target.pq, target.p, point);
			var rq = jeos.normalPRP(target.pq, target.q, point);
			return rp | rq;
		};

		var vP = pointValue(source.p);
		var vQ = pointValue(source.q);

		var projects = vP !== vQ ? true : vQ === 3;

		debugger;

		if (projects) {
			var targetAngle = jeos.angle(target.pq);
			var sourceAngle = jeos.angle(source.pq);

			var delta = Math.abs(targetAngle - sourceAngle);
			projects = delta > 2 && delta < 6;
		}

		return projects;
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
		for (var i=0; i < edges.length; i++) {
			var projections = [];
			for (var j=0; j < edges.length; j++) {
				if (j !== i && hasProjection(edges[j], edges[i])) {
					if (func)
						projections.push(func(edges[j], edges[i]));
					else
						projections.push(edges[j]);
				}
			}
			result.push(projections);
		}
		return result;
	};

})(
	function () {
		return this.jeos;
	}()
);