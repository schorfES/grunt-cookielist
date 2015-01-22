var
	phantom = require('phantom'),
	merge = require('merge'),
	defaults = {
		cookies: []
	}
;

function BaseProcess(options) {
	this._options = merge({}, defaults, options);
}

merge(BaseProcess.prototype, {

	run: function(url, callback) {
		this._url = url;
		this._callback = callback;
		this._open();
	},

	_open: function() {
		var
			self = this
		;


		phantom.create(function(ph) {
			// Set default cookies given by options:
			var cookies = self._options.cookies || [];
			cookies.forEach(function(cookie) {
				// The documentation seems to be invalid, each value of the
				// cookie must be supplied in its own parameter.
				// http://phantomjs.org/api/webpage/method/add-cookie.html
				ph.addCookie(cookie.name, cookie.value, cookie.domain);
			});

			// Open page and parse them...
			ph.createPage(function(page) {
				page.open(self._url, function(status) {
					self.parse(status, ph, page);
				});
			});
		});
	},

	parse: function(/* status, ph, page */) {
		// overwrite this function...
	}

});

module.exports = BaseProcess;
