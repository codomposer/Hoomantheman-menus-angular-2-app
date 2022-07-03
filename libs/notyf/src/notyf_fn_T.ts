import type { INotyfNotificationOptions, NotyfNotification } from 'notyf'
export type notyf_fn_T = (payload:string|Partial<INotyfNotificationOptions>)=>Promise<NotyfNotification>
