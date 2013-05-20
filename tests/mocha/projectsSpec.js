describe("Projects", function(){

	var edge = function (p, q) {
		return jeos.Edge.from(p, q);
	};

	describe("Star test", function(){
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		var projections = jeos.detectProjections(star.edges);

		it("should has same size", function () {
			projections.should.lengthOf(star.edges.length);
		});

		var test = function (index, expected) {
			return function () {
				var projs = projections[index];

				projs.should.lengthOf(expected.length);
				projs.should.eql(expected);
			};
		};

		it("1st edge", test(0, [
			edge([3,-3],[2,-1]),
			edge([4,1],[1,1])
		]));

		it("2nd edge", test(1, [
			edge([0,-2],[3,-3])
		]));

		it("3st edge",test(2,[
			edge([4,1],[1,1]),
			edge([0,3],[-1,1])
		]));

		it("4th edge", test(3,[
			edge([0,-2],[3,-3]),
			edge([2,-1],[4,1])
		]));

		it("5th edge", test(4,[
			edge([0,3],[-1,1]),
			edge([-4,1],[-2,-1])
		]));

		it("6th edge", test(5,[
			edge([2,-1],[4,1]),
			edge([1,1],[0,3])
		]));

		it("7th edge", test(6,[
			edge([-4,1],[-2,-1]),
			edge([-3,-3],[0,-2])
		]));

		it("8th edge", test(7,[
			edge([1,1],[0,3]),
			edge([-1,1],[-4,1])
		]));

		it("9th edge", test(8,[
			edge([-3,-3],[0,-2])
		]));

		it("10 th edge", test(9,[
			edge([-1,1],[-4,1]),
			edge([-2,-1],[-3,-3])
		]));

	});
});