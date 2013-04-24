;(function(exports){

	var Polygon = function (shell, holes) {
		this.shell = (shell) ? shell.concat([]) : [];
		this.holes = (holes) ? holes.concat([]) : [];
	};

	exports.Polygon = Polygon;

})(window);