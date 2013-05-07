;(function(exports, jeos){

	var width = 300;
	var height = 300;
	var id = 0;
	var newSVG = function (title) {
		var canvas = $('<div id="canvas_' + (id++) + '"></div>').appendTo($('#canvass'));

		var svg = SVG(canvas[0]).size(width,height);
		svg.text(title).font({
			family: 'Arial',
			size: 10,
			anchor: 'left'
		});
		return svg;
	};


	var edges2Coordinates = function (edges) {
		return edges.map(function (e) {
			return e.p[0] + "," + e.p[1];
		}).join(" ");
	};


	exports.newSVG = newSVG;

	jeos.draw = function (edges, svg, fill, stroke, fillo, strokeo) {
		fill = fill === undefined ? "#ff0": fill;
		stroke = stroke === undefined ? "#f00": stroke;
		fillo = fillo === undefined ? 1 : fillo;
		strokeo = strokeo === undefined ? 1 : strokeo;

		var str = edges2Coordinates(edges);
		var polygon = svg.polygon(str, true);
		polygon.draggable();

		//polygon.center(width/2,height/2);

		polygon.attr({
			fill: fill,
			stroke: stroke,
			'fill-opacity': fillo,
			'stroke-opacity': strokeo
		});

	};
})(window, jeos);