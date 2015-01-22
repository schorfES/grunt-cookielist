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
