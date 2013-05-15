;(function (jeos) {

	var vector = jeos.vector;

	var position = function (target, pPoint, qPoint, vec) {

		var pPosition = jeos.lOrR(vec, vector(pPoint, target));
		var qPosition = jeos.lOrR(vec, vector(qPoint, target));

		return pPosition | qPosition;
	};

	var projects0 = function (vec, pPoint, qPoint, aPoint, bPoint) {
		var aPosition = position(aPoint, pPoint, qPoint, vec);
		var bPosition = position(bPoint, pPoint, qPoint, vec);

		return (aPosition !== bPosition) ? true :
			aPosition === 3;
	};

	var projects = jeos.projects = function(pPoint, qPoint, aPoint, bPoint) {
		var vec = vector(pPoint, qPoint);
		return projects0(vec.normal(1), pPoint, qPoint, aPoint, bPoint);
	};

	jeos.Edge.prototype.projects = function (other) {
		return projects0(this.pq.normal(1), this.p, this.q, other.p, other.q);
	};

})(
	(function () { return this.jeos;})()
);