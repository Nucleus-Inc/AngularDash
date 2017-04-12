export class Sidebar {
	init(sidebar): void;
	destroy(sidebar): void;
	toggle(sidebar): void;
	show(sidebar): void;
	hide(sidebar): void;
}
export let sidebar: Sidebar;

export class SidebarToggle {
	init(el): void;
	_onClick(e): void;
}
export let sidebarToggle: SidebarToggle;

export class SidebarMenuCollapse {
	init(el): void;
	_onClick(e): void;
}
export let sidebarMenuCollapse: SidebarMenuCollapse;