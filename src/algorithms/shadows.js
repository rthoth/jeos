/**
	@module algorithms
*/
(function (jeos) {

	var isOut = function (p) {
		if (p.si < 0)
			throw new Error("Start index invalid!");
		if (p.ei > 1)
			throw new Error("End index invalid!");
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
			return scanLine(projs.slice(0).sort(byIndex));
		});
	};

	/**

		@method scanLine
		@for jeos
		@static
		@private
	*/
	var scanLine = function (projs) {
		var result = jeos.$.result();
		var visible = projs.shift();
		var position = visible.si;
		var shadoweds = [];
		var next;

		debugger;
		var checkShadoweds = function () {
			jeos.$.remove(shadoweds, function (proj) {
				return proj.ei <= position;
			});
		};

		var nearestShadowed = function () {
			var index2Remove = 0;
			var nearest = shadoweds.reduce(function (winner, opponet, index) {
				if (opponet.valueAt(position) < winner.valueAt(position)) {
					index2Remove = index;
					return opponet;
				} else
					return winner;
			});
			shadoweds.splice(index2Remove, 1);
			return nearest;
		};

		result(position, visible.valueAt(position));
		while (projs.length) {
			next = projs.shift();
			while (visible.ei < next.si) {
				if (position !== visible.ei) {
					position = visible.ei;
					checkShadoweds();
					result(position, visible.valueAt(position));
				}
				visible = nearestShadowed();
				result(position, visible.valueAt(position));
			}

			position = next.si;
			checkShadoweds();

			if (next.valueAt(position) < visible.valueAt(position)) {
				result(position, visible.valueAt(position));
				result(position, next.valueAt(position));
				shadoweds.unshift(visible);
				visible = next;
			} else {
				shadoweds.push(next);
			}
		}
		position = visible.ei;
		result(position, visible.valueAt(position));
		checkShadoweds();
		if (shadoweds.length) {
			visible = nearestShadowed();
			result(position, visible.valueAt(position));
			while (shadoweds.length) {
				position = visible.ei;
				checkShadoweds();
				result(position, visible.valueAt(position));
				visible = nearestShadowed();
				result(position, visible.valueAt(position));
			}
			position = visible.ei;
			result(position, visible.valueAt(position));
		}

		return result();
	};

})(
	function() {
		return this.jeos;
	}()
);