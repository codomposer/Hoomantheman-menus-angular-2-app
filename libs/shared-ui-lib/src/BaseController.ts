import type { Unsubscriber } from '@ctx-core/store'
import type { EventDispatcher } from '@ctx-core/svelte'
import type { ui_Ctx } from '@menus/ui'
export class BaseController<Ctx extends ui_Ctx = ui_Ctx> {
	protected unsubscribers:Unsubscriber[] = []
	protected destroyed = false
	constructor(protected ctx:Ctx, protected dispatch?:EventDispatcher) {
		setTimeout(()=>{
			this.onInit().then()
		})
	}
	onInit = async ()=>{}
	async onMount() {}
	async onDestroy() {
		this.unsubscribe()
		this.destroyed = true
	};
	protected unsubscribe = ()=>{
		let unsubscriber
		while (unsubscriber = this.unsubscribers.pop()) {
			unsubscriber()
		}
	}
}
