class ROPaths {
	BASE:string
	FOOD_BYTES:string
	MANAGE_RESTAURANT:string
	MANAGE_PAYMENTS:string
	MANAGE_PLATFORM:string
	MENU_DETAILS:string
	CATEGORY_DETAILS:string
	MENU_ITEM_DETAILS:string
	PREVIEW:string
	DISHES:string
	MENU_ITEMS:string
	ORDER_DETAILS:string
	USERS:string
	SETTINGS:string
	SUPPORT:string
	FORGOT_PASSWORD:string
	RESET_PASSWORD:string
	TERMS_CONDITIONS:string
	LOGIN:string
	SIGNUP:string
	CHAT:string
	VERIFY_EMAIL:string
	BILLING:string
}
export class Path {
	public static CR = {
		LOGIN: 'login',
		SEARCH: 'search',
	}
	public static RO:ROPaths = {
		BASE: 'backoffice',
		FOOD_BYTES: `food-bytes`,
		MANAGE_RESTAURANT: `manage-restaurant`,
		MANAGE_PAYMENTS: `manage-payments`,
		MANAGE_PLATFORM: `manage-platform`,
		MENU_DETAILS: `menu-details`,
		CATEGORY_DETAILS: `category-details`,
		MENU_ITEM_DETAILS: `menu-item-details`,
		PREVIEW: `preview`,
		DISHES: 'dishes',
		MENU_ITEMS: 'menu-items',
		ORDER_DETAILS: `order-details`,
		USERS: `users`,
		SETTINGS: `settings`,
		SUPPORT: `support`,
		FORGOT_PASSWORD: `forgot-password`,
		RESET_PASSWORD: `reset-password`,
		TERMS_CONDITIONS: `terms-conditions`,
		LOGIN: `login`,
		SIGNUP: `signup`,
		CHAT: `chat`,
		VERIFY_EMAIL: `verify-email`,
		BILLING: 'billing'
	}
	public get RO():ROPaths {
		return Path.RO
	}
}
