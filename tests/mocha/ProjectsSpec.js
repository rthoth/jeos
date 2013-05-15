describe("Projection", function(){

	describe("points", function(){

		var q1 = jeos.point(7,7);
		var q2 = jeos.point(-7,7);
		var q3 = jeos.point(-7,-7);
		var q4 = jeos.point(7,-7);

		it("#01 project", function(){
			jeos.projects(q1, q2, q3, q4).should.equal(true);
			jeos.projects(q1, q2, q4, q3).should.equal(true);
		});

		it("#02 doesn't project", function(){
			jeos.projects(q1, q2, q2, q3).should.equal(false);
		});

		it("#03 doesn't projects", function(){
			jeos.projects(q2, q3, q1, q2).should.equal(false);
			jeos.projects(q3, q2, q1, q2).should.equal(false);
		});

		it("#04 projects", function(){
			jeos.projects(q1, q3, q3, q2).should.equal(true);
			jeos.projects(q3, q1, q1, q3).should.equal(true);
		});

		it("#05 doesn't project", function(){
			var p1 = jeos.point(3,-3);
			var p2 = jeos.point(2,-1);
			var p3 = jeos.point(-4,1);
			var p4 = jeos.point(-2,-1);

			jeos.projects(p1, p2, p3, p4).should.equal(false);

			var e1 = new jeos.Edge(p1, p2);
			var e2 = new jeos.Edge(p3, p4);

			e1.projects(e2).should.equal(false);

		});

	});

	describe("Edges", function(){
		var e = jeos.Edge.from([0,0],[10,0]);

		it("#01 project", function(){
			e.projects(jeos.Edge.from([9.999999, 10],[10,10])).should.equal(true);
		});

		it("#02 doesn't project", function(){
			e.projects(jeos.Edge.from([10,-43],[10.000000001,59])).should.equal(false);
		});

		it("#03 project", function(){
			e.projects(jeos.Edge.from([0, -33],[0.0000001,-13])).should.equal(true);
		});
	});

});