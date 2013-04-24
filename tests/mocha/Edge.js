describe('Edge should', function () {

	var Edge = jeos.Edge;

	describe('Projections', function () {

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

	});

});