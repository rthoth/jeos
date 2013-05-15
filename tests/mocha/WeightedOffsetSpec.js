describe("WeightedOffset", function(){

	var should = require("should");
	it("#01 quad", function () {

		var offset = new jeos.WeightedOffset([
			[-1,-1],[1,-1],[1,1],[-1,1]
		].reverse());

		should.exist(offset);

		var offseted = offset.offset(function (distance) {
			return distance * 1.3;
		});

		should.exist(offseted);
	});

});