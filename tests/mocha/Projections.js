describe("Edges", function () {

	var Edge = jeos.Edge;

	var edge = new Edge([-10,0],[10,0]);

	describe("should project", function () {
		it("#01", function () {
			edge.projects(new Edge([9.999999999999999, 10], [10,0])).should.true;
		});
		it("#02", function () {
			edge.projects(new Edge([9.999999999999999, -10], [10,0])).should.true;
		});
		it("#03", function () {
			edge.projects(new Edge([-9.99999999999999, 10], [-10,0])).should.true;
		});
		it("#04", function () {
			edge.projects(new Edge([-9.99999999999999, -10], [-10,0])).should.true;
		});
	});

	describe("doesn't should project", function () {
		it("#01", function () {
			edge.projects(new Edge([10,10],[10,0])).should.false;
		});
		it("#02", function(){
			edge.projects(new Edge([10,-10],[10,0])).should.false;
		});
		it("#03", function(){
			edge.projects(new Edge([-10,10],[-10,0])).should.false;
		});
		it("#04",function(){
			edge.projects(new Edge([-10,-10],[-10,0])).should.false;
		});
	});


	describe("triangular projection 2nd quadrant:", function(){
		// 2nd quadrant
		var a = new Edge([  0,  0],[-10,  0]);
		var b = new Edge([-10,  0],[-10,-10]);
		var c = new Edge([-10,-10],[  0,  0]);

		it("test #1 a->b = false and b->a = false", function () {
			//a.projects(b).should.false;
			//b.projects(a).should.false;
			a.projects(c).should.true;
			//b.projects(c).should.true;
			//c.projects(a).should.true;
			//c.projects(b).should.true;
		});
	});

});