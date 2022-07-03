import { Notyf, INotyfNotificationOptions, NotyfNotification } from 'notyf'
import 'notyf/notyf.min.css'
import { has_dom } from '@ctx-core/dom'
import { notyf_config } from './notyf_config.js'
import type { Notyf_I } from './Notyf_I.js'
export const notyf =
	has_dom
	? new Notyf(notyf_config)
	: {
		error(payload:string|Partial<INotyfNotificationOptions>):NotyfNotification {
			console.error(payload)
			return new NotyfNotification({})
		},
		success(payload:string|Partial<INotyfNotificationOptions>):NotyfNotification {
			console.info(payload)
			return new NotyfNotification({})
		},
		open(payload:string|Partial<INotyfNotificationOptions>):NotyfNotification {
			console.info(payload)
			return new NotyfNotification({})
		},
		dismissAll():void {
		},
	} as Notyf_I
