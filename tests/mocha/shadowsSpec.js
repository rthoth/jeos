describe("Shadows", function (){
	var should = require("should");

	describe("Strange #02", function(){
		var polygon = jeos.Polygon.from([
			[3,0],[0,1],[3,2],[3,3],[-4,3],[0,-1],[-1,-2],[-3,-1],[-4,-2],[-3,-3],[-1,-3],[1,-1]
		]);

		var projections = jeos.detectProjections(polygon.edges, function (source, target) {
			return jeos.Projection.from(source, target);
		});

		var result = jeos.shadows(projections);

		it("Ok!", function(){
			should.exist(result);
		})
	});

});