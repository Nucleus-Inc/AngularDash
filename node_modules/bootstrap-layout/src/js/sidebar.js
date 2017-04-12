import forOwn from 'mout/object/forOwn'
import unique from 'mout/array/unique'
import Breakpoints from 'breakpoints.js/dist/breakpoints.js'

// Selectors
const SIDEBAR_SELECTOR = '.sidebar'
const SIDEBAR_VISIBLE_CLASS = 'sidebar-visible'
const SIDEBAR_SIZE_CLASS = 'sidebar-size'
const SIDEBAR_TOGGLE_SELECTOR = '[data-toggle="sidebar"]'
const LAYOUT_CONTAINER_SELECTOR = '.layout-container'

// Data API
const SIDEBAR_DATA_KEY = 'bl.sidebar'

// Events
const SIDEBAR_EVENTS = {
	show: `show.${ SIDEBAR_DATA_KEY }`,
	shown: `shown.${ SIDEBAR_DATA_KEY }`,
	hide: `hide.${ SIDEBAR_DATA_KEY }`,
	hidden: `hidden.${ SIDEBAR_DATA_KEY }`
}

// Other
const LAYOUT_SIDEBAR_CLASS = 'layout-sidebar'
const BREAKPOINTS = {
	320: ['xs', 'xs-up'],
	480: ['xs', 'xs-up'],
	544: ['sm', 'sm-up'],
	768: ['md', 'md-up'],
	992: ['lg', 'lg-up'],
	1200: ['xl', 'xl-up'],
	1600: ['xl', 'xl-up']
}
const UPDATE_SCREEN_DEBOUNCE = 30

/**
 * Class Sidebar
 */
export class Sidebar {
	
	/**
	 * Sidebar constructor
	 * @return {Sidebar} The Sidebar instance
	 */
	constructor () {
		// INTERNAL OPTIONS
		this.SCREEN_SIZE = null
		this.SCREEN_MD_UP = null
		
		// INTERNAL TIMERS
		this._updateScreenDebounce = null

		// UPDATE THE INITIAL SCREEN SIZE
		this._updateScreen()

		// KEEP TRACK OF THE SCREEN SIZE
		jQuery(window).resize(this._updateScreen.bind(this))

		// Initialize sidebars
		this._each(sidebar => this.init(sidebar))
	}

	/**
	 * Get the sidebar options for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Object}
	 */
	_options (sidebar) {
		sidebar = this._sidebar(sidebar)

		const position = sidebar.data('position') || 'left'
		const direction = position.charAt(0)
		const id = sidebar.attr('id')

		let size = {
			default: this._sizeValue(sidebar.data('size') || 3),
			breakpoints: {}
		}
		this._breakpointValues().map(b => {
			const bps = sidebar.data(`size-${ b }`)
			size.breakpoints[b] = bps ? this._sizeValue(bps) : null
		})

		// visibility
		let visible = (sidebar.data('visible') || 'md-up').split(' ')
		if (visible.indexOf('none') !== -1) {
			visible = []
		}

		// layout options
		let layout = (sidebar.data('layout') || '').split(' ').filter(l => l.length)
		if (!layout.length) {
			layout = visible
		}
		if (layout.indexOf('none') !== -1) {
			layout = []
		}

		return {
			id,
			position,
			direction,
			size,
			visible,
			layout
		}
	}

	/**
	 * Size option value formatter
	 * @param  {?} input
	 * @return {String}
	 */
	_sizeValue (input) {
		return (input + '').replace('%', 'pc')
	}

	/**
	 * Get breakpoint values i.e. md-up
	 * @return {Array}
	 */
	_breakpointValues () {
		const aliases = []
		forOwn(BREAKPOINTS, values => values.map(v => aliases.push(v)))
		return unique(aliases)
	}

	/**
	 * Get all breakpoint keys
	 * @return {Array}
	 */
	_breakpointKeys () {
		return Object.keys(BREAKPOINTS).map((v) => parseInt(v, 10))
	}

	/**
	 * Get the visible breakpoint sizes for a sidebar
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or DOM selector String
	 * @return {Array}
	 */
	_visibleBreakpointsFor (sidebar) {
		const breakpoints = []
		this._options(sidebar).visible.map((v) => {
			forOwn(BREAKPOINTS, (values, key) => {
				if (values.indexOf(v) !== -1) {
					breakpoints.push(parseInt(key, 10))
				}
			})
		})
		return breakpoints
	}

	/**
	 * Initialize breakpoint
	 * @param  {jQuery|String} 	sidebar 	A sidebar jQuery element or DOM selector String
	 * @param  {Boolean}   	off        	Remove the breakpoint
	 * @param  {Number}   	breakpoint 	The breakpoint size
	 * @param  {Function} 	cb         	The callback
	 */
	_setBreakpointFor (sidebar, off, breakpoint, cb) {
		const layout = this._layout(sidebar)
		if (!off && !layout.data('breakpoints')) {
			/* eslint no-new: 0 */
			new Breakpoints(layout, { 
				breakpoints: this._breakpointKeys() 
			})
		}
		layout[off ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, cb.bind(this))
	}

	/**
	 * Set breakpoints for a sidebar element
	 * @param  {jQuery|String} 	sidebar 	A sidebar jQuery element or DOM selector String
	 * @param  {Boolean}   		off        	Remove the breakpoint
	 */
	_setBreakpointsFor (sidebar, off) {
		sidebar = this._sidebar(sidebar)

		const breakpoints = this._breakpointKeys()
		const visibleBreakpoints = this._visibleBreakpointsFor(sidebar)

		forOwn(BREAKPOINTS, (values, key, object) => {
			this._options(sidebar).visible.forEach((visible) => {
				if (values.indexOf(visible) !== -1) {

					let isUp = visible.indexOf('up') !== -1
					let up = breakpoints.filter((v) => v > key)
					let keyInt = parseInt(key, 10)

					if (keyInt === Math.max.apply(null, visibleBreakpoints)) {
						let down = breakpoints.filter((v) => v < key)
						down.filter((d) => {
							// exclude visible breakpoints
							return visibleBreakpoints.indexOf(d) === -1
						})
						.forEach((breakpoint) => {
							this._setBreakpointFor(sidebar, off, breakpoint, () => this.hide(sidebar))
						})
					}

					if (isUp) {
						up.unshift(key)
						up.filter((u) => {
							// exclude visible breakpoints
							return visibleBreakpoints.indexOf(u) === -1
						})
						.forEach((breakpoint) => {
							this._setBreakpointFor(sidebar, off, breakpoint, () => this.show(sidebar, false))
						})
					}
					else {
						this._setBreakpointFor(sidebar, off, key, () => this.show(sidebar, false))
						up.filter((u) => {
							// exclude visible breakpoints
							return visibleBreakpoints.indexOf(u) === -1
						})
						.forEach((breakpoint) => {
							this._setBreakpointFor(sidebar, off, breakpoint, () => this.hide(sidebar))
						})
					}
				}
			})
		})
	}

	/**
	 * Trigger visible breakpoints for a sidebar element
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or DOM selector String
	 * @return {Promise}
	 */
	_triggerBreakpointsFor (sidebar) {
		sidebar = this._sidebar(sidebar)
		const layout = this._layout(sidebar)
		return new Promise((resolve) => {
			this._updateScreen(() => {
				const breakpoints = this._visibleBreakpointsFor(sidebar).sort((a, b) => b - a)
				for (var i = 0; i < breakpoints.length; i++) {
					const b = breakpoints[i]
					if (this.SCREEN_SIZE >= b) {
						layout.trigger(`enterBreakpoint${ b }`)
						resolve()
						break
					}
				}
			})
		})
	} 

	/**
	 * Join a classes Array into a String
	 * @param  {Array} classes
	 * @return {String}
	 */
	_classString (classes) {
		return classes.join(' ')
	}

	/**
	 * Get the layout classes for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_layoutClasses (sidebar) {
		const options = this._options(sidebar)
		let classes = []

		options.layout.map((v) => {
			let size = options.size.default
			if (options.size.breakpoints[v]) {
				size = options.size.breakpoints[v]
			}
			classes.push(`${ LAYOUT_SIDEBAR_CLASS }-${ options.direction }${ size }-${ v }`)
		})

		return unique(classes)
	}

	/**
	 * Compute a sidebar size class name
	 * @param  {Number} size       A sidebar size value
	 * @param  {String} breakpoint A breakpoint value (optional)
	 * @return {String}
	 */
	_sizeClassName (size, breakpoint) {
		let className = `${ SIDEBAR_SIZE_CLASS }-${ size }`
		if (breakpoint) {
			className = `${ className }-${ breakpoint }`
		}
		return className
	}

	/**
	 * Get the sidebar classes for a sidebar element
	 * @param  {String|jQuery} sidebar A sidebar jQuery element or String DOM selector
	 * @return {Array}
	 */
	_sidebarClasses (sidebar) {
		const options = this._options(sidebar)
		const classes = [
			`sidebar-${ options.position }`,
			`${ SIDEBAR_SIZE_CLASS }-${ options.size.default }`
		]
		forOwn(options.size.breakpoints, (size, breakpoint) => {
			if (size) {
				classes.push(this._sizeClassName(size, breakpoint))
			}
		})
		return classes
	}

	/**
	 * Emit DOM events
	 * @param  {String} eventName 	The event name
	 * @param  {?} data      		The sidebar
	 */
	_emit (eventName, sidebar) {
		sidebar = this._sidebar(sidebar)
		const options = this._options(sidebar)
		sidebar.trigger(eventName, [options])
	}

	/**
	 * Get the closest layout container element for a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 * @return {jQuery}         		A jQuery element
	 */
	_layout (sidebar) {
		sidebar = this._sidebar(sidebar)
		return sidebar.closest(LAYOUT_CONTAINER_SELECTOR)
	}

	/**
	 * Internal helper that always returns a jQuery element
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or String DOM selector
	 * @return {jQuery}         		A sidebar jQuery element
	 */
	_sidebar (sidebar) {
		if (sidebar instanceof jQuery === true) {
			return sidebar
		}
		return jQuery(sidebar)
	}

	/**
	 * Run callback on each sidebar element
	 * @param  {Function} callback The callback
	 */
	_each (callback) {
		jQuery(SIDEBAR_SELECTOR).each((k, sidebar) => callback.call(this, jQuery(sidebar)))
	}

	/**
	 * Update screen size handler
	 */
	_updateScreen (cb) {
		clearTimeout(this._updateScreenDebounce)
		this._updateScreenDebounce = setTimeout(() => {
			const width = jQuery(window).width()
			this.SCREEN_SIZE = width
			this.SCREEN_MD_UP = width >= 768
			if (typeof cb === 'function') {
				cb()
			}
		}, UPDATE_SCREEN_DEBOUNCE)
	}

	/**
	 * Close sidebar on body click/touch handler
	 * @param  {MouseEvent} e       	The event
	 * @param  {jQuery} 	sidebar 	A sidebar jQuery element
	 */
	_onTouchBody (e, sidebar) {
		if (sidebar.hasClass(SIDEBAR_VISIBLE_CLASS) && (!this.SCREEN_MD_UP || sidebar.hasClass('closable-desktop'))) {
			// if the event target is NOT the sidebar container
			// or a descendant of the sidebar container
			// or a sidebar toggle button
			if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0 && !jQuery(e.target).is(SIDEBAR_TOGGLE_SELECTOR)) {
				this.hide(sidebar)
			}
		}
	}

	/**
	 * Initialize a sidebar
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	init (sidebar) {
		sidebar = this._sidebar(sidebar)

		if (!sidebar.data(SIDEBAR_DATA_KEY)) {
		
			// sidebar classes
			sidebar.addClass(this._classString(this._sidebarClasses(sidebar)))

			this._setBreakpointsFor(sidebar)

			// CLOSE SIDEBARS ON MOBILE WHEN THE PAGE BODY IS TOUCHED
			jQuery('body').on('click touchstart', (e) => this._onTouchBody(e, sidebar))

			// active toggle button
			sidebar.on(SIDEBAR_EVENTS.show, (e, s) => {
				s = this._sidebar(s)
				if (s) {
					const options = this._options(s)
					const button = jQuery(SIDEBAR_TOGGLE_SELECTOR + '[data-target="#' + options.id + '"]')
					button.addClass('active')
				}
			})
			.on(SIDEBAR_EVENTS.hide, (e, s) => {
				s = this._sidebar(s)
				if (s) {
					const options = this._options(s)
					const button = jQuery(SIDEBAR_TOGGLE_SELECTOR + '[data-target="#' + options.id + '"]')
					button.removeClass('active')
				}
			})

			this._triggerBreakpointsFor(sidebar)

			sidebar.data(SIDEBAR_DATA_KEY, true)
		}
	}

	/**
	 * Destroy a sidebar
	 * @param  {jQuery|String} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	destroy (sidebar) {
		sidebar = this._sidebar(sidebar)

		this._setBreakpointsFor(sidebar, true)

		jQuery('body').off('click touchstart', (e) => this._onTouchBody(e, sidebar))

		sidebar.off(SIDEBAR_DATA_KEY)

		sidebar.removeData(SIDEBAR_DATA_KEY)
	}

	/**
	 * Toggle a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	toggle (sidebar) {
		sidebar = this._sidebar(sidebar)
		sidebar.hasClass(SIDEBAR_VISIBLE_CLASS) ? this.hide(sidebar) : this.show(sidebar)
	}

	/**
	 * Show a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 * @param  {Boolean} transition 	Use transition (default true)
	 */
	show (sidebar, transition = true) {
		sidebar = this._sidebar(sidebar)

		// show
		this._emit(SIDEBAR_EVENTS.show, sidebar)

		// layout classes
		this._layout(sidebar).addClass(this._classString(this._layoutClasses(sidebar)))

		if (!this.SCREEN_MD_UP) {
			this._each((s) => {
				if (!s.is(sidebar) && s.hasClass(SIDEBAR_VISIBLE_CLASS)) {
					this.hide(s)
				}
			})
		}

		if (!sidebar.hasClass(SIDEBAR_VISIBLE_CLASS)) {

			// USE TRANSITION
			if (transition) {
				sidebar.addClass('sidebar-transition')
				return setTimeout(() => {
					sidebar.addClass(SIDEBAR_VISIBLE_CLASS)
					// shown
					this._emit(SIDEBAR_EVENTS.shown, sidebar)
				}, 10)
			}

			// WITHOUT TRANSITION
			sidebar.addClass(SIDEBAR_VISIBLE_CLASS)

			// shown
			this._emit(SIDEBAR_EVENTS.shown, sidebar)
		}
	}

	/**
	 * Hide a sidebar
	 * @param  {String|jQuery} sidebar 	A sidebar jQuery element or String DOM selector
	 */
	hide (sidebar) {
		sidebar = this._sidebar(sidebar)
		const visibleClasses = sidebar.attr('class').match(new RegExp(`${ SIDEBAR_VISIBLE_CLASS }([a-z-]+)?`, 'ig'))

		// layout classes
		this._layout(sidebar).removeClass(this._classString(this._layoutClasses(sidebar)))

		if (visibleClasses) {

			// hide
			this._emit(SIDEBAR_EVENTS.hide, sidebar)

			// sidebar visibility
			sidebar.removeClass(this._classString(visibleClasses))

			// transition
			if (sidebar.hasClass('sidebar-transition')) {
				setTimeout(() => {
					sidebar.removeClass('sidebar-transition')
					// hidden
					this._emit(SIDEBAR_EVENTS.hidden, sidebar)
				}, 450)	
			}
			else {
				// hidden
				this._emit(SIDEBAR_EVENTS.hidden, sidebar)
			}
		}
	}
}

// export instance
export let sidebar = new Sidebar()