module.exports = function(grunt) {
	grunt.mergeConfig = grunt.config.merge;
	
	require("./tasks/default-options.js")(grunt);
	require("./tasks/tests.js")(grunt);
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
};