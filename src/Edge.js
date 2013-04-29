(function (jeos) {

	/**
		@type jeos.Edge
		
		Edge from P to Q
	*/
	var Edge = function (p, q) {
		this.p = p;
		this.q = q;
		this.pq = [q[0] - p[0], q[1] - p[1]];
	};

	Edge.prototype.next = null;
	Edge.prototype.previous = null;

	Edge.prototype.others = function (fn) {
		var current = this.next;
		while (current !== null && current !== this) {
			fn(current);
			current = current.next;
		}
	};

	Edge.from = function (coordinates) {
		var first = new Edge(coordinates[0], coordinates[1]);
		var last = first;
		var edges = [first];

		var limit = coordinates.length - 1;
		for (var i=1 ; i<limit; i++) {
			var current = new Edge(coordinates[i], coordinates[i + 1]);
			edges.push(current);
			last.next = current;
			current.previous = last;
			last = current;
		}

		last.next = first;
		first.previous = last;

		return edges;
	};

	var scalarProjection = function (edge, point, vector) {
		var a = vector[0],
				b = vector[1],
				c = edge.pq[0],
				d = edge.pq[1],
				xp = edge.p[0],
				yp = edge.p[1],
				xq = point[0],
				yq = point[1]
		;

		var internal = a*c + b*d;
		if (internal === 0)
			return NaN;

		var dx = xp - xq;
		var dy = yp - yq;

		return 0 - (b * dy + a * dx) / internal;

	};

	var between = function (min, max, value) {
		return value >= min && value <= max;
	};

	var b01 = function (value) {
		return between(0, 1, value);
	};

	var slowProjects = function (self, other) {
		var scalar = scalarProjection(other, self.q, self.pq);

		if (b01(scalar))
			return true;
		else {
			scalar = scalarProjection(other, self.p, self.pq);
			return b01(scalar);
		}
	};

	Edge.prototype.projects = function (other) {
		return fastProjects(this, other);
	};

	Edge.prototype.internal = function (other) {
		return this.pq[0] * other.pq[0] + this.pq[1] * other.pq[1];
	};

	Edge.prototype.length = function () {
		var x = this.pq[0] * this.pq[0];
		var y = this.pq[1] * this.pq[1];

		return Math.sqrt(x + y);
	};

	Edge.prototype.angle = function (other) {
		return Math.acos(this.internal(other) / (this.length() * other.length()));
	};

	jeos.Edge = Edge;

})(typeof window !== 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});