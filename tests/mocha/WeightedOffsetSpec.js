describe("WeightedOffset", function(){

	var should = require("should");
	it.only("#01 quad", function () {

		var offset = new jeos.WeightedOffset([
			[-1,-1],[1,-1],[1,1],[-1,1]
		].reverse());

		should.exist(offset);
	});

});