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
		it("#05", function () {
			edge.projects(new Edge([-20,-10], [30, 45])).should.true;
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
		it("#05", function() {
			edge.projects(new Edge([-20, 15], [-10,1])).should.false;
		});
	});


	describe("triangular(a,b,c) projection 2nd quadrant:", function(){
		// 2nd quadrant
		var a = new Edge([  0,  0],[-10,  0]);
		var b = new Edge([-10,  0],[-10,-10]);
		var c = new Edge([-10,-10],[  0,  0]);

		it("#01 a->b should be false", function () {
			a.projects(b).should.false;
		});
		it("#02 b->a should be false", function (){
			b.projects(a).should.false;
		});
		it("#03 a->c should be true", function () {
			a.projects(c).should.true;
		});
		it("#04 b->c should be true", function(){
			b.projects(c).should.true;
		});
		it("#05 c->a should be true", function(){
			c.projects(a).should.true;
		});
		it("#06 c->b should be true", function(){
			c.projects(b).should.true;
		});
	});

});