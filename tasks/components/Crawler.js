var
	CookieProcess = require('./process/CookieProcess'),
	SitemapProcess = require('./process/SitemapProcess'),

	merge = require('merge'),

	defaults = {
		sync: 10,
		urls: [],

		onSitemapComplete: function(/* urls */) {},
		onProcessComplete: function(/* success */) {}
	}
;

function Crawler(options) {
	this._options = merge({}, defaults, options);
	this._cookies = {};
}

merge(Crawler.prototype, {

	run: function(callback) {
		this._callback = callback || function() {};

		if (typeof this._options.sitemap === 'string') {
			new SitemapProcess(this._options)
				.run(this._options.sitemap, this._onSitemapComplete.bind(this));
		} else {
			this._onSitemapComplete([]);
		}
	},

	_queueStart: function() {
		this._active = 0;
		this._queueNext();
	},

	_queueNext: function() {
		if (this._urls.length > 0 && this._active < this._options.sync) {
			var url = this._urls.pop();
			this._active++;

			new CookieProcess(this._options)
				.run(url, this._onProcessComplete.bind(this));

			this._queueNext();
		} else if (this._urls.length === 0 && this._active === 0) {
			this._queueComplete();
		}
	},

	_queueComplete: function() {
		this._callback(this._cookies);
	},

	_onSitemapComplete: function(urls) {
		this._urls = this._options.urls.concat(urls);
		this._options.onSitemapComplete(this._urls);
		this._queueStart();
	},

	_onProcessComplete: function(success, cookies) {
		var self = this;

		// Save cookies into local cookie dictionary:
		Object.keys(cookies).forEach(function(domain) {
			Object.keys(cookies[domain]).forEach(function(name) {
				self._cookies[domain] = self._cookies[domain] || {};
				self._cookies[domain][name] = self._cookies[domain][name] || [];
				self._cookies[domain][name] = self._cookies[domain][name].concat(cookies[domain][name]);
			});
		});

		// Continue queue:
		this._active--;
		this._options.onProcessComplete(success);
		this._queueNext();
	}

});

module.exports = Crawler;
