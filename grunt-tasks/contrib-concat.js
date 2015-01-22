module.exports = function(grunt) {

	grunt.config('concat', {
		readme: {
			src: [
				'docs/intro.md',
				'docs/installation.md',
				'docs/options.md',
				'docs/reporter.md',
				'docs/examples.md',
				'docs/contribution.md',
				'docs/license.md'
			],
			dest: 'README.md'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};
