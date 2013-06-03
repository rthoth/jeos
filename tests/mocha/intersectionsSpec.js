describe("Intersections", function () {
	var should = require("should");

	describe("Triangle #1", function () {

		var polygon = jeos.Polygon.from([
			[2,3],[-6,4],[-6,2],[1,-4],[3,-2],[-1,4],[-1,0]
		]);

		it("#1", function () {
			var intersections = jeos.searchIntersections(polygon.edges);

			should.exist(intersections);
			intersections.should.lengthOf(3);
		});

	});

	describe("Strange #2", function () {
		var polygon = jeos.Polygon.from([
			[4,4],[-1,4],[-2,0],[3,3],[3,0],[-2,2],[2,-2],[1,-4],[-1,-2],[2,1],[0,3],[-3,3],[-3,-5],[4,-5]
		]);

		it("#1 have 8 cross points", function(){
			var intersections = jeos.searchIntersections(polygon.edges);

			should.exist(intersections);
			intersections.should.lengthOf(8);
		});
	});

});