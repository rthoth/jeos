/**
	@module algorithms
*/
(function (jeos) {

	var indexOf = jeos.indexOf;

	var p2node = function (point) {
		return { point: point, next: null, back: null};
	};

	var nn2e = function (p, q) {
		return {
			$pN: p,
			$qN: q,
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
			q.back = p;
			edges.push(nn2e(p,q));
		}
		return [nodes, edges];
	};


	var merge = function (aNode, bNode, cNode) {
		aNode.next = bNode;
		bNode.next = cNode;
		cNode.back = bNode;
		bNode.back = aNode;
	};

	var mx = Math.max, mn = Math.min;
	var extractRing = function (current) {
		var x = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
		var y = [x[0], x[1]];

		var result = [];
		while (current && !current.visited) {
			result.push(current.point);
			x[0] = mn(x[0], current.point.x);
			x[1] = mx(x[1], current.point.x);
			y[0] = mn(y[0], current.point.y);
			y[1] = mx(y[1], current.point.y);

			current.visited = true;
			current = current.next;
		}

		result.clockWise = jeos.clockWise(result);
		result.x = x;
		result.y = y;
		if (result.clockWise === 0)
			throw new Error("Error, unexpected 0 clockwise!\n" + result);

		result.clockWise = result.clockWise === 1;
		return result;
	};

	var extractRings = function (nodes) {
		var result = [];
		nodes.forEach(function (node) {
			if (!node.visited)
				result.push(extractRing(node));
		});
		return result;
	};

	var nodeBackFrom = function (edge) {
		if (edge.pq.j > 0)
			return edge.$pN;

		if (edge.pq.j < 0)
			return edge.$qN.back;

		if (edge.pq.i > 0)
			return edge.$qN.back;

		if (edge.pq.i < 0)
			return edge.$pN;
	};

	var nodeNextFrom = function (edge) {
		if (edge.pq.j > 0)
			return edge.$pN.next;

		if (edge.pq.j < 0)
			return edge.$qN;

		if (edge.pq.i > 0)
			return edge.$qN;

		if (edge.pq.i < 0)
			return edge.$pN.next;
	};

	var pointYXSort = function (p1, p2) {
		if (p1.y > p2.y)
			return -1;

		if (p2.y > p1.y)
			return 1;

		if (p1.x < p2.x)
			return -1;

		if (p2.x > p2.x)
			return 1;

		return 0;
	};

	var yx = function (cr1, cr2) {
		return pointYXSort(cr1[2].point, cr2[2].point);
	};

	var contains = function (ring1, ring2) {
		if (ring2.x[0] < ring1.x[0] || ring2.x[1] > ring1.x[1])
			return false;
		else if (ring2.y[0] < ring1.y[0] || ring2.y[1] > ring1.y[1])
			return false;
		else
			return true;
	};

	var byContains = function (ring1, ring2) {
		if (contains(ring1, ring2))
			return -1;
		else if (contains(ring2, ring1))
			return 1;
		else
			return 0;
	};

	var container = function (ring) {
		return {
			ring: ring,
			childreen: null
		};
	};

	var containerTree = function (containers) {
		var root = containers.shift();

		var deep = function (root, containers) {
			var childreen = [], child;
			var filter = function (container) {
				return contains(child.ring, container.ring);
			};

			while (containers.length) {
				child = containers.shift();
				child.childreen = deep(child, jeos.$.remove(containers, filter));
				childreen.push(child);
			}

			return childreen.length ? childreen : null;

		};
		root.childreen = deep(root, containers);
		return root;
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
		nodes = nodes[0];

		jeos.searchIntersections(edges).sort(yx).forEach(function (intersection) {
			var e1 = intersection[0],
					e2 = intersection[1],
					crossPoint = intersection[2];


			var node1 = p2node(crossPoint.point),
					node2 = p2node(crossPoint.point);

			var e1back = nodeBackFrom(e1);
			var e1next = nodeNextFrom(e1);
			var e2back = nodeBackFrom(e2);
			var e2next = nodeNextFrom(e2);

			merge(e1back, node1, e2next);
			merge(e2back, node2, e1next);
		});

		var tree = containerTree(extractRings(nodes).sort(byContains).map(container));
		var shell = tree.ring.slice(0);

		var holes = tree.childreen ? (tree.childreen.filter(function (child) {
				return child.ring.clockWise;
			}).map(function (child) {
				return child.ring.slice(0);
			})
		) : [];


		holes.unshift(shell);
		return holes;
	};

})(
	function () {
		return this.jeos;
	}()

);