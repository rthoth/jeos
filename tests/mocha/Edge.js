describe('Edges:', function () {

	var Edge = jeos.Edge;

	it("Edge([0,0], [2,2]) doesn't project in Edge([2,3], [1,4])", function () {

		var edge1 = new Edge([0,0], [2,2]);
		var edge2 = new Edge([2,3], [1,4]);

		edge1.projects(edge2).should.false;

	});

	it("Edge([1,4], [6,-7]) doesn't project in Edge([3,2], [-2,-9])", function () {
		var edge1 = new Edge([1,4], [6,-7]);
		var edge2 = new Edge([3,2], [-2,-9]);

		edge1.projects(edge2).should.true;
	});

	it("Edge([0,0], [2,1]) projects in Edge([1,2], [2,3])", function () {
		var edge1 = new Edge([0,0], [2,1]);
		var edge2 = new Edge([1,2], [2,3]);

		edge1.projects(edge2).should.true;
	});

	it("Edge([0,0], [2,1]) doesn't project in Edge([2,3], [3,4])", function () {
		var edge1 = new Edge([0,0], [2,1]);
		var edge2 = new Edge([2,3], [3,4]);

		edge1.projects(edge2).should.false;
	});


	describe("Edge([2,1], [2,4])", function () {

		var edge1 = new Edge([2,1], [2,4]);

		it("projects Edge([5,2], [5,0])", function () {
			edge1.projects(new Edge([5,2], [5,0])).should.true;
		});

		it("projects Edge([5,6], [5,3])", function () {
			edge1.projects(new Edge([5,6], [5,3])).should.true;
		});

		it("doesn't project Edge([5, 0.5], [5,0])", function () {
			edge1.projects(new Edge([5, 0.5], [5,0])).should.false;
		});

		it("doesn't project Edge([5, 2], [5,3])", function () {
			edge1.projects(new Edge([5,2], [5,3])).should.true;
		});

		it("doesn't project Edge([5,4], [6,4])", function () {
			edge1.projects(new Edge([5,4], [6, 4])).should.false;
		});

		it("doesn't project Edge([2,5], [2,6])", function () {
			edge1.projects(new Edge([2,5], [2,6])).should.false;
		})

	});


	describe("Edge([0,0], [10,0])", function () {
		var edge = new Edge([0,0], [10,0]);

		var e = 0.000000000000001;

		it("∡ Edge([0,0], [10,10]) should be π / 4 ", function () {
			var min = (Math.PI / 4) - e;
			var max = (Math.PI / 4) + e;
			edge.angle(new Edge([0,0], [10,10])).should.within(min, max);
		});
	});

});