(function(jeos){

	var indexOf = function (point, edge) {
		var index = jeos.indexOf(point, edge.p, edge.pq);
	};

	var Projection = jeos.Projection = jeos.Type({
		initialize: function (source, target) {
			var startIndex = indexOf(source.p, target);
			var endIndex = indexOf(source.q, target);
		}
	});

})(
	function() {
		return this.jeos;
	}()
);