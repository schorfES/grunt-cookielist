var
	BaseProcess = require('./BaseProcess'),
	parseString = require('xml2js').parseString,
	merge = require('merge')
;

function SitemapProcess(/* options */) {
	BaseProcess.apply(this, arguments);
}

merge(SitemapProcess.prototype, BaseProcess.prototype, {

	parse: function(status, phantom, page) {
		var
			self = this,
			urls = []
		;

		if (status === 'success') {
			page.getContent(function(content) {
				parseString(content, function(error, result) {

					if (result && result.urlset && result.urlset.url) {
						result.urlset.url.forEach(function(url) {
							urls.push(url.loc[0]);
						});
					}

					phantom.exit();
					self._callback(urls);
				});

			});
		} else {
			phantom.exit();
			this._callback(urls);
		}
	}
});

module.exports = SitemapProcess;
