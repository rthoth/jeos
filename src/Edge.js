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

	Edge.from = function (coordinates) {
		var first = new Edge(coordinates[0], coordinates[1]);
		var limit = coordinates.length - 1;
		var last = first;
		for (var i=1 ; i<limit; i++) {
			var current = new Edge(coordinates[i], coordinates[i + 1]);
			last.next = current;
			last = current;
		}
		last.next = first;
		return first;
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
			return Infinity;

		var dx = xp - xq;
		var dy = yp - yq;

		return 0 - (b * dy + a * dx) / internal;

	};

	var between = function (min, max, value) {
		return value >= min && value <= max;
	}

	var b01 = function (value) {
		return between(0, 1, value);
	}

	Edge.prototype.projects = function (other) {
		var scalar = scalarProjection(other, this.q, this.pq);

		if (b01(scalar))
			return true;
		else {
			scalar = scalarProjection(other, this.p, this.pq);
			return b01(scalar);
		}
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

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});