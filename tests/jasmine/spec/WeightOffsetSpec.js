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
				return d /2;
			});

			var offs = [];
			offseted.forEach(function (off) {
				off.forEach(function (p) {
					offs.push(p);
				});
			});

			jeos.draw(jeos.Edge.from(offs), svg, "#00f", "#000", 0.2, 0.2);

		});

	});
});