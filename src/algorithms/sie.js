/**
	@module algorithms
*/
(function (jeos) {

	var p2p = function (point) {
		return { point: point, next: null};
	};

	var pp2e = function (p, q) {
		var e = (p.point.y >= q.point.y) ?
				{p: p, q: q} : {p: q, q: p};

		e.pq = jeos.vector(e.p.point, e.q.point);
		return e;
	};

	var convert = function (raw) {
		raw = raw.slice(0);
		var first = p2p(raw[0][0]);
		raw[0].splice(0, 1);
		var last = first;

		var points = [];
		var edges = [];
		for (var ei=0; ei<raw.length; ei++) {
			for (var pi=0; pi<raw[ei].length; pi++) {
				var current = p2p(raw[ei][pi]);
				edges.push(pp2e(last, current));
				last.next = current;
				current.back = last;
				points.push(current);
				last = current;
			}
		}
		edges.push(pp2e(last, first));
		last.next = first;
		first.back = last;
		return [points, edges];
	};

	var byYX = function (o1, o2) {
			if (o1.p.point.y > o2.p.point.y)
				return -1;
			if (o2.p.point.y > o1.p.point.y)
				return 1;
			if (o1.p.point.x < o2.p.point.x)
				return -1;
			if (o2.p.point.x > o2.p.point.x)
				return 1;

			return 0;
	};

	var hasCross = function (e1, e2) {
		var e1_e2 = jeos.prp(e2.p.point, e2.pq, e1.p.point) | jeos.prp(e2.p.point, e2.pq, e1.q.point);
		var e2_e1 = jeos.prp(e1.p.point, e1.pq, e2.p.point) | jeos.prp(e1.p.point, e1.pq, e2.q.point);

		return e2_e1 === e1_e2 ? e1_e2 === 3 : false;
	};

	var crossPoint = function (e1, e2) {
		var dx = e2.p.point.x - e1.p.point.x;
		var dy = e2.p.point.y - e1.p.point.y;

		var z = e1.pq.i * e2.pq.j - e1.pq.j * e2.pq.i;

		var i1 = e2.pq.j * dx - e2.pq.i * dy;
		var i2 = e1.pq.j * dx - e1.pq.i * dy;

		i1 /= z;
		i2 /= z;

		var x = e1.p.point.x + i1 * e1.pq.i;
		var y = e1.p.point.y + i1 * e1.pq.j;


		return {
			point: jeos.point(x, y),
			i1: i1,
			i2: i2
		};
	};

	var searchIntersections = function (edges) {

		edges.sort(byYX);
		var result = jeos.$.result();
		var set = [];
		var y;
		var byY = function (edge) {
			return edge.q.point.y >= y;
		};

		edges.forEach(function (e, ei) {
			y = e.p.point.y;
			jeos.$.remove(set, byY);
			set.forEach(function (s, si) {
				if (hasCross(s, e))
					result(e, s, crossPoint(e, s));
			});
			set.push(e);
		});

		return result();
	};

	/**
		Self Intersection Eraser

		@method sie
		@static
		@for jeos

		@param {Array} raw Array of projections per edge
		@param {Array} edges Array of {{#crossLink "Edge"}}{{/crossLink}}

		@reeturns {Array}
	*/
	var sie = jeos.sie = function (raw, edges) {
		debugger;
		var points = convert(raw);
		var oEdges = points[1];
		points = points[0];
		var intersections = searchIntersections(oEdges);

		intersections.forEach(function (evt) {
			var ref = evt[0];
			var cross = evt[1];
			var intersection = evt[2];
			
		});

	};

})(
	function () {
		return this.jeos;
	}()

);