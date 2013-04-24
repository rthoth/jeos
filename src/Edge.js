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

		return (abdx + dy) / abcPdl;
	};


	Edge.prototype.projects = function (other) {
		var scalar = scalarProjection(other, this.q, this.pq);
		return scalar >= 0 || scalar === 0;
	};

	jeos.Edge = Edge;

})(typeof GLOBAL === 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});