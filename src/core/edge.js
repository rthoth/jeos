/**
	@module core
*/
(function(jeos){
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
			this.pq = jeos.vector(p, q);
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
		return new Edge(jeos.point(p), jeos.point(q));
	};

})(
	function(){
		return this.jeos;
	}()
);