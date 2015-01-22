module.exports = function(grunt) {
	grunt.config('jscs', {
		all: [
			'Gruntfile.js',
			'grunt-tasks/**/*.js',
			'tasks/**/*.js'
		],
		options: {
			config: '.jscs.json'
		}
	});

	grunt.loadNpmTasks('grunt-jscs');
};
