/**
	@module algorithms
*/
(function (jeos) {

	var mapper = function (edge) {
		return {
			$: edge,
			x: [edge.p.x, edge.q.x].sort(),
			y: [edge.p.y, edge.q.y].sort()
		};
	};

	var byYX = function (o1, o2) {
		if (o1.y[1] > o2.y[1])
			return -1;
		else if (o2.y[1] > o1.y[1])
			return 1;

		if (o1.x[0] < o2.x[0])
			return -1;
		else if (o2.x[0] < o1.x[0])
			return 1;

		return 0;
	};

	var hasCross = function (e1, e2) {
		var e1_e2 = jeos.prp(e2.p, e2.pq, e1.p) | jeos.prp(e2.p, e2.pq, e1.q);
		var e2_e1 = jeos.prp(e1.p, e1.pq, e2.p) | jeos.prp(e1.p, e1.pq, e2.q);

		return e2_e1 === e1_e2 ? e1_e2 === 3 : false;
	};

	/**
		@class CrossPoint
	*/
	/**
		@property point
		@type {Point}
	*/
	/**
		Index on edge 0
		@property i0
		@type {double}
	*/
	/**
		Index on edge 1
		@property i1
		@type {double}
	*/
	var crossPoint = function (e1, e2) {
		var dx = e2.p.x - e1.p.x;
		var dy = e2.p.y - e1.p.y;

		var z = e1.pq.i * e2.pq.j - e1.pq.j * e2.pq.i;

		var i1 = e2.pq.j * dx - e2.pq.i * dy;
		var i2 = e1.pq.j * dx - e1.pq.i * dy;

		i1 /= z;
		i2 /= z;

		var x = e1.p.x + i1 * e1.pq.i;
		var y = e1.p.y + i1 * e1.pq.j;


		return {
			point: jeos.point(x, y),
			i0: i1,
			i1: i2
		};
	};

	/**
		@method searchIntersections
		@static
		@for jeos

		@returns {Array} array of [edge0, edge1, {{#crossLink "CrossPoint"}}{{/crossLink}}]
	*/
	var searchIntersections = jeos.searchIntersections = function (edges) {
		edges = edges.map(mapper).sort(byYX);
		var result = jeos.$.result();
		var testSet = [];
		var y;
		var upperYtest = function (edge) {
			return edge.y[0] >= y;
		};

		edges.forEach(function (e, ei) {
			y = e.y[1];
			jeos.$.remove(testSet, upperYtest);
			testSet.forEach(function (s, si) {
				if (hasCross(e.$, s.$))
					result(e.$, s.$, crossPoint(e.$, s.$));
			});
			testSet.push(e);
		});

		return result();
	};

})(
	function () {
		return this.jeos;
	}()
);