/**
	@module core
*/
(function(jeos){

	var vector = jeos.vector,
			point = jeos.point;
	/**
		Edge representation

		@class Edge
		@constructor
		@param {Point} p Start point
		@param {Point} q End point
	*/
	var Edge = jeos.Edge = jeos.Type({
		/**
			@property p
			@type Point
		*/

		/**
			@property q
			@type Point
		*/

		/**
			@property pq
			@type Vector
		*/
		initialize: function (p, q) {
			this.p = p;
			this.q = q;
			this.pq = vector(p, q);
		},

		normal: function (length) {
			var lpq = this.pq.length();
			var i = - (this.pq.j * length) / lpq;
			var j = this.pq.i * length / lpq;
			return vector([i, j]);
		},

		pointAt: function (index) {
			return point(this.p.x + this.pq.i * index, this.p.y + this.pq.j * index);
		},

		toString: function () {
			return 'Edge(' + this.p + ', ' + this.q + ')';
		}

	});

	/**
		Edge from two coordinates
		@method from
		@param {Array} p coordinate
		@param {Array} q coordinate
		@returns {Edge}
	*/
	Edge.from = function (p, q) {
		return new Edge(point(p), point(q));
	};

})(
	function(){
		return this.jeos;
	}()
);