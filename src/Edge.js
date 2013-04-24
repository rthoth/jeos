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
		var ab = vector[0] / vector[1];
		var dx = point[0] - edge.p[0];
		var dy = point[1] - edge.p[0];

		var abc = ab * edge.pq[0];
		var abdx = ab * dx;

		var abcPdl = abc + edge.pq[1];

		var scalar = (abdx + dy) / abcPdl;
		console.log(scalar);
		return scalar;
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

	jeos.Edge = Edge;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});