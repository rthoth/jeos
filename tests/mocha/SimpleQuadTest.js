describe("Simple QuadTest", function () {

	describe("((-7,-3),(-6,7),(6,5),(7,-2))", function () {
		var coordinates = [[-7,-3],[-6,7],[6,5],[7,-2]];
		var weightedOffset = new jeos.WeightedOffset(coordinates);

		it("#01 - constant offset", function () {
			var offset = weightedOffset.offset(function (distance) {
				return 2;
			});

			offset.should.ok;
		});
	});

});