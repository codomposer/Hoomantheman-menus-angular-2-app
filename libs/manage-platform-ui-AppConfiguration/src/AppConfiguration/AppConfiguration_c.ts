import { I } from '@ctx-core/combinators'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { readAsDataURL } from '@menus/dom'
import {
	Enable_Points$_b, ensure_valid_Default_ServiceType, PlatformSettings, PlatformSettingsIntroPage,
} from '@menus/platform-settings'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import {
	is_appmaker_role$_b, is_admin_role$_b, is_super_admin_role$_b, is_vendor_admin_role$_b, ro_auth_rules$_b, ro_login_user$_b,
	ro_login_user$_T
} from '@menus/ro-user-common'
import { BaseController } from '@menus/shared-ui-lib'
import { deep_clone, getBytesByMb, log, merge } from '@menus/util'
import { Path } from '@menus/route'
import { RO_ALLOWED_IMG_TYPES, RO_MAX_IMG_SIZE, timeout_ms } from '@menus/web-config'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { refresh_writable_ } from '@menus/store'
import type { Sortable_click_item_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { navigating_goto_b } from '@menus/page'
import { enable_beta_features$_b } from '@menus/layout-ui'
import {
	App_ID$_b, formatted_App_ID$_b, manage_platform_isPlatform$_b, manage_platform_settings$_b,
	platform_companies$_b, platform_settings_serviceType_errors$_b, platform_settings_valid$_b, restaurant_address_a$_b,
	selected_platform_company$_b, selected_restaurant_address$_b, sub_App_ID$_b,
} from '@menus/manage-platform-ui'
import { device_type$_b, MobilePreview_T } from '@menus/manage-platform-ui-MobilePreview'
import type { manage_platform_ui_AppConfiguration_Ctx } from '../manage_platform_ui_AppConfiguration_Ctx.js'
import { manage_App_image_errors_ctx$_b } from './manage_App_image_errors_ctx$_b.js'
const Controller_name = 'AppConfiguration_c'
export class AppConfiguration_c extends BaseController<manage_platform_ui_AppConfiguration_Ctx> {
	selected_IntroPage:PlatformSettingsIntroPage
	readonly About_Text_busy$:Writable$<boolean> = writable$(false)
	readonly manage_App_image_errors_ctx$ = manage_App_image_errors_ctx$_b(this.ctx)
	readonly App_ID$ = App_ID$_b(this.ctx)
	readonly device_type$ = device_type$_b(this.ctx)
	readonly enable_beta_features$ = enable_beta_features$_b(this.ctx)
	readonly Enable_Points$ = Enable_Points$_b(this.ctx)
	readonly formatted_App_ID$ = formatted_App_ID$_b(this.ctx)
	readonly IPBGColor_errors_WeakMap$ =
		refresh_writable_<WeakMap<PlatformSettingsIntroPage, string[]>>(new WeakMap<PlatformSettingsIntroPage, string[]>())
	readonly IPColor_errors_WeakMap$ =
		refresh_writable_<WeakMap<PlatformSettingsIntroPage, string[]>>(new WeakMap<PlatformSettingsIntroPage, string[]>())
	readonly IPText1_errors_WeakMap$ =
		refresh_writable_<WeakMap<PlatformSettingsIntroPage, string[]>>(new WeakMap<PlatformSettingsIntroPage, string[]>())
	readonly IPText2_errors_WeakMap$ =
		refresh_writable_<WeakMap<PlatformSettingsIntroPage, string[]>>(new WeakMap<PlatformSettingsIntroPage, string[]>())
	readonly is_appmaker_role$ = is_appmaker_role$_b(this.ctx)
	readonly is_admin_role$ = is_admin_role$_b(this.ctx)
	readonly is_super_admin_role$ = is_super_admin_role$_b(this.ctx)
	readonly is_vendor_admin_role$ = is_vendor_admin_role$_b(this.ctx)
	readonly manage_platform_isPlatform$ = manage_platform_isPlatform$_b(this.ctx)
	readonly manage_platform_settings$ = manage_platform_settings$_b(this.ctx)
	readonly MobilePreview_i$:Writable$<MobilePreview_T> = writable$(null)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly platform_companies$ = platform_companies$_b(this.ctx)
	readonly platform_settings_serviceType_errors$ = platform_settings_serviceType_errors$_b(this.ctx)
	readonly platform_settings_valid$ = platform_settings_valid$_b(this.ctx)
	readonly PrivacyPolicy_busy$:Writable$<boolean> = writable$(false)
	readonly restaurant_address_a$ = restaurant_address_a$_b(this.ctx)
	readonly ReturnPolicy_busy$:Writable$<boolean> = writable$(false)
	readonly ro_auth_rules$ = ro_auth_rules$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly selected_platform_company$ = selected_platform_company$_b(this.ctx)
	readonly selected_restaurant_address$ = selected_restaurant_address$_b(this.ctx)
	readonly Store_Links_busy$:Writable$<boolean> = writable$(false)
	readonly sub_App_ID$ = sub_App_ID$_b(this.ctx)
	readonly TermsOfUse_busy$:Writable$<boolean> = writable$(false)
	readonly App_Icon_errors$:Readable$<string[]> = derived$(this.manage_App_image_errors_ctx$,//region
		(manage_App_image_errors_ctx)=>{
			return manage_App_image_errors_ctx.App_Icon || []
		}
	)//endregion
	readonly App_Logo_errors$:Readable$<string[]> = derived$(this.manage_App_image_errors_ctx$,//region
		(manage_App_image_errors_ctx)=>{
			return manage_App_image_errors_ctx.App_Logo || []
		}
	)//endregion
	readonly App_Splash_errors$:Readable$<string[]> = derived$(this.manage_App_image_errors_ctx$,//region
		(manage_App_image_errors_ctx)=>{
			return manage_App_image_errors_ctx.App_Splash || []
		}
	)//endregion
	readonly App_Flyer_errors$:Readable$<string[]> = derived$(this.manage_App_image_errors_ctx$,//region
		(manage_App_image_errors_ctx)=>{
			return manage_App_image_errors_ctx.App_Flyer || []
		}
	)//endregion
	readonly App_Flyer_Mobile_errors$:Readable$<string[]> = derived$(this.manage_App_image_errors_ctx$,//region
		(manage_App_image_errors_ctx)=>{
			return manage_App_image_errors_ctx.App_Flyer_Mobile || []
		}
	)//endregion
	readonly App_Name_errors$:Writable$<string[]> = writable$([])
	readonly Contact_Email_errors$:Writable$<string[]> = writable$([])
	readonly About_Text_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>
			(
				(manage_platform_settings?.Enable_About_Text && !manage_platform_settings.About_Text)
				? ['About is required']
				: []
			)
	)//endregion
	readonly YourPoints_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>{
			return (
				(manage_platform_settings?.Enable_Points && !manage_platform_settings?.YourPoints)
				? ['Your Points is required']
				: []
			)
		})//endregion
	readonly ReturnPolicy_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>{
			return manage_platform_settings?.ReturnPolicy ? [] : ['Return Policy is required']
		})//endregion
	readonly PrivacyPolicy_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>{
			return manage_platform_settings?.PrivacyPolicy ? [] : ['Privacy Policy is required']
		})//endregion
	readonly TermsOfUse_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>{
			return manage_platform_settings?.TermsOfUse ? [] : ['Term of use is required']
		})//endregion
	readonly IntroPages_errors$:Readable$<string[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings:PlatformSettings)=>{
			if (manage_platform_settings?.Enable_Intro_Pages) {
				const IntroPages = manage_platform_settings.IntroPages || []
				if (!IntroPages.length) {
					return ['At least 1 Intro Page is required']
				} else {
					if (!IntroPages.filter(p=>p.Enabled).length) {
						return ['At least 1 Intro Page needs to enabled']
					}
				}
			}
			return []
		})//endregion
	readonly IntroPages$:Readable$<PlatformSettingsIntroPage[]> = derived$(this.manage_platform_settings$,//region
		(manage_platform_settings)=>{
			return manage_platform_settings?.IntroPages
		}
	)//endregion
	readonly IntroPage_ctx_a$:Readable$<IntroPage_ctx_T[]> = derived$(this.IntroPages$,//region
		(IntroPages)=>{
			return IntroPages?.map((IntroPage, index)=>({
				IntroPage,
				index,
			})) || []
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		await subscribe_wait_timeout(this.ro_login_user$.ready$, I, timeout_ms)
		if (this.is_appmaker_role$.$ || this.is_admin_role$.$) {
			this.init_page().then()
		} else {
			await this.navigating_goto(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`)
			return
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) {
			delete this.ctx[Controller_name]
		}
		await super.onDestroy()
	}
	readonly init_page = async ()=>{
		this.unsubscribers.push(
			this.manage_platform_settings$.subscribe(this.onchange_platform_settings),
			this.App_ID$.subscribe(this.onchange_App_ID_()),
		)
	}
	readonly onchange_platform_settings = (manage_platform_settings$:PlatformSettings)=>{
		ensure_valid_Default_ServiceType(manage_platform_settings$)
	}
	readonly onchange_App_ID_ = ()=>{
		let current_App_ID, previous_App_ID
		return (App_ID:string)=>{
			setTimeout(async ()=>{
				if (
					App_ID
					&& App_ID === current_App_ID
					&& current_App_ID !== previous_App_ID
				) {
					await this.load_Store_Links()
				}
			}, timeout_ms)
		}
	}
	// Page Text
	readonly generate_page_text = async (key:string)=>{
		if (this.App_Name_errors$.$.length) {
			await this.notyf_error('App Name is required.')
			return
		}
		const requestData = new RoRequestQuery()
		requestData.n = this.manage_platform_settings$.$.App_Name
		let result:{ Data:string } = null
		if (key === 'About_Text') {
			this.About_Text_busy$.$ = true
			try {
				result = await this.ro_httpClient.API_PAGES_TEXT_about(requestData)
				this.manage_platform_settings$.refresh({ About_Text: result.Data })
			} finally {
				this.About_Text_busy$.$ = false
			}
		} else if (key === 'ReturnPolicy') {
			if (this.Contact_Email_errors$.$.length) {
				await this.notyf_error('Contact Email needs to be a valid email.')
			} else {
				requestData.ns = this.manage_platform_settings$.$.Contact_Email
				this.ReturnPolicy_busy$.$ = true
				try {
					result = await this.ro_httpClient.API_PAGES_TEXT_return(requestData)
					this.manage_platform_settings$.refresh({ ReturnPolicy: result.Data })
				} finally {
					this.ReturnPolicy_busy$.$ = false
				}
			}
		} else if (key === 'PrivacyPolicy') {
			if (this.Contact_Email_errors$.$.length) {
				await this.notyf_error('Contact Email needs to be a valid email.')
			} else {
				requestData.ns = this.manage_platform_settings$.$.Contact_Email
				this.PrivacyPolicy_busy$.$ = true
				try {
					result = await this.ro_httpClient.API_PAGES_TEXT_privacy(requestData)
					this.manage_platform_settings$.refresh({ PrivacyPolicy: result.Data })
				} finally {
					this.PrivacyPolicy_busy$.$ = false
				}
			}
		} else if (key === 'TermsOfUse') {
			this.TermsOfUse_busy$.$ = true
			try {
				result = await this.ro_httpClient.API_PAGES_TEXT_terms(requestData)
				this.manage_platform_settings$.refresh({ TermsOfUse: result.Data })
			} finally {
				this.TermsOfUse_busy$.$ = false
			}
		}
	}
	// Color Picker
	/**
	 * Intro Page
	 */
	readonly add_IntroPage = ()=>{
		const introPage = new PlatformSettingsIntroPage()
		introPage._isNew = true
		const manage_platform_settings = this.manage_platform_settings$.$
		if (!manage_platform_settings.IntroPages) manage_platform_settings.IntroPages = []
		manage_platform_settings.IntroPages.push(introPage)
		this.manage_platform_settings$.refresh()
		this.open_IntroPage(introPage)
	}
	readonly onsort_IntroPages = (evt:Sortable_sort_evt_T<PlatformSettingsIntroPage[]>)=>{
		this.manage_platform_settings$.refresh({
			IntroPages: evt.detail.out_list
		})
	}
	readonly onitemclick_IntroPage = (evt:Sortable_click_item_evt_T<PlatformSettingsIntroPage>)=>{
		this.open_IntroPage(evt.detail.item)
	}
	readonly onchange_IntroPage_Enabled = async (evt:CheckBox_change_evt_T, IntroPage:PlatformSettingsIntroPage)=>{
		IntroPage.Enabled = evt.detail as boolean
		this.manage_platform_settings$.refresh()
	}
	readonly open_IntroPage = (IntroPage:PlatformSettingsIntroPage)=>{
		this.selected_IntroPage = deep_clone(IntroPage)
		IntroPage._edit_mode = true
		this.manage_platform_settings$.refresh()
	}
	readonly close_IntroPage = (introPage:PlatformSettingsIntroPage, is_cancel?:boolean)=>{
		if (is_cancel) {
			merge(introPage, this.selected_IntroPage)
		}
		introPage._edit_mode = false
		if (introPage._isNew) {
			const manage_platform_settings = this.manage_platform_settings$.$
			const index = (manage_platform_settings.IntroPages || []).indexOf(introPage)
			if (~index) {
				manage_platform_settings.IntroPages.splice(index, 1)
			}
		}
		this.manage_platform_settings$.refresh()
	}
	readonly save_IntroPage = (introPage:PlatformSettingsIntroPage)=>{
		if (this.platform_settings_valid$.$) {
			introPage._edit_mode = false
			introPage._isNew = false
			this.manage_platform_settings$.refresh()
		}
	}
	readonly delete_IntroPage = (index:number)=>{
		const { IntroPages } = this.manage_platform_settings$.$
		if (IntroPages) {
			IntroPages.splice(index, 1)
		}
		this.manage_platform_settings$.refresh()
	}
	readonly upload_IntroPage_Image = async (evt:InputEvent, IntroPage:PlatformSettingsIntroPage)=>{
		const IntroPage_Image = evt.target as HTMLInputElement
		log(this.ctx, Controller_name, 'upload_IntroPage_Image', IntroPage_Image)
		const file_length:number = IntroPage_Image.files.length
		// a file was selected
		if (file_length) {
			const file = IntroPage_Image.files.item(0)
			if (RO_ALLOWED_IMG_TYPES.indexOf(file.type) === -1) {
				IntroPage_Image.value = ''
				await this.notyf_error('Invalid file format. Only PNG and JPG are allowed.')
			} else if (file.size > getBytesByMb(RO_MAX_IMG_SIZE)) {
				IntroPage_Image.value = ''
				await this.notyf_error(`File size can't be greater then ${RO_MAX_IMG_SIZE}MB.`)
			} else {
				try {
					const file_str = await readAsDataURL(file)
					IntroPage.Image = file_str
					log(this.ctx, Controller_name, 'File Read', file_str)
				} catch (error) {
					log(this.ctx, Controller_name, 'File Read Error', error)
				}
			}
			this.manage_platform_settings$.refresh()
		}
	}
	readonly delete_IntroPage_Image = async (evt:InputEvent, introPage:PlatformSettingsIntroPage)=>{
		const introPageImage = evt.target as HTMLInputElement
		introPage.Image = null
		introPageImage.value = ''
		this.manage_platform_settings$.refresh()
	}
	readonly load_Store_Links = async ()=>{
		this.Store_Links_busy$.$ = true
		try {
			const formatted_App_ID = this.formatted_App_ID$.$
			const manage_platform_settings = this.manage_platform_settings$.$
			manage_platform_settings.App_IOS_Store_Link = 'https://itunes.apple.com'
			manage_platform_settings.App_Android_Store_Link = `https://play.google.com/store/apps/details?id=${formatted_App_ID}`
			const response = await this.ro_httpClient.itunes_lookup_bundle(formatted_App_ID)
			for (const result of response.results) {
				if (result.bundleId === formatted_App_ID) {
					manage_platform_settings.App_IOS_Store_Link = result.trackViewUrl
					break
				}
			}
			this.manage_platform_settings$.$ = manage_platform_settings
			log(this.ctx, Controller_name, 'load_Store_Links', response)
		} finally {
			this.Store_Links_busy$.$ = false
		}
	}
	readonly refresh_mobile_app = async ()=>{
		log(this.ctx, Controller_name, 'refresh_mobile_app()')
		const MobilePreview_i = await subscribe_wait_timeout(this.MobilePreview_i$, I, timeout_ms)
		MobilePreview_i.publish_settings({ action: 'reload' })
	}
}
export interface IntroPage_ctx_T {
	index:number
	IntroPage:PlatformSettingsIntroPage,
}
