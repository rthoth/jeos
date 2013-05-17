describe.only("WeightedOffset", function(){

	var should = require("should");
	it("#01 Star", function () {

		var starOffset = new jeos.WeightedOffset([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		should.exist(starOffset);
		var offseted = starOffset.offset(function (distance) {
			return distance;
		});

		should.exist(offseted);
	});

});