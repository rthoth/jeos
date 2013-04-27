module.exports = function (grunt) {

	// Project configuration...
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ghost: {
			dist: {
				filesSrc: ['tests/simple.js']
			}
		},

		cafemocha: {
			simple: {
				src: "tests/mocha/*.js",
				options: {
					require: ["should", "src/Edge", "src/WeightedOffset", "src/Primitives"],
					reporter: 'list'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-ghost');

	grunt.loadNpmTasks('grunt-cafe-mocha');

	grunt.registerTask('default', ['ghost:dist']);

	grunt.registerTask('test', ['cafemocha']);
};