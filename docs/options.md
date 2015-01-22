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
