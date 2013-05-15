module.exports = function (grunt) {

	// Project configuration...
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		ghost: {
			dist: {
				filesSrc: ['tests/simple.js']
			}
		},

		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'build/jeos.dev.js': [
						'src/core/Core.js',
						'src/core/Angle.js',
						'src/core/Edge2.js',
						'src/core/Polygon.js',

						'src/algorithms/ClockWise.js',
						'src/algorithms/Projects.js',

						'src/offset/WeightedOffset2.js'
					]
				}
			},
			min: {
				options: {
					mangle: true,
					compress: true,
					beautify: false,
					report: 'gzip'
				},
				files: {
					'build/jeos.min.js' : [
						'build/jeos.dev.js'
					]
				}
			}
		},

		cafemocha: {
			simple: {
				src: "tests/mocha/*.js",
				options: {
					require: [
						"should", "build/jeos.dev.js"
					],
					reporter: 'dot'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-ghost');

	grunt.loadNpmTasks('grunt-cafe-mocha');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['uglify:dev', 'cafemocha']);

	grunt.registerTask('build', ['uglify:dev', 'uglify:min']);

	grunt.registerTask('default', ['test']);
};