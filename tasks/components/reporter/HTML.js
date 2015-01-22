var
	merge = require('merge'),

	defaults = {
		outputFile: 'cookies.html',
		domainTag: 'h1',
		nameTag: 'h2',
		cookiesTag: 'ul',
		cookieTag: 'li'
	}
;

function ReporterHTML(grunt, options) {
	this._grunt = grunt;
	this._options = merge({}, defaults, options);
}

merge(ReporterHTML.prototype, {
	run: function(cookies) {
		var
			self = this,
			out = this._options.output + '/' + this._options.outputFile,
			content = ''
		;

		Object.keys(cookies).forEach(function(domain) {
			content += '<' + self._options.domainTag + '>' + domain + '</' + self._options.domainTag + '>';

			Object.keys(cookies[domain]).forEach(function(name) {
				content += '<' + self._options.nameTag + '>' + name + '</' + self._options.nameTag + '>';
				content += '<' + self._options.cookiesTag + '>';

				cookies[domain][name].forEach(function(url) {
					content += '<' + self._options.cookieTag + '>' + url + '</' + self._options.cookieTag + '>';
				});

				content += '</' + self._options.cookiesTag + '>';
			});
		});

		content =
			'<!DOCTYPE html>' +
			'<html>' +
				'<head>' +
					'<link rel="stylesheet" type="text/css" href="./css/styles.css" />' +
				'</head>' +
				'<body>' +
					'<div class="wrapper">' +
						content +
					'</div>' +
				'</body>' +
			'</html>';

		this._grunt.log.writeln('Save HTML to file ' + out.green);
		this._grunt.file.copy(__dirname + '/HTML/styles.css', this._options.output + '/css/styles.css');
		this._grunt.file.write(out, content);
	}
});

module.exports = ReporterHTML;
