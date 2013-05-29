/**
	@module algorithms
*/
(function (jeos) {

	var p2p = function (point) {
		return { point: point, next: null, back: null};
	};

	var pp2e = function (p, q) {
		return {
			$p: p,
			$q: q,
			p: p.point,
			q: q.point,
			pq: jeos.vector(p.point, q.point)
		};
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


	var originUpdate = function (origin, crossPoint) {
		origin.next = crossPoint;
		crossPoint.back = origin;
	};

	var targetUpdate = function (target, crossPoint) {
		crossPoint.next = target;
		target.back = crossPoint;
	};

	var $merge = function (ref, cross, crossPoint, forgotten) {
		var origin = ref.$p;
		if (origin.next)
			forgotten.push(origin.next);

		originUpdate(origin, crossPoint);

		var target = cross.$q;
		if (target.back)
			forgotten.push(target.back);

		targetUpdate(target, crossPoint);
	};

	var visit = function (current) {
		var result = [];
		var closed = false;
		while (current && !current.visited) {
			result.push(current.point);
			current.visited = true;
			current = current.next;
			if (current && current.visited)
				closed = true;
		}

		return closed ? result : false;
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
		var points = convert(raw);
		var oEdges = points[1];
		points = points[0];
		var intersections = jeos.searchIntersections(oEdges);
		var forgotten = [];

		var merge = function (ref, cross, crossPoint) {
			return $merge(ref, cross, crossPoint, forgotten);
		};


		intersections.forEach(function (evt) {
			var ref = evt[0];
			var cross = evt[1];
			var crossPoint = evt[2];
			switch (jeos.prp(ref.$p.point, ref.pq, cross.$q.point)) {
				case 0:
					throw new Error("Unexpected collinear!");
				case 2:
					// from in to out
					merge(ref, cross, crossPoint);
					break;
				case 1:
					// from out to in
					merge(cross, ref, crossPoint);
					break;
				default:
					throw new Error("Really Unexpected!");
			}
		});

		var rings = [];

		for (var i=0; i<points.length; i++) {
			var point = points[i];
			if (!point.visited) {
					var ring = visit(point);
					if (ring && ring.length > 2)
						rings.push(ring);
			}
		}

		var shell, holes = [];

		rings.forEach(function (ring) {
			if (jeos.clockWise(ring) === -1) {
					shell = ring;
				/*if (!shell)
				else{

					//throw new Error("It already has a shell!");
				}*/
			} else
				holes.push(ring);
		});

		return [shell].concat(holes);
	};

})(
	function () {
		return this.jeos;
	}()

);