(function(jeos) {

	var isValid = function (e1, e2) {
		var ae1 = jeos.pAngle(e1.pq),
				ae2 = jeos.pAngle(e2.pq);

		var delta = Math.abs(ae2 - ae1);
		debugger;
		return delta > 2 && delta <= 6;
	};

	/**
		@method opposites
	*/
	var opposites = jeos.opposites = function (edge, others, func) {
		var result = [];

		others.forEach(function (other) {
			if (edge.isLeftOf(other) && other.isLeftOf(edge) && edge.projects(other)) {
				if (isValid(other, edge)) {
					if (func)
						result.push(func(other));
					else
						result.push(other);
				}
			}
		});

		return result;
	};

})(
	function () { return this.jeos;}()
);