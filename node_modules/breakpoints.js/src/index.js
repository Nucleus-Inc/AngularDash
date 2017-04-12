class Breakpoints {
	constructor (target, options = {}) {
		this.target = target instanceof jQuery === true ? target : $(target)
		this.lastSize = 0
		this.options = $.extend({
			distinct: true,
			breakpoints: [320, 480, 768, 1024],
			interval: 250
		}, options)

		this.interval = setInterval(() => {
	
			let w = this.target.width()
			let done = false
			
			this.options.breakpoints.sort((a, b) => (b - a)).forEach((breakpoint, index) => {
			
				// fire onEnter when a browser expands into a new breakpoint
				// if in distinct mode, remove all other breakpoints first.
				if (!done && w >= breakpoint && this.lastSize < breakpoint) {
					if (this.options.distinct) {
						for (var x in this.options.breakpoints.sort((a, b) => (b - a))) {
							if (this.target.hasClass('breakpoint-' + this.options.breakpoints[x])) {
								this.target.removeClass('breakpoint-' + this.options.breakpoints[x])
								this.target.trigger('exitBreakpoint' + this.options.breakpoints[x])
							}
						}
						done = true
					}
					this.target.addClass('breakpoint-' + breakpoint)
					this.target.trigger('enterBreakpoint' + breakpoint)
				}

				// fire onExit when browser contracts out of a larger breakpoint
				if (w < breakpoint && this.lastSize >= breakpoint) {
					this.target.removeClass('breakpoint-' + breakpoint)
					this.target.trigger('exitBreakpoint' + breakpoint)
				}
				
				// if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
				if (
					this.options.distinct && // only one breakpoint at a time
					w >= breakpoint && // and we are in this one
					w < this.options.breakpoints[index - 1] && // and smaller than the bigger one
					this.lastSize > w && // and we contracted
					this.lastSize > 0 &&  // and this is not the first time
					!this.target.hasClass('breakpoint-' + breakpoint) // and we aren't already in this breakpoint
					) {
					this.target.addClass('breakpoint-' + breakpoint)
					this.target.trigger('enterBreakpoint' + breakpoint)
				}
			})
			
			// set up for next call
			if (this.lastSize !== w) {
				this.lastSize = w
			}
		}, this.options.interval)

		this.target.data('breakpoints', this)
	}

	destroy () {
		clearInterval(this.interval)
		this.lastSize = 0
	}
}

// EXPORT ES6
export default Breakpoints

// EXPORT ES5
module.exports = exports.default