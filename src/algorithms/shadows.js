/**
	@module algorithms
*/
(function (jeos) {

	var isOut = function (p) {
		if (p.si < 0 || p.si > 1)
			throw new Error("si out!");
		if (p.ei < 0 || p.ei > 1)
			throw new Error("ei out!");
	};

	var byIndex = function (p1, p2) {
		isOut(p1);
		isOut(p2);

		if (p1.si < p2.si)
			return -1;
		else if (p2.si < p1.si)
			return 1;

		if (p1.sd < p2.sd)
			return -1;
		else if (p2.sd < p1.sd)
			return 1;

		if (p1.ei < p2.ei)
			return -1;
		else if (p2.ei < p1.ei)
				return 1;

		if (p1.ed < p2.ed)
			return -1;
		else if (p2.ed < p1.ed)
			return 1;
		else
			throw Error("Ouch!");
	};

	/**
		Calcute shadows and clean!

		@method shadows
		@static
		@for jeos

		@param {Array} projections Array of {{#crossLink "Projection"}}{{/crossLink}}
		@returns {Array} projections
	*/
	var shadows = jeos.shadows = function (projections) {
		var result = projections.map(function(projs) {
			var sorted = projs.sort(byIndex);

			return shadowsOf(sorted);
		});
	};

	var shadowsOf = function (projs) {
		var visible = projs.shift();
		var result = jeos.$.result();
		var position = visible.si;
		var shadows = [];

		var intersects = function (p) {
				return p.si < visible.ei;
		};

		var updateShadows = function () {
			for (var i=0; i < shadows.length;)
				if (shadows[i].ei <= position) {
					shadows.splice(i, 1);
				} else
					i++;
		};

		var shadower = function (p) {
			position = p.si;
			updateShadows();
			if (p.valueAt(position) < visible.valueAt(position)) {
				// swap...
				result(position, visible.valueAt(position));
				result(position, p.valueAt(position));
				shadows.unshift(visible);
				visible = p;
			} else {
				shadows.push(p);
			}
		};

		var nearestShadowed = function () {
			var indexToRemove = 0;
			var winner = shadows.reduce(function (winner, opponent, index) {
				if (opponent.valueAt(position) < winner.valueAt(position)) {
					indexToRemove = index;
					return opponent;
				}
				else
					return winner;
			});

			shadows.splice(indexToRemove, 1);
			return winner;
		};

		debugger;
		do {
			result(position, visible.valueAt(position));
			var intersection = jeos.$.remove(projs, intersects);
			intersection.forEach(shadower);
			while (shadows.length) {
				position = visible.ei;
				updateShadows();
				if (shadows.length) {
					result(position, visible.valueAt(position));
					visible = nearestShadowed();
					//result(position, visible.valueAt(position));
				}
			}
		} while (projs.length);

		result(visible.ei, visible.ed);

		return result();
	};

})(
	function() {
		return this.jeos;
	}()
);