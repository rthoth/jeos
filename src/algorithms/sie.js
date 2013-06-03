/**
	@module algorithms
*/
(function (jeos) {

	var p2node = function (point) {
		return { point: point, next: null};
	};

	var nn2e = function (p, q) {
		return {
			$pNode: p,
			$qNode: q,
			p: p.point,
			q: q.point,
			pq: jeos.vector(p.point, q.point)
		};
	};

	var convert = function (raw) {
		var nodes = raw.map(p2node);
		var edges = [];
		for (var i=0 ; i<nodes.length; i++) {
			var p = nodes[i];
			var q = nodes[(i + 1) % nodes.length];
			p.next = q;
			edges.push(nn2e(p,q));
		}
		return [nodes, edges];
	};

	/**
		Self Intersection Eraser

		@method sie
		@static
		@for jeos

		@param {Array} raw Array of points

		@reeturns {Array}
	*/
	var sie = jeos.sie = function (raw) {
		var nodes = convert(raw);
		var edges = nodes[1];
		var nodes = nodes[0];

		var intersections = jeos.searchIntersections(edges);
		var forgotten = [];

		var merge = function (ref, cross, crossPoint) {
			return $merge(ref, cross, crossPoint, forgotten);
		};


		intersections.forEach(function (evt) {
			var ref = evt[0];
			var cross = evt[1];
			var crossPoint = evt[2];
			switch (jeos.prp(ref.p, ref.pq, cross.q)) {
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