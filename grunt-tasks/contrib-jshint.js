module.exports = function(grunt) {
	grunt.config('jshint', {
		all: [
			'Gruntfile.js',
			'grunt-tasks/**/*.js',
			'tasks/**/*.js'
		],
		options: {
			jshintrc: '.jshintrc'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
