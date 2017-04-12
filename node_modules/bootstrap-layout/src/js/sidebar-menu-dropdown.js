import { Sidebar } from './sidebar'
import { SidebarMenuCollapse } from './sidebar-menu-collapse'
import { SIDEBAR_MENU_SELECTORS } from './config'

// Selectors
const DROPDOWN_SELECTOR = '[data-toggle="sidebar-dropdown"]'
const CONTAINER_SELECTOR = '.sidebar-dropdown-menu'
const SIDEBAR_SELECTOR = '.sidebar'
const COLLAPSE_SELECTOR = '[data-toggle="sidebar-collapse"]'

// Data API
const DROPDOWN_DATA_KEY = 'bl.sidebar-dropdown'
const DROPDOWN_DATA_INIT = `init.${ DROPDOWN_DATA_KEY }`
const DROPDOWN_DATA_BUTTON = `button.${ DROPDOWN_DATA_KEY }`

// Events
const DROPDOWN_HIDE = `hide.${ DROPDOWN_DATA_KEY }`
const DROPDOWN_SHOW = `show.${ DROPDOWN_DATA_KEY }`
const DROPDOWN_MOUSEENTER = `mouseenter.${ DROPDOWN_DATA_KEY }`
const DROPDOWN_MOUSELEAVE = `mouseleave.${ DROPDOWN_DATA_KEY }`

export class SidebarMenuDropdown {
	
	/**
	 * SidebarMenuDropdown constructor
	 * @return {[type]}         [description]
	 */
	constructor () {
		this.sidebar = new Sidebar()
		this.sidebarMenuCollapse = new SidebarMenuCollapse()
		jQuery(DROPDOWN_SELECTOR).each((index, button) => this.init(button))
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
	 * Get the sidebar container
	 * @param  {String|jQuery} childElement jQuery element or DOM selector
	 */
	_sidebar (childElement) {
		return this._element(childElement).closest(SIDEBAR_SELECTOR)
	}

	/**
	 * Render menu event handler
	 * @param  {MouseEvent} e The mouse event
	 */
	_render (e) {
		if (this.sidebar.SCREEN_MD_UP) {
			this._cancelHide()
			this._show(jQuery(e.currentTarget))
		}
	}

	/**
	 * Show a sidebar menu
	 * @param  {String|jQuery} button jQuery element or DOM selector
	 */
	_show (button) {
		const sidebar = this._sidebar(button)
		const sidebarOptions = this.sidebar._options(sidebar)
		const sidebarWidth = sidebar.width()
		
		let ddMenu = jQuery(CONTAINER_SELECTOR)

		if (!ddMenu.length) {
			ddMenu = jQuery(`<ul class="${ CONTAINER_SELECTOR.substring(1) } dropdown-menu"></ul>`)
			jQuery('body').append(ddMenu)
			
			ddMenu.on(DROPDOWN_MOUSEENTER, () => this._cancelHide())
				.on(DROPDOWN_MOUSELEAVE, () => this._hide())
		}

		if (ddMenu.data(DROPDOWN_DATA_BUTTON)) {
			jQuery(ddMenu.data(DROPDOWN_DATA_BUTTON)).trigger(DROPDOWN_HIDE, [ddMenu])
		}

		ddMenu.data(DROPDOWN_DATA_BUTTON, button)
		button.trigger(DROPDOWN_SHOW, [ddMenu])
		
		ddMenu.css({ 
			left: sidebarOptions.position === 'left' ? sidebarWidth : 'auto', 
			right: sidebarOptions.position === 'right' ? sidebarWidth : 'auto', 
			top: button.offset().top + 'px'
		})
		
		const submenu = button.next(SIDEBAR_MENU_SELECTORS.submenu).clone(false)

		submenu.find('li')
			.removeClass()
			.find('a')
			.removeClass()
			.addClass('dropdown-item')

		submenu.find('ul')
			.removeClass()
			.addClass('sidebar-submenu')
			.filter((index, element) => !jQuery(element).prev(COLLAPSE_SELECTOR).length)
			.addClass(sidebarOptions.position === 'left' ? 'dropdown-menu-right' : 'dropdown-menu-left')
			.addClass('dropdown-menu sidebar-dropdown-submenu').closest('li').addClass('dropdown')

		submenu.find('ul')
			.filter((index, element) => jQuery(element).prev(COLLAPSE_SELECTOR).length)
			.addClass('sidebar-submenu-collapse')

		ddMenu.html(submenu.html())
		ddMenu.find(COLLAPSE_SELECTOR).each((index, button) => this.sidebarMenuCollapse.init(button))
	}

	/**
	 * Queue hide
	 */
	_hide () {
		this._cancelHide()
		
		const ddMenu = jQuery(CONTAINER_SELECTOR)
		if (ddMenu.length) {
			const button = ddMenu.data(DROPDOWN_DATA_BUTTON)
			ddMenu.data(DROPDOWN_HIDE, setTimeout(() => {
				ddMenu.remove()
				button.trigger(DROPDOWN_HIDE, [ddMenu])
			}, 100))
		}
	}

	/**
	 * Clear hide
	 */
	_cancelHide () {
		const ddMenu = jQuery(CONTAINER_SELECTOR)
		if (ddMenu.length) {
			const clearTimer = ddMenu.data(DROPDOWN_HIDE)
			if (clearTimer) {
				clearTimeout(clearTimer)
				ddMenu.removeData(DROPDOWN_HIDE)
			}
		}
	}

	/**
	 * Initialize a sidebar menu
	 * @param  {String|jQuery} button jQuery element or DOM selector
	 */
	init (button) {
		button = this._element(button)
		const sidebar = this._sidebar(button)
		const layout = this.sidebar._layout(sidebar)
		
		const breakpointsCollapse = [320, 480, 544]
		const breakpointsDropdown = [768, 992, 1200, 1600]

		layout.on(breakpointsDropdown.map(b => `enterBreakpoint${ b }.${ DROPDOWN_DATA_KEY }`).join(' '), () => {
			if (!button.data(DROPDOWN_DATA_INIT)) {
				this.sidebarMenuCollapse.destroy(button)
				button
					.on(DROPDOWN_MOUSEENTER, e => this._render(e))
					.on(DROPDOWN_MOUSELEAVE, () => this._hide())
					.on(DROPDOWN_SHOW, (e) => jQuery(e.currentTarget).parent().addClass('open'))
					.on(DROPDOWN_HIDE, (e) => jQuery(e.currentTarget).parent().removeClass('open'))
					.data(DROPDOWN_DATA_INIT, true)
			}
		})
		.on(breakpointsCollapse.map(b => `enterBreakpoint${ b }.${ DROPDOWN_DATA_KEY }`).join(' '), () => {
			this.destroy(button)
			this.sidebarMenuCollapse.init(button)
		})
	}

	/**
	 * Destroy a sidebar menu
	 * @param  {String|jQuery} button jQuery element or DOM selector
	 */
	destroy (button) {
		button
			.off(DROPDOWN_MOUSEENTER, e => this._render(e))
			.off(DROPDOWN_MOUSELEAVE, () => this._hide())
			.off(DROPDOWN_SHOW, (e) => jQuery(e.currentTarget).parent().addClass('open'))
			.off(DROPDOWN_HIDE, (e) => jQuery(e.currentTarget).parent().removeClass('open'))

		const sidebar = this._sidebar(button)
		const layout = this.sidebar._layout(sidebar)

		layout.off(DROPDOWN_DATA_KEY)
	}
}

// EXPORT INSTANCE
export let sidebarMenuDropdown = new SidebarMenuDropdown()