;(function(jeos) {
	var Edge = jeos.Edge;

	var WeightedOffset = function (coordinates) {
		this.edges = Edge.from(jeos.antiClockWise(coordinates));
	};

	var byDistance = function (reference) {
		return function (e1, e2) {
			return (e1.pd < e2.pd) ? -1 : ((e2.pd > e1.pd) ? 1 : 0);
		};
	};

	var preOrder = function (edge, opposite) {
		var pd = edge.distanceOfPoint(opposite.p);
		var qd = edge.distanceOfPoint(opposite.q);

		return (qd < pd) ? {
			edge: opposite.invert(), pd: qd, qd: pd
		} : {
			edge: opposite, pd: pd, qd: qd
		};
	};

	var between = function (value, min, max) {
		return value >= min && value <= max;
	};

	var projectInterval = function (edge, target) {
		var pIndex = target.indexOf(edge.p);
		if (!between(pIndex, 0,1))
			pIndex = target.indexOf(edge.pointAt(edge.indexOf(target.p)));

		var qIndex = target.indexOf(edge.q);
		if (!between(qIndex, 0,1))
			qIndex = target.indexOf(edge.pointAt(edge.indexOf(target.q)));

		var pDistance = edge.distanceOfPoint(target.pointAt(pIndex));
		var qDistance = edge.distanceOfPoint(target.pointAt(qIndex));

		return pIndex < qIndex ?
			[pIndex, qIndex, pDistance, qDistance] :
			[qIndex, pIndex, qDistance, pDistance];
	};

	var removeNeighbours = function (opposites, edge) {
		return opposites.slice(0).filter(function (neighbour, index) {
			if (neighbour.pd < edge.qd) {
				opposites.splice(index, 1);
				return true;
			}
			return false;
		});
	};

	var searchOverlaps = function (pi, pis) {
		var result = [];
		pis.forEach(function (opi, index) {
			var maxMin = Math.max(pi[0], opi[0]);
			var minMax = Math.min(pi[1], opi[1]);

			if (maxMin < minMax) {
				result.push(index);
			} else if (maxMin === minMax) {
				result.push(index);
			}
		});

		return result.length ? result : false;
	};

	var removeShadows = function (npi, shadows) {
		npi.slice(0).forEach(function (pi, piIndex) {
			var overlaps = searchOverlaps(pi, shadows);
			if (overlaps !== false) {
				overlaps.forEach(function(overlap) {
					
				});
			}
		});
	};

	var interpolation = function (interval, index) {
		var delta = (interval[3] - interval[2]) / (interval[1] - interval[0]);
		return interval[2] + (delta * (index - interval[0]));
	};

	var mergeOverlaps = function (pi, oPis, overlaps) {
		overlaps.forEach(function(index) {
			var otherPi = oPis[index];
			var pis = pi[0] <= otherPi[0] ? [pi, otherPi] : [otherPi, pi];
			var slices;

			var min = Math.max(pis[0][0], pis[1][0]), max = Math.min(pis[0][1], pis[1][1]);
			if (min === max) {
				// continuous...
				slices = pis;
			} else if (min < max) {
				slices = pis.reduce(function (left, right) {
					var result = [];
					if (left[0] < min)
						result.push([left[0], min, left[2], interpolation(left, min)]);

					var intersectionStartDistance = Math.min(interpolation(left, min), right[2]);
					var intersectionEndDistance = Math.min(left[3], interpolation(right, max));

					result.push([min, max, intersectionStartDistance, intersectionStartDistance]);

					if (right[1] > max)
						result.push([max, right[1], interpolation(right, max), right[3]]);

					return result;
				});
			}

			Array.prototype.splice.apply(oPis, [index, 1].concat(slices));
		});
	};

	var offsetOf = function (target, opposites, func) {
		var result = [];

		while (opposites.length) {
			var nearest = opposites.shift();
			var pis = [projectInterval(nearest.edge, target)];
			var neighbours = removeNeighbours(opposites, nearest);
			neighbours.forEach(function (neighbour) {
				var neighbourPi = projectInterval(neighbour.edge, target);
				var overlaps = searchOverlaps(neighbourPi, pis);
				if (overlaps)
					mergeOverlaps(neighbourPi, pis, overlaps);
				else
					pis.push(neighbourPi);
			});

			removeShadows(pis, result);
			result = result.concat(pis);
		}

		var offset = [];
		var calculateOffset = function (index,  distance) {
			var a = target.pq[0], b = target.pq[1];
			var x,y;
			if (a !== 0) {
				y = 0 - ((a * distance) / target.length());
				x = 0 - ((b / a) * y);
			} else {
				x = (b * distance) / target.length();
				y = 0 - ((a / b) * x);
			}
			var point = target.pointAt(index);
			return [point[0] + x, point[1] + y];
		};
		result.forEach(function (interval) {
			var off0 = func(interval[2]);
			var off1 = func(interval[3]);

			offset.push(calculateOffset(interval[0], off0));
			offset.push(calculateOffset(interval[1], off1));
		});

		return offset;
	};

	/**
		@method offset

		@parameter func (double)=>double based on distance between edges calculate offset
	*/
	WeightedOffset.prototype.offset = function(func) {
		var edges = this.edges;
		var self = this;

		var offsetCoordinates = edges.map(function (edge) {
			var opposites = [];
			edge.forOthers(function(other) {
				if (edge.projects(other) && edge.isLeft(other) && other.isLeft(edge))
					opposites.push(preOrder(edge, other));
			});

			opposites.sort(byDistance(edge));

			return offsetOf(edge, opposites, func);
		});

		return offsetCoordinates;
	};

	jeos.WeightedOffset = WeightedOffset;
})(
	(function(){return this.jeos;})()
);