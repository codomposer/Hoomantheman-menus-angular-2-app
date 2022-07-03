export async function show_Notification(data:notification_data_T):Promise<void> {
	if (!('Notification' in window)) return
	if (Notification.permission === 'granted') {
		granted_show_Notification(data)
		return
	}
	const permission =
		check_Notification_Promise()
		? await Notification.requestPermission()
		: await new Promise<string>((resolve)=>{
			Notification.requestPermission(in_permission=>{
				resolve(in_permission)
			})
		})
	if (permission === 'granted') {
		granted_show_Notification(data)
	}
}
function granted_show_Notification(data:notification_data_T) {
	const notification = new Notification(data.title, {
		icon: '/assets/favicon.png',
		body: data.body,
	})
	notification.onclick = ()=>{
		if (data.link) {
			window.open(data.link)
		}
	}
	setTimeout(notification.close.bind(notification), data.timeout || 5000)
}
function check_Notification_Promise() {
	try {
		Notification.requestPermission().then()
	} catch (e) {
		return false
	}
	return true
}
export interface notification_data_T {
	title:string
	body:string
	link?:string
	timeout?:number
}
