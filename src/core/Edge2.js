(function (jeos) {

	var vector = jeos.vector;

	var Edge = jeos.Type({
		initialize: function (pPoint, qPoint) {
			this.p = pPoint;
			this.q = qPoint;

			this.pq = jeos.vector(pPoint, qPoint);
		},

		isLeftOf: function (other) {
			var result = jeos.lOrR(other.pq, vector(other.p, this.p)) |
			jeos.lOrR(other.pq, vector(other.p, this.q));

			return result === 1;
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