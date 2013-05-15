describe("Polygon", function () {

	var should = require("should");
	describe("should", function(){

		it("#01 work", function(){
			var polygon = jeos.Polygon.from([
				[0,0],[1,0],[1,1],[0,1]
			]);

			should.exist(polygon);
			polygon.should.have.property('shell').with.lengthOf(4).with.eql([
				{p:{x:0,y:0}, q:{x:1,y:0}, pq:{i:1,j:0}},
				{p:{x:1,y:0}, q:{x:1,y:1}, pq:{i:0,j:1}},
				{p:{x:1,y:1}, q:{x:0,y:1}, pq:{i:-1,j:0}},
				{p:{x:0,y:1}, q:{x:0,y:0}, pq:{i:0,j:-1}}
			]);
		});

		it("#02 is anti clockWise", function(){
			var polygon = jeos.Polygon.from([
				[0,0],[1,0],[1,1],[0,1]
			]);
			polygon.isClockWise().should.equal(false);
		});

		it("#03 is clockWise", function(){
			var polygon = jeos.Polygon.from([
				[0,0],[0,1],[1,1],[1,0]
			]);
			polygon.isClockWise().should.equal(true);
		});

		it("#04 is anti clockWise", function(){
			var polygon = jeos.Polygon.from([
				[0,0],[1,1],[-1,1]
			]);
			polygon.should.have.property('shell').with.lengthOf(3).with.eql([
				{p:{x:0, y:0}, q:{x:1,y:1}, pq:{i:1,j:1}},
				{p:{x:1, y:1}, q:{x:-1,y:1}, pq:{i:-2,j:0}},
				{p:{x:-1,y:1}, q:{x:0,y:0}, pq:{i:1,j:-1}},
			]);
			polygon.isClockWise().should.equal(false);
		});

		it("#05 is clockWise", function(){
			var polygon = jeos.Polygon.from([
				[0,0],[1,-1],[-1,-1]
			]);
			polygon.should.have.property('shell').with.lengthOf(3).with.eql([
				{p:{x:0,y:0},q:{x:1,y:-1},pq:{i:1,j:-1}},
				{p:{x:1,y:-1},q:{x:-1,y:-1},pq:{i:-2,j:0}},
				{p:{x:-1,y:-1},q:{x:0,y:0},pq:{i:1,j:1}}
			]);
			polygon.isClockWise().should.equal(true);
		});

		it("#06 is anti clockWise", function(){
			var polygon = jeos.Polygon.from([
				[-1,-1],[1,-1],[0,0],[1,1],[-1,1]
			]);
			polygon.should.have.property('shell').with.lengthOf(5).with.eql([
				{p:{x:-1,y:-1},q:{x:1,y:-1},pq:{i:2,j:0}},
				{p:{x:1,y:-1},q:{x:0,y:0},pq:{i:-1,j:1}},
				{p:{x:0,y:0},q:{x:1,y:1},pq:{i:1,j:1}},
				{p:{x:1,y:1},q:{x:-1,y:1},pq:{i:-2,j:0}},
				{p:{x:-1,y:1},q:{x:-1,y:-1},pq:{i:0,j:-2}}
			]);
			polygon.isClockWise().should.equal(false);
		});
	});

});