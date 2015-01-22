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
