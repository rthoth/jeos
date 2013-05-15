(function (jeos) {

	var vector = jeos.vector;

	var Edge = jeos.Type({
		initialize: function (pPoint, qPoint) {
			this.p = pPoint;
			this.q = qPoint;

			this.pq = vector(pPoint, qPoint);
		},

		distanceOfPoint: function (point) {
			var vpa = vector(this.p, point);
			var z = vpa.i * this.pq.j - vpa.j * this.pq.i;

			return Math.sqrt( (z * z) / (Math.pow(this.pq.i, 2) + Math.pow(this.pq.j, 2)));
		},

		isLeftOf: function (other) {
			var result = jeos.lOrR(other.pq, vector(other.p, this.p)) |
			jeos.lOrR(other.pq, vector(other.p, this.q));

			return result === 1;
		},

		reverse: function() {
			return new Edge(this.qPoint, this.pPoint);
		},

		toString: function() {
			return 'Edge(' + this.p + ',' + this.q + ')';
		}
	});

	jeos.Edge = Edge;

	jeos.Edge.from = function (p, q) {
		return new Edge(jeos.point(p[0],p[1]), jeos.point(q[0], q[1]));
	};

})(function(){
	return this.jeos;
}());