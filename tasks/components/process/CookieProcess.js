var
	BaseProcess = require('./BaseProcess'),
	merge = require('merge'),

	defaults = {
		delay: 0,
		output: 'cookielist',
		outputImages: false //'images'
	}
;

function CookieProcess(options) {
	BaseProcess.apply(this, arguments);
	merge(this._options, defaults, options);
	this._cookies = {};
}

merge(CookieProcess.prototype, BaseProcess.prototype, {
	parse: function(status, phantom, page) {
		var
			self = this
		;

		if (status === 'success') {
			setTimeout(function() {
				if (typeof self._options.outputImages === 'string') {
					var renderpath = process.cwd() + '/' +
						self._options.output + '/' +
						self._options.outputImages + '/' +
						self._url
							.replace(/^http(s)?:\/\//, '')
							.replace(/\/$/, '') +
						'.png';

					page.render(renderpath);
				}

				phantom.getCookies(function(cs) {
					cs.forEach(function(c) {
						self._cookies[c.domain] = self._cookies[c.domain] || {};
						self._cookies[c.domain][c.name] = self._cookies[c.domain][c.name] || [];
						self._cookies[c.domain][c.name].push(self._url);
					});

					phantom.exit();
					self._callback(true, self._cookies);
				});

			}, this._options.delay);
		} else {
			this._callback(false, this._cookies);
		}
	}
});

module.exports = CookieProcess;
