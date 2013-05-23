/**
	@module ext
*/
/**
	JS Extensions
	@class jeos.$
*/
(function(ext){
	/**
			Filter and remove elements from array

			@method remove
			@for jeos.$
			@static
			@param {Array} array Array
			@param {Function} func true remove, false no!

			@returns {Array} removed elements!
		*/
		var $remove = ext.remove = function (array, func) {
			var filtered = [];
			for (var i=0; i<array.length; i)
				if (func(array[i], i)) {
					filtered.push(array[i]);
					array.splice(i, 1);
				} else
					i++;

			return filtered;
		};

		var $result = ext.result = function (check) {
			var $content = [];
			var resulter = function () {
				if (arguments.length === 0)
					return $content;
				else {
					if (!check || check($content, Array.prototype.slice.call(arguments, 0)))
						$content.push(Array.prototype.slice.call(arguments, 0));
				}
			};

			resulter.$content = $content;
			return resulter;
		};
})(
	function() {
		return this.jeos.$;
	}()
);