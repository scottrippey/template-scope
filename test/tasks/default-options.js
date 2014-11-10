module.exports = function(grunt) {
	grunt.registerTask('default', [ 'tests' ]);
	grunt.registerTask('dev', [ 'watch' ]);
	
	grunt.mergeConfig({
		watch: {
			options: {
				atBegin: true
			}
		}
	});
};