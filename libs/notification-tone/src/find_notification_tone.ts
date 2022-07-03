import { notification_tone_url_a } from './notification_tone_url_a.js'
import { default_notification_tone_url } from './default_notification_tone_url.js'
export function find_notification_tone(notification_tone_url:string) {
	return notification_tone_url_a.find(
		saved_notification_tone_url=>
			~saved_notification_tone_url.indexOf(notification_tone_url)
	) || default_notification_tone_url
}
