describe("WeightedOffset", function(){

	describe("Simple triangle", function () {

		var triangle = [
			[100, 200],[200,200],[200,100]
		];

		it("should return a fixed offset", function(){
			var edges = jeos.Edge.from(triangle);

			var svg = newSVG("Simple triangle");
			jeos.draw(edges, svg, "#0f0", "#00f", 0.5);

			var woffset = new jeos.WeightedOffset(triangle);

			var offseted = woffset.offset(function (d) {
				return d ? 20 : 10;
			});

			var offs = [];
			offseted.forEach(function (off) {
				off.forEach(function (p) {
					offs.push(p);
				});
			});

			jeos.draw(jeos.Edge.from(offs), svg, "#00f", "#000", 0.2, 0.2);

		});


		it("another test", function(){
			var coordinates = [
				[100,200],[200,200],[200,120],[200,100],[100,100]
			];
			var edges = jeos.Edge.from(coordinates);
			var woffset = new jeos.WeightedOffset(coordinates);
			var offset = woffset.offset(function (d) {
					return (d) ? d/3 : 0;
			});

			var offs = [];
			offset.forEach(function(off){
				off.forEach(function(p){
					offs.push(p);
				});
			});
			var svg = newSVG("Other SVG Test");
			jeos.draw(jeos.Edge.from(offs), svg, "#fff", "#000");
			jeos.draw(edges, svg, "#000", "#fff", 0.5, 0.5);
		});

	});
});