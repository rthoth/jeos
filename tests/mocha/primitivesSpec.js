describe("Primitives", function () {

	var point = jeos.point;

	describe("Normal Point Relative Position", function(){

		describe("should", function(){
				var horizontal = jeos.vector([1,0]);
				var vertical = jeos.vector([0,1]);
				var rhorizontal = horizontal.reverse();
				var rvertical = vertical.reverse();
				var left = 0, right = 2, collinear = 1;
				var zero = point(0,0);

				var test = function (vector, p1, p2, expected) {
					return function () {
						jeos.normalPRP(vector, p1, p2).should.equal(expected);
					};
				};

				it("left on #01", test(horizontal, zero, point(-1,2), left));
				it("left on #02", test(horizontal, zero, point(-1,-2), left));
				it("right on #03", test(horizontal, zero, point(1,2), right));
				it("right on #04", test(horizontal, zero, point(1,-4), right));
				it("left on #05", test(horizontal, zero, point(-3,0), left));
				it("right on #06", test(horizontal, zero, point(5,0), right));

				it("left on #07", test(vertical, zero, point(0, -1), left));
				it("left on #08", test(vertical, zero, point(10, -3), left));
				it("left on #09", test(vertical, zero, point(-12, -0.001), left));
				it("right on #10", test(vertical, zero, point(0,1), right));
				it("right on #11", test(vertical, zero, point(-13, 14), right));
				it("right on #12", test(vertical, zero, point(23, Math.PI/10000), right));

				it("right on #13", test(rhorizontal, zero, point(-1,2), right));
				it("right on #14", test(rhorizontal, zero, point(-1,-2), right));
				it("left on #15", test(rhorizontal, zero, point(1,2), left));
				it("left on #16", test(rhorizontal, zero, point(1,-4), left));
				it("right on #17", test(rhorizontal, zero, point(-3,0), right));
				it("left on #18", test(rhorizontal, zero, point(5,0), left));

				it("right on #19", test(rvertical, zero, point(0, -1), right));
				it("right on #20", test(rvertical, zero, point(10, -3), right));
				it("right on #21", test(rvertical, zero, point(-12, -0.001), right));
				it("left on #22", test(rvertical, zero, point(0,1), left));
				it("left on #23", test(rvertical, zero, point(-13, 14), left));
				it("left on #24", test(rvertical, zero, point(23, Math.PI/10000), left));
		});


	});

});