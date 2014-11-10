module.exports = function(grunt) {
	grunt.registerTask('tests', [ 'jasmine:ANGULAR' ]);
	grunt.mergeConfig({
		jasmine: {
			'ANGULAR': {
				src: [
					'lib/angular-1.3.2/angular.js',
					'lib/angular-1.3.2/angular-mocks.js',

					'../src/templateScope.js'
				]
				, options: {
					specs: [
						'specs/**/*.js'
					]
				}
			}
		}
		,
		watch: {
			'ANGULAR': {
				files: [
					'../src/**/*.js'
					,'specs/**/*.js'
				]
				, tasks: [ 'tests' ]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
};