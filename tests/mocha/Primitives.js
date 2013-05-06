describe("Primitives:", function () {

	describe("isLeft should", function () {

		it("true in ([1,1],[3,3],[1,3])", function () {
			jeos.isLeft([1,1],[3,3],[1,3]).should.true;
		});

		it("false in ([3,3],[1,1],[1,3])", function () {
			jeos.isLeft([3,3],[1,1],[1,3]).should.false;
		});

		it("false in ([1,1],[3,3],[3,1])", function () {
			jeos.isLeft([1,1],[3,3],[3,1]).should.false;
		});

		it("false in ([1,1],[3,3],[4,4])", function () {
			jeos.isLeft([1,1],[3,3],[4,4]).should.false;
		});

		it("true in ([1,1],[3,3],[5,6])", function () {
			jeos.isLeft([1,1],[3,3],[5,6]).should.true;
		});

		it("false in ([1,1],[3,3],[5,4])", function () {
			jeos.isLeft([1,1],[3,3],[5,4]).should.false;
		});

	});

	describe("isRight should", function () {

		it("false in ([1,1],[2,2],[3,4])", function () {
			jeos.isRight([1,1],[2,2],[3,4]).should.false;
		});

		it("true in ([1,1],[2,2],[3,2])", function () {
			jeos.isRight([1,1],[2,2],[3,2]).should.true;
		});

		it("false in ([1,1],[2,2],[10,10])", function () {
			jeos.isRight([1,1],[2,2],[10,10]).should.false;
		});
	});

	describe("jeos.angle should", function () {
		it("returns 1 @ [13,13]", function () {
			jeos.angle([13,13]).should.equal(1);
		});

		it("returns 1 @ [0.5,0.5]", function(){
			jeos.angle([0.5, 0.5]).should.equal(1);
		});

		it("returns 1.5 @ [2,4]", function(){
			jeos.angle([2,4]).should.equal(1.5);
		});

		it("returns 2 @ [0, 10]", function() {
			jeos.angle([0,10]).should.equal(2);
		});

		it("returns 0.5 @ [26,13]", function() {
			jeos.angle([26,13]).should.equal(0.5);
		});
		it("returns -3 @ [-14,-14]", function() {
			jeos.angle([-14,-14]).should.equal(5);
		});
		it("returns 3 @ [-107,107]", function() {
			jeos.angle([-107,107]).should.equal(3);
		});
		it("returns 2.5 @ [-0.13,0.26]", function(){
			jeos.angle([-0.13,0.26]).should.equal(2.5);
		});
		it("returns -3.5 @ [-38, -19]", function(){
			jeos.angle([-38,-19]).should.equal(4.5);
		});
		it("returns -0.5 @ [3, -1.5]", function(){
			jeos.angle([3,-1.5]).should.equal(7.5);
		});
		it("returns 1.5 @ [2,4]", function(){
			jeos.angle([2,4]).should.equal(1.5);
		});
		it("returns -1.75 [2,-8]", function(){
			jeos.angle([2,-8]).should.equal(6.25);
		});
		it("returns -2.25 [-2,-8]", function(){
			jeos.angle([-2,-8]).should.equal(5.75);
		});
	});

	describe("jeos.angleVV should", function () {

		it("returns 0.5 @ [1,1]->[1,2]", function () {
			jeos.aV2V([1,1], [1,2]).should.equal(0.5);
		});
		it("returns -2 @ [2,4]->[3,-1.5]", function(){
			jeos.aV2V([2,4],[3, -1.5]).should.equal(6);
		});
	});

});