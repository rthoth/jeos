describe("Primitives", function () {

	var point = jeos.point;

	describe("Normal Left or Right", function(){

		describe("should", function(){
				var horizontal = jeos.vector([1,0]);
				var vertical = jeos.vector([0,1]);

				it("left on #01", function(){

					jeos.normalLorR(horizontal, point(5, 5), point(4, 6)).should.equal(1);
					jeos.normalLorR(vertical, point(5,5), point(4,2)).should.equal(1);

				});
				it("right on #02", function(){
					jeos.normalLorR(horizontal, point(5, 5), point(6, 4)).should.equal(2);
					jeos.normalLorR(vertical, point(5, 5), point(7, 6)).should.equal(2);
				});
		});


	});

});