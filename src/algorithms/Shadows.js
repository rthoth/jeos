(function (jeos) {

	var sortBySIndex = function (proj1, proj2) {
		return (proj1.si < proj2.si) ? -1 : (proj2.si < proj1.si ? 1 : 0);
	};

	var remove = function (array, func) {
		var result = [];
		for (var i=0; i<array.length;) {
			if (func(array[i], i)) {
				result.push(array[i])
				array.splice(i, 1);
			} else
				i++;
		}
		return result;
	};

	var shadows = jeos.shadows = function (projections) {
		debugger;
		projections = projections.sort(sortBySIndex);

		var visible = projections.shift();
		var position = visible.si;
		var result = [];

		var intersections = remove(projections, function (proj) {
			return proj.si <= position;
		});

		var shadows = [];

		intersections.forEach(function (intersection) {
			position = intersection.si;
			if (intersection.valueAt(position) < visible.valueAt(position)) {

				result.push(visible.valueAt(position));
				result.push(intersection.valueAt(position));
				shadows.push(visible);
				visible = intersection;
			} else {
				shadows.push(intersection);
			}
		});

	};

})(
	function() {
		return this.jeos;
	}()
);