(function(jeos){

	var Projection = jeos.Projection = jeos.Type({
		initialize: function (source, target) {

			var indexP = jeos.indexOf(source.p, target.p, target.pq);
			var indexQ = jeos.indexOf(source.q, target.p, target.pq);
			if (indexQ <= indexP) {
				debugger;
				source = source.reverse();
				var temp = indexP;
				indexP = indexQ;
				indexQ = temp;
			}

			var pointP, pointQ;
			if (indexP < 0) {
				indexP = 0;
				pointP = source.pointAt(jeos.indexOf(target.p, source.p, source.pq));
			} else {
				pointP = source.p;
			}

			if (indexQ > 1) {
				indexQ = 1;
				pointQ = source.pointAt(jeos.indexOf(target.q, source.p, source.pq));
			} else {
				pointQ = source.q;
			}

			if (indexP === indexQ){
				debugger;
			}
			this.si = indexP;
			this.ei = indexQ;
			this.sd = target.distanceOfPoint(pointP);
			this.ed = target.distanceOfPoint(pointQ);


		},

		toString: function () {
			return 'P[(' + this.si + ', ' + this.sd + '), (' + this.ei + ', ' + this.ed + ')]';
		},

		valueAt: function (position) {

		}
	});

})(
	function() {
		return this.jeos;
	}()
);