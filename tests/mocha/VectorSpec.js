describe("Vector", function(){

	var should = require('should');

	describe("should", function() {
		var vector = jeos.vector(jeos.point(0, 0), jeos.point(0,10));

		it("#01 normal", function() {
			var normal = vector.normal(1);
			should.exist(normal);

			normal.should.have.property('i', 1);
			normal.should.have.property('j', 0);
		});

		it("#02 normal", function(){
			var normal = jeos.vector(jeos.point(-15,-15), jeos.point(-14,-14)).normal(-Math.sqrt(2)*11);

			should.exist(normal);
			normal.should.have.property('i', 11);
			normal.should.have.property('j', -11);
		});
	});
});