# Breakpoints.js

Define breakpoints for one or multiple targets on your page, and Breakpoints.js will fire custom events on the targets when their size enters and/or exits a specific breakpoint.

[Breakpoints.js Demo](http://breakpoints.themekit.io)

## Usage
### Installation
```bash
npm install breakpoints.js
```

### Initialize
```js
var breakpoints = new Breakpoints('body', {
	breakpoints: [320, 480, 768, 1024],
	distinct: true,
	interval: 250
});
```

### Destroy
```js
// You can also get the Breakpoints.js instance from data
var breakpoints = $('body').data('breakpoints');

// Destroy
breakpoints.destroy()
```
	
### Events

```js
$('body').on('enterBreakpoint320', function() {
	...
});
	
$('body').on('exitBreakpoint320', function() {
	...
});

```