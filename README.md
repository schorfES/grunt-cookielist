# grunt-cookielist

A grunt crawler to list all cookies on urls using phantomjs.

## Getting Started

_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide._

From the same directory as your project's Gruntfile and package.json, install
this plugin with the following command:

```bash
npm install grunt-cookielist --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-cookielist');
```

Inside your `grunt.js` file add a section named `cookielist`. This section
specifies the tasks. Each task takes sources and options as parameters.

## Options

### URLs

The `urls` option defines a list of URLs to be crawled for cookies by this task.
The URLs are defined as an Array of Strings.

```javascript
urls: [
	'http://www.foo.bar',
	'http://www.bar.baz/index.html'
]
```

### Sitemap.xml

To crawl a complete Website you can set up an URL to a _sitemap.xml_ using the
`sitemap` option. When this option is set all URLs from from the sitemap are
taken and merged into the list of `urls`.

```javascript
sitemap: 'http://www.foo.bar/sitemap.xml'
```

### Output

Define a target directory for the result cookie list of all crawled sites. Use
the `output` option to set the taget value. The default value is `'cookielist'`
which defines the folder _cookielist_ in the project root.

### Sync

The task can run simultaneously multiple crawl processes. To set the amount of
these processes use the `sync` option. The default value is `10` which means
that 10 sites are crawled simultaneously.

### Delay

Set a `delay` option for each process to wait a defined time between the load
of each site and the taken list of registered cookies per site. For example this
allows the sites javascript to perform some actions and to generete delayed
cookies. The default value is set to `0`.

### Reporters

A list of reporters to display the crawled cookie data. The enabled reporters
are defined as a list of objects containing at least a `type` property or just a
string which represents a type.

```javascript
reporter: [
	{type: 'HTML'},
	'JSON'
]
```

To learn more about the available reporters take a look at the following
reporters section.

### Cookies

A list of predefined cookies which should be set when a page will be loaded.

```javascript
cookies: [
	{name: 'example-name', value: 'example-value', domain: 'example.com'},
	{name: 'foo', value: 'bar', domain: 'foo.bar.wtf'}
]
```

### Snapshots

As a benefit of using phantomjs the task can take a snapshot from each crawled
page. To activate this feature set the `outputImages` option which defines the
directory path inside the _output_ directory (see output option).
Once activated, images from each crawled url will be stored here.

```javascript
outputImages: 'img'
```

## Reporters

A reporter is a way do define the output type of all crawled cookies. The
reporters to use for each task can be defined by the `reporter` option as
described above. Each reporter can generate a file inside the predefined
`output` directory.

The supported reporter types a described in the following sections.
You can use as many as you want with different settings.

### HTML Reporter

The HTML Reporter generates a _html_ file inside the output directory. Its
defined by the `type` property using the value `'HTML'`.

```javascript
reporter: [{
	type: 'HTML',
	options: {
		outputFile: 'cookies.html'
	}
}]
```

The `options` property is not mandatory. Here you can change the name of the
filename of the rendered _html_ file. In the example above, the filename is
defined as `'cookies.html'`. This value is also the default value of this
option.

As shortcut use `'HTML'` instead of the reporters object: `reporters: ['HTML']`.

### Markdown Reporter

The Markdown Reporter generates a _markdown_ file inside the output directory.
Its defined by the `type` property using the value `'Markdown'`.

```javascript
reporter: [{
	type: 'Markdown',
	options: {
		outputFile: 'cookies.html'
	}
}]
```

The `options` property is not mandatory. Here you can change the name of the
filename of the rendered _html_ file. In the example above, the filename is
defined as `'cookies.md'`. This value is also the default value of this
option.

As shortcut use `'Markdown'` instead of the reporters object:
`reporters: ['Markdown']`.

### JSON Reporter

The JSON Reporter generates a _json_ file inside the output directory.
Its defined by the `type` property using the value `'JSON'`.

```javascript
reporter: [{
	type: 'JSON',
	options: {
		outputFile: 'cookies.json'
	}
}]
```

The `options` property is not mandatory. Here you can change the name of the
filename of the rendered _html_ file. In the example above, the filename is
defined as `'cookies.md'`. This value is also the default value of this
option.

As shortcut use `'JSON'` instead of the reporters object:
`reporters: ['JSON']`.

### Custom Reporter function

Instead of defining a reporter type as string, you can add a function
to handle the cookie response of the grunt task on your own. The param of this
function contains the result of this task.

```javascript
reporter: [{
	type: function(cookies) {
		console.log('Do something beautyful with the report: ' + cookies);

		Object.keys(cookies).forEach(function(domain) {

			console.log('domain: ' + domain);
			var cookiesOnDomain = cookies[domain];
			Object.keys(cookiesOnDomain).forEach(function(name) {

				console.log(' found "' + name + '"');
				var pages = cookiesOnDomain[name];
				pages.forEach(function(page) {

					console.log('    seen on ' + page);

				});

			});

		});
	}
}]
```

## Example

```javascript
cookielist: {
	// Simple configuration
	simple: {
		urls: ['http://www.foo.bar'],
		output: 'cookielist/simple'
	},

	// Extended configuration:
	extended: {
		sitemap: 'http://www.foo.bar/sitemap.xml',
		sync: 20, // 20 parallel workers
		delay: 10000, // in ms
		cookies: [
			{name: 'foo', value: 'bar', domain: 'foo.bar.wtf'}
		],
		output: 'cookielist/extended', // output goes to 'cookielist/extended' directory
		outputImages: 'img' // images goes to 'cookielist/extended/img' directory
	}
}
```

## Contribution

### Validation & Tests

Run `grunt` to lint and run the tests.

## License

[LICENSE (MIT)](https://github.com/schorfES/grunt-cookielist/blob/master/LICENSE)
