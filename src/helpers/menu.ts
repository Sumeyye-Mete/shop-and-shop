export enum menuOptions {
	none = "none",
	all = "all",
	decor = "decor",
	office = "office",
	livingRoom = "living-room",
	bedroom = "bedroom",
}
type MenuItem = { name: string; value: menuOptions };
type Menu = MenuItem[];

export const menu: Menu = [
	{ name: "ALL", value: menuOptions.all },
	{ name: "DECOR", value: menuOptions.decor },
	{ name: "OFFICE", value: menuOptions.office },
	{ name: "LIVING ROOM", value: menuOptions.livingRoom },
	{ name: "BEDROOM", value: menuOptions.bedroom },
];
