/**
	@module algorithms
*/
(function(jeos){

	var pointAt = function (sp, svec, lp, lvec) {
		var dx = sp.x - lp.x, dy = sp.y - lp.y;
		var l_scalar_s = lvec.i * svec.i + lvec.j * svec.j;

		var scalar = - ((lvec.i * dx + lvec.j * dy) / l_scalar_s);

		var x = sp.x + scalar * svec.i;
		var y = sp.y + scalar * svec.j;

		return jeos.point(x, y);
	};

	var $m = function (p) {
		return (p.ed - p.sd) / (p.ei - p.si);
	};
	/**
		Represents projection in a edge
		@class Projection
		@constructor
		@param {number} si Start Index
		@param {number} sd Start Distance
		@param {number} ei End Index
		@param {number} ed End Distance
	*/
	var Projection = jeos.Projection = jeos.Type({
		initialize: function (si, sd, ei, ed) {
			this.si = si;
			this.sd = sd;
			this.ei = ei;
			this.ed = ed;
		},

		valueAt: function (x) {
			if (this.si === x)
				return this.sd;
			if (this.ei === x)
				return this.ed;

			if (this.$m === undefined) {
				this.$m = $m(this);
				this.$c = this.sd - this.$m * this.si;
			}

			return this.$m * x + this.$c;
		},

		toString: function() {
			return '[(' + this.si + ', ' + this.sd + '), (' + this.ei + ', ' + this.ed + ')]';
		}
	});

	/**
		From two edges!
		Source of projection and projection's target!

		@method from
		@static
		@param {Edge} other Edge source of projection
		@param {Edge} target Edge receive projection
		@returns {Projection}
	*/
	Projection.from = function (other, target) {
		var startPoint = other.p;
		var endPoint = other.q;
		var startIndex = jeos.indexOf(startPoint, target.p, target.pq);
		var endIndex = jeos.indexOf(endPoint, target.p, target.pq);

		if (endIndex < startIndex) {
			var t = startPoint;
			startPoint = endPoint;
			endPoint = t;

			t = endIndex;
			endIndex = startIndex;
			startIndex = t;
		}

		if (startIndex < 0) {
			startPoint = pointAt(startPoint, other.pq, target.p, target.pq);
			startIndex = 0;
		}

		if (endIndex > 1) {
			endPoint = pointAt(endPoint, other.pq, target.q, target.pq);
			endIndex = 1;
		}

		var si = startIndex;
		var sd = jeos.spd(target.p, target.pq, startPoint);

		var ei = endIndex;
		var ed = jeos.spd(target.p, target.pq, endPoint);

		return new Projection(si, sd, ei, ed);
	};

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

		var pp = jeos.prp(target.p, target.pq, source.p);
		var qp = jeos.prp(target.p, target.pq, source.q);

		if (!((pp | qp) & 1))
			return false;

		var pointValue = function (point)  {
			var rp = jeos.normalPRP(target.pq, target.p, point);
			var rq = jeos.normalPRP(target.pq, target.q, point);
			return rp | rq;
		};

		var vP = pointValue(source.p);
		var vQ = pointValue(source.q);

		var projects = vP !== vQ ? true : vQ === 3;

		if (projects) {
			var targetAngle = jeos.angle(target.pq);
			var sourceAngle = jeos.angle(source.pq);

			var delta = jeos.abs(targetAngle - sourceAngle);
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