;(function(jeos) {

	var Type = jeos.Type = function (prototype) {
		var type = function () {
			if (this.initialize)
				return this.initialize.apply(this, arguments);
		};

		for (var k in prototype) {
			if (prototype.hasOwnProperty(k))
				type.prototype[k] = prototype[k];
		}

		return type;
	};

	var productSignal = function (o1, o2) {
		var so1 = o1 < 0 ? -1 : (o1 > 0 ? 1 : 0);
		var so2 = o2 < 0 ? -1 : (o2 > 0 ? 1 : 0);

		return so1 * so2;
	};

	var pointLROf = jeos.pointLROf = function (v1, v2) {

		var s1 = productSignal(v1[0], v2[1]);
		var s2 = productSignal(v1[1], v2[0]);


		if (s1 === 0)
			return (s2 === 0) ? 0 : 0 - s2;

		if (s2 === 0)
			return (s1 === 0) ? 0 : s1;

		if (s1 !== s2)
			return s1;

		if (s1 === 1)
			return 

		var z = (v1[0] * v2[1]) - (v1[1] * v2[0]);

		if (z > 0)
			z = 1;
		else if (z < 0)
			z = 2;

		return z;
	};

	var pointLeftOf = jeos.leftOf = function (pointC, pointA, pointB) {
		return pointLROf(vector(pointA, pointB), vector(pointA, pointC)) === 1;
	};

	var pointRightOf = jeos.pointRightOf = function (pointC, pointA, pointB) {
		return pointLROf(vector(pointA, pointB), vector(pointA,pointC)) === 2;
	};

	var Vector = function (pointA, pointB) {
		this.i = pointB.x - pointA.x;
		this.j = pointB.y - pointA.y;
	};

	Vector.prototype.length = function () {
		return Math.sqrt(this.i * this.i + this.j + this.j);
	};

	var vector = jeos.vector = function (pointA, pointB) {
		return new Vector(pointA, pointB);
	};

	var Point = function (x, y) {
		this.x = x;
		this.y = y;
	};

	var point = jeos.point = function (x, y) {
		return new Point(x, y);
	};

	Point.prototype.leftOf = function (pointA, pointB) {
		return pointLeftOf(pointA, pointB, this);
	};

	Point.prototype.rightOf = function (pointA, pointB) {
		return pointRightOf(pointA, pointB, this);
	};

})(
	(function(){
		this.jeos = {};
		return this.jeos;
	})()
);