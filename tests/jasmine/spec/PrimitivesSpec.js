describe("Primitives Spec", function(){

	it("Ok!", function(){
		var svg = newSVG("A simple test");
		var edges = jeos.Edge.from([
			[50,50],[80,50],[65,80],[50,50]
		]);

		jeos.draw(edges, svg);

	});

});