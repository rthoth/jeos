module.exports = function (grunt) {

	// Project configuration...
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ghost: {
			dist: {
				filesSrc: ['tests/simple.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-ghost');

	grunt.registerTask('default', ['ghost:dist']);
};