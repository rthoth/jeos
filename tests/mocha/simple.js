describe('Simple test', function () {

	it('Rectangle 5x10 offset 1', function () {
		var coordinates = [
			[0,0],[5,0],[5,10],[0,10],[0,0]
		];

		var weightedOffset = new jeos.WeightedOffset(coordinates);

		var offseted = weightedOffset.offset(function (distance) {
			return 1;
		});

	});

});