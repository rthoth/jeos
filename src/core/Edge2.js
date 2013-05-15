(function (jeos) {

	var Edge = jeos.Type({
		initialize: function (pPoint, qPoint) {
			this.p = pPoint;
			this.q = qPoint;

			this.pq = jeos.vector(pPoint, qPoint);
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