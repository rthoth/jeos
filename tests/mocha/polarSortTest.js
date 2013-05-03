describe("jeos.polarSort should", function () {

	var coordinates = [
		[10,0],[15,5],[13,3],[7,6],[-4,20],[-20,-34],[4,-12]
	];

	it("don't reverse", function(){
		jeos.polarSort(coordinates).should.eql(coordinates);
	});
	it("reverse", function(){
		jeos.polarSort(coordinates.slice(0).reverse()).should.eql(coordinates);
	});

});