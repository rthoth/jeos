describe("jeos.Point", function(){

	var should = require("should");

	describe("should work", function(){
		it("#01", function(){
			var point = jeos.point(1,4);
			should.exist(point);

			point.should.have.property('x', 1);
			point.should.have.property('y', 4);
		});

		var zero = jeos.point(0,0);
		it("#02", function(){
			var a = jeos.point(0,-1);
			var b = jeos.point(1,1);

			zero.leftOf(a,b).should.true;
			zero.leftOf(b,a).should.false;

			zero.rightOf(a,b).should.false;
			zero.rightOf(b,a).should.true;
		});

		it("#03", function() {
			var a = jeos.point(-10,-10);
			var b = jeos.point(20,20);

			zero.leftOf(a,b).should.false;
			zero.leftOf(b,a).should.false;

			zero.rightOf(a,b).should.false;
			zero.rightOf(b,a).should.false;
		});

		it("#04", function(){
			var a = jeos.point(1,0);
			var b = jeos.point(0,-1);

			zero.leftOf(a,b).should.false;
			zero.leftOf(b,a).should.true;

			zero.rightOf(a,b).should.true;
			zero.rightOf(b,a).should.false;
		});

		it("#05", function(){
			var a = jeos.point(-45, 90);
			var b = jeos.point(-0.00001, -100001);

			zero.leftOf(a,b).should.true;
			zero.leftOf(b,a).should.false;

			zero.rightOf(a,b).should.false;
			zero.rightOf(b,a).should.true;
		});

		it("#06", function(){

			var a = jeos.point(-987654321, 0.0000000001);
			var b = jeos.point(-0.000000001, 84845049454);

			zero.leftOf(a,b).should.false;
			zero.leftOf(b,a).should.true;

			zero.rightOf(a,b).should.true;
			zero.rightOf(b,a).should.false;
		});
	});

});