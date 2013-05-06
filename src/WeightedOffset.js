;(function (jeos) {

	var Edge = jeos.Edge;
	/**
		@type WeightedOffset

		@parameter coordinates [[double, double]+]
	*/
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

	var piOverlaps = function (pi, pis) {
		var result = [];
		pis.forEach(function (opi, index) {
			var maxMin = Math.max(pi[0], opi[0]);
			var minMax = Math.min(pi[1], opi[1]);

			if (maxMin < minMax) {
				result.push([maxMin, minMax, index]);
			} else if (maxMin === minMax) {
				result.push([Math.min(pi[0], opi[0]), Math.max(pi[1], opi[1]), index]);
			}
		});

		return result.length ? result : false;
	};

	var removeShadows = function (npi, shadows) {
		npi.slice(0).forEach(function (pi, piIndex) {
			var overlaps = piOverlaps(pi, shadows);
			if (overlaps !== false) {
				overlaps.forEach(function(overlap) {
					console.log(overlap);
				});
			}
		});
	};

	var offsetOf = function (target, opposites, func) {
		var result = [];
		while (opposites.length) {
			var nearest = opposites.shift();
			var pis = [projectInterval(nearest.edge, target)];
			var neighbours = removeNeighbours(opposites, nearest);
			neighbours.forEach(function (neighbour) {
				var npi = projectInterval(neighbour.edge, target);
				var overlaps = piOverlaps(npi, pis);
				if (overlaps)
					splitOverlaps(npi, pis, overlaps);

			});
			removeShadows(pis, result);
			result = result.concat(pis);
		}

		return result;
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

})(typeof window === 'undefined' ? GLOBAL.jeos = GLOBAL.jeos || {} : window.jeos = window.jeos || {});