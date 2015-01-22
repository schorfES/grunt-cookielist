var
	REPORTER_HTML = 'HTML',
	REPORTER_JSON = 'JSON',
	REPORTER_MARKDOWN = 'Markdown',

	merge = require('merge'),
	Crawler = require('./components/Crawler'),

	reporters,
	defaults = {
		output: 'cookielist',
		reporter: [REPORTER_HTML]
	}
;

reporters = {};
reporters[REPORTER_HTML] = require('./components/reporter/HTML'),
reporters[REPORTER_JSON] = require('./components/reporter/JSON'),
reporters[REPORTER_MARKDOWN] = require('./components/reporter/Markdown'),


module.exports = function(grunt) {

	function onSitemapComplete(urls) {
		if (urls.length > 0) {
			grunt.log.writeln('Visiting ' + urls.length.toString().green + ' URLs');
		} else {
			grunt.log.writeln('Sitemap.xml returned 0 URLs. Check your configuration.'.red);
		}
	}

	function onProcessComplete(success) {
		grunt.log.write(('.')[success ? 'green' : 'red']);
	}

	function getReporter(reporter) {
		// Map reporter from string definition:
		if (typeof reporter === 'string') {
			reporter = {type: reporter};
		}

		// Get reorter class from given type string definition. If the given
		// reporter type is not mapped, return the string definition again...
		if (reporter && typeof reporter.type === 'string') {
			reporter.type = reporters[reporter.type] || reporter.type;
		}

		return reporter;
	}

	function executeReporter(reporter, options, cookies) {
		options = merge({output: options.output}, (reporter || {}).options || {});

		if (typeof reporter.type === 'function') {
			if (reporter.type.prototype.run) {
				new reporter.type(grunt, options).run(cookies);
			} else {
				reporter.type.call(grunt, cookies);
			}
		} else {
			grunt.log.writeln('Unknown reporter ' + ('"' + (reporter || {}).type + '"').red + '".');
		}
	}

	grunt.registerMultiTask(
		'cookielist',
		'A crawler to list all cookies on given urls.',
		function() {
			var
				async = this.async(),
				options = this.options(
					{
						onSitemapComplete: onSitemapComplete,
						onProcessComplete: onProcessComplete
					}, defaults
				),
				crawler = new Crawler(options)
			;

			crawler.run(function(cookies) {
				grunt.log.writeln();

				options.reporter.forEach(function(reporter) {
					// get real reporter depending on given options
					// and execute them:
					reporter = getReporter(reporter);
					executeReporter(reporter, options, cookies);
				});

				async();
			});
		}
	);
};
