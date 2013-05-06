describe("jeos.antiClockWise should", function () {

	var coords1 = [
		[10,0],[15,5],[13,3],[7,6],[-4,20],[-20,-34],[4,-12]
	];

	it("don't reverse", function(){
		jeos.antiClockWise(coords1).should.eql(coords1);
	});
	it("reverse", function(){
		jeos.antiClockWise(coords1.slice(0).reverse()).should.eql(coords1);
	});

	var coord2 = [
		[0,10],[1,9],[2,7],[3,4],[4,0],[5,10],[0,10]
	];

	var angleSum = function (coords) {
		var edges = jeos.Edge.from(coords);
		var pivot = coords.reduce(function(ret, cur) {
			return [ret[0]+cur[0],ret[1]+cur[1]];
		}, [0,0]);

		pivot = [pivot[0]/coords.length, pivot[1]/coords.length];

		var sum = edges.reduce(function(sum, e) {
			return sum + jeos.aV2V(jeos.vector(pivot, e.p), jeos.vector(pivot, e.q));
		},0);

		console.log(sum);

		return sum;
	};

	it("concept test", function () {
		angleSum(coord2).should.equal(angleSum(coord2.slice(0).reverse()));
	});

});