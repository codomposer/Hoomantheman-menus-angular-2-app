import { BaseController } from '@menus/shared-ui-lib'
import type { ro_support_ui_Ctx } from '../ro_support_ui_Ctx.js'
import { page_query$_b } from '@ctx-core/sapper'
import { writable$, Writable$ } from '@ctx-core/store'
import { TutorialChapterId } from './TutorialChapterId.js'

const Controller_name = 'Tutorial_c'

export class Tutorial_c extends BaseController<ro_support_ui_Ctx> {
	readonly page_query$ = page_query$_b(this.ctx)

	activeChapterId$: Writable$<TutorialChapterId> = writable$(null)
	videoEl$: Writable$<HTMLVideoElement> = writable$(null)

	readonly tutorial_chapters = [
		{
			id: TutorialChapterId.INTRODUCTION,
			label: 'Introduction',
			time: 0
		},
		{
			id: TutorialChapterId.RESTAURANT_INFORMATION,
			label: 'Restaurant Information',
			time: 43
		},
		{
			id: TutorialChapterId.ACCOUNT_INFORMATION,
			label: 'Account Information',
			time: (2 * 60) + 52
		},
		{
			id: TutorialChapterId.MENU_SENSE,
			label: 'Menu Sense',
			time: (3 * 60) + 17
		},
		{
			id: TutorialChapterId.PREVIEW,
			label: 'Preview',
			time: (3 * 60) + 44
		},
		{
			id: TutorialChapterId.MENUS,
			label: 'Menus',
			time: (3 * 60) + 52
		},
		{
			id: TutorialChapterId.ORDERS,
			label: 'Orders',
			time: (6 * 60) + 15
		},
		{
			id: TutorialChapterId.COUPONS,
			label: 'Coupons',
			time: (7 * 60) + 8
		},
		{
			id: TutorialChapterId.FINANCIAL_REPORTS,
			label: 'Financial Reports',
			time: (7 * 60) + 51
		},
		{
			id: TutorialChapterId.MANAGE_PLATFORM,
			label: 'Manage Platform',
			time: (8 * 60) + 6
		},
		{
			id: TutorialChapterId.USERS,
			label: 'Users',
			time: (9 * 60) + 11
		},
		{
			id: TutorialChapterId.SUPPORT,
			label: 'Support',
			time: (9 * 60) + 47
		},
		{
			id: TutorialChapterId.SETTINGS,
			label: 'Settings',
			time: (10 * 60) + 25
		},
		{
			id: TutorialChapterId.BILLING,
			label: 'Billing',
			time: (10 * 60) + 32
		},
		{
			id: TutorialChapterId.MARKETING,
			label: 'Marketing',
			time: (10 * 60) + 37
		}
	]

	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this

		if(this.page_query$.$ && this.page_query$.$.chapter) {
			const chapter = this.tutorial_chapters.find(item => item.id === this.page_query$.$.chapter)
	
			if(chapter) {
				this.goto_video_chapter(chapter.time)
			}
		}
	}

	readonly on_time_update = (event) => {
		const currentTime = this.videoEl$.$.currentTime;

		const chapters = this.tutorial_chapters.filter(c => currentTime >= c.time)

		if(chapters.length > 0) {
			this.activeChapterId$.$ = chapters[chapters.length - 1].id
		}
	}

	readonly goto_video_chapter = (time:number)=>{
		this.videoEl$.$.pause();
		this.videoEl$.$.currentTime = time;
		this.videoEl$.$.play();
	}
}
