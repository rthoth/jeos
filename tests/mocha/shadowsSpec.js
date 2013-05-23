describe("Shadows", function (){
	var should = require("should");

	/*describe("Strange #02", function(){
		var polygon = jeos.Polygon.from([
			[3,0],[0,1],[3,2],[3,3],[-4,3],[0,-1],[-1,-2],[-3,-1],[-4,-2],[-3,-3],[-1,-3],[1,-1]
		]);

		var projections = jeos.detectProjections(polygon.edges, function (source, target) {
			return jeos.Projection.from(source, target);
		});

		var result = jeos.shadows(projections);

		it("Ok!", function(){
			should.exist(result);
			result.should.lengthOf(0);
		});
	});
*/

	describe.only("Star", function() {
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		var projections = jeos.detectProjections(star.edges, function (source, target) {
			return jeos.Projection.from(source, target);
		});

		var test = function (index, expected) {
			return function() {
				debugger;
				should.exist(projections);
				should.exist(projections[index]);
				var shadows = jeos.shadows([projections[index]]);
				shadows.should.lengthOf(expected.length);
			};
		};

		it("1st edge", test(0, []));
	});

});