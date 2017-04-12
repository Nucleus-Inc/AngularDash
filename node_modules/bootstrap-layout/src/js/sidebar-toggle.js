import { Sidebar } from './sidebar'

const SIDEBAR_TOGGLE_SELECTOR = '[data-toggle="sidebar"]'

export class SidebarToggle {
	
	/**
	 * SidebarToggle constructor
	 * @return {SidebarToggle} The SidebarToggle instance
	 */
	constructor () {
		this.sidebar = new Sidebar()
		jQuery(SIDEBAR_TOGGLE_SELECTOR).each((index, el) => this.init(el))
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
	 * @param  {MouseEvent} e The Mouse Event
	 */
	_onClick (e) {
		e.stopPropagation()
		const sidebar = jQuery(e.currentTarget).data('target')
		this.sidebar.toggle(sidebar)
	}

	/**
	 * Initialize a sidebar toggle element
	 * @param  {String|jQuery} el jQuery element or DOM selector
	 */
	init (el) {
		this._element(el).on('click', e => this._onClick(e))
	}
}

// export instance
export let sidebarToggle = new SidebarToggle()