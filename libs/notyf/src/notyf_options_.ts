import { DEFAULT_OPTIONS, INotyfNotificationOptions } from 'notyf'
import { clone } from '@ctx-core/object'
import { notyf_config } from './notyf_config.js'
export function notyf_options_(in_options:string|Partial<INotyfNotificationOptions>):INotyfNotificationOptions {
	const options:Partial<INotyfNotificationOptions> =
		typeof in_options === 'string'
		? { message: in_options as string }
		: in_options as Partial<INotyfNotificationOptions>
	return clone(DEFAULT_OPTIONS, notyf_config, {
		type: 'string',
	}, options) as INotyfNotificationOptions
}
