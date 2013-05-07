(function (jeos) {




	var between = function (min, max, value) {
		return value >= min && value <= max;
	};

	var b01 = function (value) {
		return between(0, 1, value);
	};

	var fastProjects = function(self, other) {
		var vector = self.normal(10);

		var sp = self.p, sq = self.q;
		var op = other.p, oq = other.q;

		var pTest = jeos.isLR(vector, jeos.vector(sq, op)) | jeos.isLR(vector, jeos.vector(sp, op));
		var qTest = jeos.isLR(vector, jeos.vector(sq, oq)) | jeos.isLR(vector, jeos.vector(sp, oq));

		return (qTest !== pTest) ? true : qTest === 3;
	};

	var scalarProjection = function (edge, point, vector) {
		var a = vector[0],
				b = vector[1],
				c = edge.pq[0],
				d = edge.pq[1],
				xp = edge.p[0],
				yp = edge.p[1],
				xq = point[0],
				yq = point[1]
		;

		var internal = a*c + b*d;
		if (internal === 0)
			return NaN;

		var dx = xp - xq;
		var dy = yp - yq;

		return 0 - (b * dy + a * dx) / internal;

	};

	var slowProjects = function (self, other) {
		var scalar = scalarProjection(other, self.q, self.pq);

		if (b01(scalar))
			return true;
		else {
			scalar = scalarProjection(other, self.p, self.pq);
			return b01(scalar);
		}
	};

	var Edge = jeos.Type({
		next: null,
		previous: null,
		initialize: function (p, q) {
			this.p = p;
			this.q = q;
			this.pq = [q[0] - p[0], q[1] - p[1]];
		},

		indexOf: function (point) {
			return scalarProjection(this, point, this.pq);
		},

		angle: function (other) {
			return Math.acos(this.internal(other) / (this.length() * other.length()));
		},

		distanceOfPoint: function(point) {
			var vpa = jeos.vector(this.p, point);

			var z = vpa[0]*this.pq[1] - vpa[1]*this.pq[0];

			return Math.sqrt( (z * z) / (Math.pow(this.pq[0], 2) + Math.pow(this.pq[1], 2)));
		},

		internal: function (other) {
			return this.pq[0] * other.pq[0] + this.pq[1] * other.pq[1];

		},

		forOthers: function (fn) {
			var current = this.next;
			while (current !== null && current !== this) {
				fn(current);
				current = current.next;
			}
		},

		invert: function () {
			return new Edge(this.q, this.p);
		},

		isLeft: function (other) {
			var lr = jeos.isLR(this.pq, jeos.vector(this.p, other.p));

			if (lr === 0)
				lr = jeos.isLR(this.pq, jeos.vector(this.p, other.q));

			return lr === 1;
		},

		length: function () {
			var x = this.pq[0] * this.pq[0];
			var y = this.pq[1] * this.pq[1];

			return Math.sqrt(x + y);
		},

		normal: function (length) {
			length = length / length;
			var a = this.pq[0], b = this.pq[1];
			if (a === 0)
				return [length, 0];
			else if (b === 0)
				return [0, length];
			else {
				var vec = [0 - (b * length) / a, length];
				var len = Math.sqrt(Math.pow(vec[0],2) + Math.pow(vec[1],2));
				return [vec[0]/len, vec[1]/len];
			}
		},

		pointAt: function (index) {
			return [
				this.p[0] + this.pq[0] * index,
				this.p[1] + this.pq[1] * index
			];
		},

		projects: function (other) {
			return fastProjects(this, other);
		},

		toString: function () {
			return "Edge([" + this.p + "], [" + this.q + "])";
		}
	});

	Edge.from = function (coordinates) {
		var first = new Edge(coordinates[0], coordinates[1]);
		var last = first;
		var edges = [first];
		var current = null;

		var limit = coordinates.length - 1;
		for (var i=1 ; i<limit; i++) {
			current = new Edge(coordinates[i], coordinates[i + 1]);
			edges.push(current);
			last.next = current;
			current.previous = last;
			last = current;
		}

		current = new Edge(coordinates[coordinates.length-1], coordinates[0]);
		last.next = current;
		current.previous = last;
		edges.push(current);

		current.next = first;
		first.previous = current;

		return edges;
	};
	jeos.Edge = Edge;

})(typeof window !== 'undefined' ? window.jeos = window.jeos || {} : GLOBAL.jeos = GLOBAL.jeos || {});