describe("Simple WeightedOffset Test", function () {

	describe("Triangule", function () {

		describe("((-13,-13),(-13,23),(17,-13))", function () {

			var coordinates = [[-13,-13],[-13,23],[17,-13]];

			var weightedOffset = new jeos.WeightedOffset(coordinates);
			it("#01 - constant offset", function () {
				var offset = weightedOffset.offset(function (distance) {
					return 1;
				});
				offset.should.ok;
			});

		});

	});

});