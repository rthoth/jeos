describe.only("Intersections", function () {
	var should = require("should");

	describe("Triangule", function () {

		debugger;
		var polygon = jeos.Polygon.from([
			[2,3],[-6,4],[-6,2],[1,-4],[3,-2],[-1,4],[-1,0]
		]);

		it("#1", function () {
			var intersections = jeos.searchIntersections(polygon.edges);

			should.exist(intersections);
			intersections.should.lengthOf(4);
		});

	});

});