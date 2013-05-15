describe("Edge", function () {

	var should = require("should");

	describe("should work", function(){

		var x1Edge = new jeos.Edge(jeos.point(0,0), jeos.point(10,0));

		it("#01", function(){
			should.exist(x1Edge);

			x1Edge.should.have.property("p").with.eql({
				x: 0, y: 0
			});
			x1Edge.should.have.property("q").with.eql({
				x:10, y: 0
			});
			console.log(x1Edge.toString());
			x1Edge.should.have.property("pq").with.eql({
				i: 10, j: 0
			});
		});

	});

});