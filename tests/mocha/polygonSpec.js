describe("Polygon", function(){
	describe("Star should", function(){
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		it("antiClockWise", function() {
			var starTest = star;
			starTest.isClockWise().should.equal(false, starTest);
			starTest = starTest.reverse();
			starTest.isClockWise().should.equal(true, starTest);
			starTest = starTest.reverse();
			starTest.isClockWise().should.equal(false, starTest);
		});
	});
});