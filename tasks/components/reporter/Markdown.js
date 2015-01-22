var
	merge = require('merge'),

	defaults = {
		outputFile: 'cookies.md'
	}
;

function ReporterHTML(grunt, options) {
	this._grunt = grunt;
	this._options = merge({}, defaults, options);
}

merge(ReporterHTML.prototype, {
	run: function(cookies) {
		var
			out = this._options.output + '/' + this._options.outputFile,
			content = ''
		;

		Object.keys(cookies).forEach(function(domain) {
			content += '\n# ' + domain + '\n\n';

			Object.keys(cookies[domain]).forEach(function(name) {
				content += '\n## ' + name + '\n';

				cookies[domain][name].forEach(function(url) {
					content += '* ' + url + '\n';
				});
			});
		});

		this._grunt.log.writeln('Save Markdown to file ' + out.green);
		this._grunt.file.write(out, content);
	}
});

module.exports = ReporterHTML;
