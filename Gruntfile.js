module.exports = function (grunt) {

	// Project configuration...
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'build/jeos.dev.js': [
						'src/core/core.js',
						'src/core/angle.js',
						'src/core/primitives.js',
						'src/core/ext.js',

						'src/core/edge.js',
						'src/core/polygon.js',

						'src/algorithms/linears.js',
						'src/algorithms/projections.js',
						'src/algorithms/shadows.js'
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
					reporter: 'list'
				}
			}
		},

		yuidoc: {
			pkg: grunt.file.readJSON('package.json'),
			name: '<%= pkg.name %>',
			description: '<%= pkg.description %>',
			version: '<%= pkg.version %>',
			url: '<%= pkg.home %>',
			options: {
				paths: ['src/'],
				outdir: 'build/docs/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-cafe-mocha');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	grunt.registerTask('test', ['uglify:dev', 'cafemocha']);

	grunt.registerTask('build', ['uglify:dev', 'uglify:min']);

	grunt.registerTask('doc', 'yuidoc');

	grunt.registerTask('default', ['test']);
};