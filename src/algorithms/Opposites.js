(function(jeos) {

	/**
		@method opposites
	*/
	var opposites = jeos.opposites = function (edge, others, func) {
		var result = [];

		others.forEach(function (other) {
			if (edge.isLeftOf(other) && other.isLeftOf(edge) && edge.projects(other)) {
				if (func)
					result.push(func(other));
				else
					result.push(other);
			}
		});

		return result;
	};

})(
	function () { return this.jeos;}()
);