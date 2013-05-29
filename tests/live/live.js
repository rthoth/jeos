(function($){

	var points = [];
	var live;
	var svg;
	var polygon;

	var previewStyle = {
		fill: '#fff',
		stroke: '#f00',
		'stroke-width': 1
	};

	var polygonStyle = {
		fill: '#52ADFF',
		stroke: '#FF1700',
		'stroke-width': 1
	};

	var offsetStyle = {
		fill: '#0f0',
		opacity: 0.5,
		stroke: '#000',
		'stroke-width': 1
	};

	var addPoint = function (evt) {
		var offset = live.offset();
		var x = evt.clientX - offset.left;
		var y = evt.clientY - offset.top;
		console.log({x:x, y:y});
		points.push([x,y]);
	};

	var onClick = function (evt) {
		if (evt.ctrlKey) {
			addPoint(evt);
			updatePreview();
		}
	};

	/*var dblClick = function (evt) {
		evt.stopPropagation();
		points.pop();
		live.off('click', onClick);
		live.off('dblclick', dblClick);
		if (polygon) {
			polygon.remove();
			polygon = svg.polygon(points, true);
			polygon.style(polygonStyle);
		}
		offset();
	};*/

	var updatePreview = function () {
		if (points.length >= 3) {
			if (polygon)
				polygon.remove();

			polygon = svg.polygon(points, true);
			polygon.style(previewStyle);
		}
	};

	var onKeyUp = function (evt) {
		if (evt.keyCode === 17 && polygon) {
			$(window).off('keyup', onKeyUp);
			live.off('click', onClick);
			polygon.remove();
			polygon = svg.polygon(points, true);
			polygon.style(polygonStyle);
			offset();
		}
	};

	$(function () {
		live = $('#live');
		svg = SVG(live[0]);
		live.on('click', onClick);
		$(window).on('keyup', onKeyUp);
	});


	var offset = function () {
		var woffset = jeos.WeightedOffset.from(points);

		var woffseted = woffset.offset(function (distance) {
			return distance === 0 ? 10 : distance / 2;
		});
		console.log(woffseted);
		var offsetPolygon = svg.polygon(woffseted[0], true);
		offsetPolygon.style(offsetStyle);
	};

})(Zepto);