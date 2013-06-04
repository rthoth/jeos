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


	describe("Strange #3", function(){
		var polygon = jeos.Polygon.from([
			[4,-1],[0,3],[-1,-2],[1,-4],[0,-1],[-2,2],[-3,-3],[-2,-2],[-4,1],[-2,-4],[4,-2],[5,-1],[4,2],[2,-2]
		]);

		it("#1 have 7 cross points", function(){
			var intersections = jeos.searchIntersections(polygon.edges);
			should.exist(intersections);
			intersections = intersections.map(function (cross) {
				return cross[2].point;
			});
			intersections.should.lengthOf(7);
		});
	});


	describe.only("Strange #4", function(){
		var polygon = jeos.Polygon.from([
			[5,3],[0,-1],[3,-1],[1,-2],[0,5],[-2,0],[-3,-1],[-3,0],[-1,-1],[-3,1],[-5,2],[-2,-3],[2,-3]
		]);

		it("#1 have 5 cross points", function() {
			var intersections = jeos.searchIntersections(polygon.edges);
			should.exist(intersections);
			intersections.map(function (cross) {
				return cross[2].point;
			}).should.lengthOf(5);

		});
	});

});