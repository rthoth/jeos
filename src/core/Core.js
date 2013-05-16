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

	var pAngle = jeos.pAngle = function (vec) {
		var x = vec.i >= 0 ? vec.i : 0 - vec.i;
		var y = vec.j >= 0 ? vec.j : 0 - vec.j;
		var angle;

		if (x >= y)
			angle = y / x;
		else
			angle = 2 - x / y;

		if (vec.i < 0)
			angle = 4 - angle;

		if (vec.j < 0)
			angle = 8 - angle;

		return angle;
	};

	var lOrR = jeos.lOrR = function (v1, v2) {

		var s1 = (v1.i * v2.j), s2 = (v1.j * v2.i);
		var signal = s1 - s2;

		return signal > 0 ? 1 : (signal < 0 ? 2 : 0);
	};

	var pointLeftOf = jeos.pointLeftOf = function (pointC, pointA, pointB) {
		return lOrR(vector(pointA, pointB), vector(pointA, pointC)) === 1;
	};

	var pointRightOf = jeos.pointRightOf = function (pointC, pointA, pointB) {
		return lOrR(vector(pointA, pointB), vector(pointA,pointC)) === 2;
	};

	var Vector = function (i, j) {
		this.i = i;
		this.j = j;
	};

	var normalI = function (vector, directionLength) {
		var j = (vector.i * directionLength) / vector.length();
		return new Vector(0 - (vector.j / vector.i * j), j);
	};

	var normalJ = function (vector, directionLength) {
		var i = (vector.j * directionLength) / vector.length();
		return new Vector(i, 0 - (vector.i / vector.j * i));
	};

	Vector.prototype.normal = function (directionLength) {
		if (directionLength)
			return this.i === 0 ?
				normalJ(this, directionLength) :
				normalI(this, directionLength);
		else
			throw new Error('Invalid directional length!');
	};

	Vector.prototype.length = function () {
		return Math.sqrt(this.i * this.i + this.j * this.j);
	};


	Vector.prototype.toString = function () {
		return "<" + this.i + "," + this.j + ">";
	};

	var vector = jeos.vector = function (pointA, pointB) {
		return new Vector(
			pointB.x - pointA.x,
			pointB.y - pointA.y
		);
	};

	var Point = function (x, y) {
		this.x = x;
		this.y = y;
	};

	var point = jeos.point = function (x, y) {
		return new Point(x, y);
	};

	Point.prototype.equals = function (other) {
		return this.x === other.x && this.y === other.y;
	};

	Point.prototype.leftOf = function (pointA, pointB) {
		return pointLeftOf(pointA, pointB, this);
	};

	Point.prototype.rightOf = function (pointA, pointB) {
		return pointRightOf(pointA, pointB, this);
	};

	Point.prototype.toString = function () {
		return "(" + this.x + "," + this.y + ")";
	};

	jeos.toString = function () {
		return "jeos";
	};

})(
	(function(){
		this.jeos = {};
		return this.jeos;
	})()
);
