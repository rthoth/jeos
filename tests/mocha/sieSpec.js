describe("Self Intersection Eraser", function () {

	describe("should", function() {

		var star = jeos.WeightedOffset.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		it("#1", function (){
			var offset = star.offset(function (distance) {
				return distance * (2/3);
			});
		});

	});

	describe("Square", function () {

		var square = jeos.WeightedOffset.from([
			[2,2],[-6,3],[2,-3]
		]);

		it("#1", function () {
			var offset = square.offset(function () {
				return 1;
			});
			
		});
	});

});