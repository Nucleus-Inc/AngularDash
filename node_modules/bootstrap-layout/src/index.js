// STYLING
import './sass/style'

// COMPONENTS
import { sidebar } from './js/sidebar'
import { sidebarToggle } from './js/sidebar-toggle'
import { sidebarMenuCollapse } from './js/sidebar-menu-collapse'
import { sidebarMenuDropdown } from './js/sidebar-menu-dropdown'

// EXPORT LIBRARIES
export { sidebar, Sidebar } from './js/sidebar'
export { sidebarToggle, SidebarToggle } from './js/sidebar-toggle'
export { sidebarMenuCollapse, SidebarMenuCollapse } from './js/sidebar-menu-collapse'
export { sidebarMenuDropdown, SidebarMenuDropdown } from './js/sidebar-menu-dropdown'

// EXPORT DEFAULT
export default { sidebar, sidebarToggle, sidebarMenuCollapse, sidebarMenuDropdown }