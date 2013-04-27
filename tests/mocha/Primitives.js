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

});