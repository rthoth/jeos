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

		it("3rd edge",test(2,[
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

		it("10th edge", test(9,[
			edge([-1,1],[-4,1]),
			edge([-2,-1],[-3,-3])
		]));

	});

	describe("Star weightedOffset", function(){
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		var projections = jeos.detectProjections(star.edges, function (source, target) {
			return {
				source: source.toString(),
				target: target.toString(),
				projection: jeos.Projection.from(source, target).toString()
			};
		});

		var test = function (index, expected) {
			return function () {
				projections[index].should.lengthOf(expected.length);
			};
		};

		it("1st edge", test(0, [0,1,2]));

	});


	describe("Strage #02", function(){
		var polygon = jeos.Polygon.from([
			[3,0],[0,1],[3,2],[3,3],[-4,3],[0,-1],[-1,-2],[-3,-1],[-4,-2],[-3,-3],[-1,-3],[1,-1]
		]);

		describe("Projections", function(){
			var projections = jeos.detectProjections(polygon.edges);

			var test = function(index, expected) {
				return function(){
					projections[index].should.lengthOf(expected.length);
					projections[index].should.eql(expected);
				};
			};

			it("1st edge", test(0, [
				edge([-4,3],[0,-1]),
				edge([-3,-3],[-1,-3]),
				edge([-1,-3],[1,-1]),
				edge([1,-1],[3,0])
			]));

			it("2nd edge", test(1, [
				edge([3,3],[-4,3])
			]));

			it("3rd edge", test(2,[
				edge([-4,3],[0,-1])
			]));

			it("4th edge",test(3, [
				edge([0,1],[3,2]),
				edge([-4,3],[0,-1]),
				edge([-4,-2],[-3,-3]),
				edge([-3,-3],[-1,-3]),
				edge([-1,-3],[1,-1]),
				edge([1,-1],[3,0])
			]));

			it("5th edge", test(4,[
				edge([3,0],[0,1]),
				edge([3,2],[3,3]),
				edge([3,3],[-4,3])
			]));

			it("6th edge", test(5,[
				edge([-1,-3],[1,-1])
			]));

			it("7th edge", test(6,[
				edge([-4,-2],[-3,-3]),
				edge([-3,-3],[-1,-3])
			]));

			it("8th edge", test(7,[
				edge([-3,-3],[-1,-3])
			]));

			it("9th edge", test(8,[
				edge([3,0],[0,1]),
				edge([3,3],[-4,3]),
				edge([-1,-2],[-3,-1])
			]));

			it("10th edge", test(9,[
				edge([3,3],[-4,3]),
				edge([-1,-2],[-3,-1])
			]));

			it("11th edge", test(10,[
				edge([3,3],[-4,3]),
				edge([0,-1],[-1,-2]),
				edge([-1,-2],[-3,-1])
			]));

			it("12th edge", test(11,[
				edge([3,0],[0,1]),
				edge([3,3],[-4,3])
			]));
		});
	});
});