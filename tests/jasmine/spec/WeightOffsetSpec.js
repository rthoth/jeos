describe("WeightedOffset", function(){

	describe("Simple triangle", function (){

		var triangle = [
			[-110,-110],[110,-110],[-110,110],[-110,-110]
		];

		it("should return a fixed offset", function(){
			var edges = jeos.Edge.from(triangle);

			var svg = newSVG("Simple triangle");
			jeos.draw(edges, svg, "#0f0", "#00f", 0.5);

			var woffset = new jeos.WeightedOffset(triangle);

			var offseted = woffset.offset(function (d) {
				return 1;
			});

		});

	});
});