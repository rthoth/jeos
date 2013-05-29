describe("Self Intersection Eraser", function () {

	describe("Strange #1", function(){
		var points = [
			[4,4],[-1,4],[-2,0],[3,3],[3,0],[-2,2],[2,-2],[1,-4],[-1,-2],[2,1],[0,3],[-3,3],[-3,-5],[4,-5]
		].map(function (coordinate) {
			return jeos.point(coordinate);
		});

		it("#1", function() {
			var polygon = jeos.sie(points);
		});
	});

});