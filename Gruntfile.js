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
			jeos: {
				options: {
					mangle: true,
					compress: true,
					beautify: true,
					report: 'gzip',
					banner: "/** \n\t\tThis is Sparta!\n **/\n"
				},
				files: {
					'target/jeos.min.js': [
						'src/primitives.js',
						'src/primitives/angle.js',
						'src/primitives/clockWise.js',
						'src/Edge.js',
						'src/WeightedOffset.js'
					]
				}
			}
		},

		cafemocha: {
			simple: {
				src: "tests/mocha/*.js",
				options: {
					require: [
						"should", "src/Edge",
						"src/primitives.js",
						"src/WeightedOffset", "src/primitives/angle.js",
						"src/primitives/clockWise.js"
					],
					reporter: 'list'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-ghost');

	grunt.loadNpmTasks('grunt-cafe-mocha');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['ghost:dist']);

	grunt.registerTask('test', ['cafemocha']);
};