const COLLAPSE_SELECTOR = '[data-toggle="sidebar-collapse"]'
const COLLAPSE_DATA_KEY = 'bl.sidebar-collapse'
const COLLAPSE_DATA_INIT = `init.${ COLLAPSE_DATA_KEY }`

export class SidebarMenuCollapse {
	
	/**
	 * SidebarMenuCollapse constructor
	 * @return {[type]}         [description]
	 */
	constructor () {
		jQuery(COLLAPSE_SELECTOR).each((index, button) => this.init(button))
	}

	/**
	 * Get a jQuery element
	 * @param  {String|jQuery} elementOrSelector 	jQuery element or DOM selector
	 * @return {jQuery}                   			A jQuery element
	 */
	_element (elementOrSelector) {
		return elementOrSelector instanceof jQuery ? elementOrSelector : jQuery(elementOrSelector)
	}

	/**
	 * Click event listener
	 * @param  {MouseEvent} e Mouse Event
	 */
	_onClick (e) {
		e.preventDefault()
		const button = jQuery(e.currentTarget)
		const parent = button.parent()

		if (parent.hasClass('open')) {
			parent.removeClass('open')
		}
		else if (button.next('ul').html()) {
			button.closest('ul').find('.open').removeClass('open')
			parent.addClass('open')
		}
	}

	/**
	 * Initialize a sidebar menu
	 * @param  {String|jQuery} button jQuery element or DOM selector
	 */
	init (button) {
		button = this._element(button)
		if (!button.data(COLLAPSE_DATA_INIT)) {
			button
				.on(`click.${ COLLAPSE_DATA_KEY }`, this._onClick)
				.data(COLLAPSE_DATA_INIT, true)
		}
	}

	/**
	 * Destroy a sidebar menu
	 * @param  {String|jQuery} button jQuery element or DOM selector
	 */
	destroy (button) {
		this._element(button)
			.off(`click.${ COLLAPSE_DATA_KEY }`)
			.removeData(COLLAPSE_DATA_INIT)
	}
}

// EXPORT INSTANCE
export let sidebarMenuCollapse = new SidebarMenuCollapse()