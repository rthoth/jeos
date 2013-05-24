describe("Shadows", function (){
	var should = require("should");

	describe("Strange #02", function(){
		var polygon = jeos.Polygon.from([
			[3,0],[0,1],[3,2],[3,3],[-4,3],[0,-1],[-1,-2],[-3,-1],[-4,-2],[-3,-3],[-1,-3],[1,-1]
		]);

		var projections = jeos.detectProjections(polygon.edges, function (source, target) {
			return jeos.Projection.from(source, target);
		});

		var test = function (index, expected) {
			return function () {
				should.exist(projections);
				should.exist(projections[index]);
				var shadows = jeos.shadows([projections[index]]);
				shadows.should.lengthOf(1);
				shadows[0].should.lengthOf(expected.length);
				//shadows[0].should.eql(expected);
			};
		};

		it("1st edge", test(0, [0,0,0,0,0]));
		it("2nd edge", test(1, [1,2]));
		it("3rd edge", test(2, [1,2]));
		it("4th edge", test(3, [1,2,3,4]));
	});

	describe("Star", function() {
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		var projections = jeos.detectProjections(star.edges, function (source, target) {
			return jeos.Projection.from(source, target);
		});

		var test = function (index, expected) {
			return function() {
				should.exist(projections);
				should.exist(projections[index]);
				var shadows = jeos.shadows([projections[index]]);
				should.exist(shadows[0]);
				shadows[0].should.lengthOf(expected.length);
			};
		};

		it("1st edge", test(0, [1,2,3,4]));

		it("2nd edge", test(1, [1,2]));

		it("3rd edge", test(2, [1,2,3,4]));

		it("4th edge", test(3, [1,2,3,4]));

		it("5th edge", test(4, [1,2,3,4]));

		it("6th edge", test(5, [1,2,3,4]));

		it("7th edge", test(6, [1,2,3,4]));

		it("8th edge", test(7, [1,2,3,4]));

		it("9th edge", test(8, [1,2]));

		it("10th edge", test(9, [1,2,3,4]));

	});

});