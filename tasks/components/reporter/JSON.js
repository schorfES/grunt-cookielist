var
	merge = require('merge'),

	defaults = {
		outputFile: 'cookies.json',
		replacer: null,
		space: 4
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
			content = JSON.stringify(
				cookies || {},
				this._options.replacer,
				this._options.space
			)
		;

		this._grunt.log.writeln('Save JSON to file ' + out.green);
		this._grunt.file.write(out, content);
	}
});

module.exports = ReporterHTML;
