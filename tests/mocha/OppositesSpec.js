describe("Opposites", function(){
	var should = require("should");

	describe("Star should", function(){
		var star = jeos.Polygon.from([
			[0,-2],[3,-3],[2,-1],[4,1],[1,1],[0,3],[-1,1],[-4,1],[-2,-1],[-3,-3]
		]);

		var testEdge = function (i) {
			return jeos.opposites(star.shell[i], star.others(star.shell[i]));
		};

		it("#01 1st edge", function(){
			var opposites = testEdge(0);
			opposites.should.have.lengthOf(3);
		});

		it("#02 2nd edge", function(){
			var opposites = testEdge(1);
			opposites.should.have.lengthOf(1);
		});

		it("#03 3rd edge", function(){
			testEdge(2).should.have.lengthOf(2);
		});

		it("#04 4th edge", function(){
			testEdge(3).should.have.lengthOf(2);
		});

		it("#05 5th edge", function(){
			testEdge(4).should.have.lengthOf(2);
		});

		it("#06 6th edge", function(){
			testEdge(5).should.have.lengthOf(2);
		});

		it("#07 xth edge", function(){
			testEdge(6).should.have.lengthOf(2);
		});

		it("#08 xth edge", function(){
			testEdge(7).should.have.lengthOf(2);
		});

		it("#09 xth edge", function(){
			testEdge(8).should.have.lengthOf(1);
		});

		it("#10 xth edge", function(){
			testEdge(9).should.have.lengthOf(3);
		});
	});

	describe("Strange #01", function(){
		var clockWisePolygon = jeos.Polygon.from([
			[0,3],[1,3],[1,2],[2,2],[2,3],[3,3],[3,1],[4,1],[5,0],[3,-1],[-2,-2],[-3,1],[-5,1],[-5,2],[-4,3],
			[-3,2],[-2,3],[-1,2]
		]);

		var antiClockWisePolygon = clockWisePolygon.reverse();

		it("should clockWise", function(){
			clockWisePolygon.isClockWise().should.equal(true);
			antiClockWisePolygon.isClockWise().should.equal(false);
		});

		var opposites = function (i) {
			return jeos.opposites(antiClockWisePolygon.shell[i], antiClockWisePolygon.others(antiClockWisePolygon.shell[i]));
		};

		it("#1 1st edge", function(){
			opposites(0).should.have.lengthOf(2);
		});

		it("#2 2nd edge", function(){
			opposites(1).should.have.lengthOf(2);
		});

		it("#3 3rd edge", function(){
			opposites(2).should.have.lengthOf(1);
		});

		it("#4 4th edge", function(){
			opposites(3).should.have.lengthOf(2);
		});

		it("#5 5th edge", function(){
			opposites(4).should.have.lengthOf(2);
		});

		it("#6 xth edge", function(){
			opposites(5).should.have.lengthOf(1);
		});

		it("#7 7th edge", function(){
			opposites(6).should.have.lengthOf(2);
		});

		it("#8 9th edge", function(){
			opposites(7).should.have.lengthOf(5);
		});

		it("9x 9th edge", function(){
			opposites(8).should.have.lengthOf(5);
		});

		it("#10 10th edge", function(){
			opposites(9).should.have.lengthOf(5);
		});

		it("#11 11th edge", function(){
			opposites(10).should.have.lengthOf(2);
		});

		it("#12 12th edge", function(){
			opposites(11).should.have.lengthOf(1);
		});

		it("#13 13th edge", function(){
			opposites(12).should.have.lengthOf(5);
		});

		it("#14 14th edge", function(){
			opposites(13).should.have.lengthOf(1);
		});

		it("#15 15th edge", function(){
			opposites(14).should.have.lengthOf(1);
		});

		it("#16 16th edge", function(){
			opposites(15).should.have.lengthOf(1);
		});

		it("#17 17th edge", function(){
			opposites(16).should.have.lengthOf(3);
		});

		it("#18 18th edge", function(){
			opposites(17).should.have.lengthOf(1);
		});

		it.skip("#x xth edge", function(){
			opposites(x).should.have.lengthOf(x);
		});

	});

});