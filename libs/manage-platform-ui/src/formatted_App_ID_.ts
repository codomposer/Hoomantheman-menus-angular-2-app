import { APP_ID_PREFIX } from './APP_ID_PREFIX.js'
import { APP_ID_PREFIX_REGEX } from './APP_ID_PREFIX_REGEX.js'
export function formatted_App_ID_(App_ID:string) {
	const sub_App_ID = App_ID.replace(new RegExp(APP_ID_PREFIX_REGEX, 'g'), '')
	return sub_App_ID ? `${APP_ID_PREFIX}${sub_App_ID}` : ''
}
