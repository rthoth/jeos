describe("Edges projection", function () {

	var simpleTriangule = [[0,0], [100,50], [50,150], [0,0]];
	var WeightedOffset = jeos.WeightedOffset;

	describe("Simple triangule " + simpleTriangule, function () {

		it("Constant offset", function () {
			var weightedOffset = new WeightedOffset(simpleTriangule);

			var offseted = weightedOffset.offset(function (distance) {
				console.log("received: " + distance);
				return 10;
			});

			offseted.should.ok;
		});

	});

});