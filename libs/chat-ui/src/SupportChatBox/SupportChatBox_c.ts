import { io } from 'socket.io-client'
import { I } from '@ctx-core/combinators'
import { derived$, writable$, Readable$, subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import { initials_, IChatMessage, IChatThread, user_session_support_chat_window_hide$_b } from '@menus/chat'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import { consumer_login_user$_b, User } from '@menus/consumer-user-common'
import { isDefined, log, merge, show_Notification } from '@menus/util'
import { SOCKET_SERVER_CHAT_, CHAT_THREAD_TYPE_SUPPORT, timeout_ms } from '@menus/web-config'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { io_T, socket_T, socket_io_loaded$_b } from '@menus/socket.io'
import { PublicKey$_b } from '@menus/http'
import { default_notification_tone_url } from '@menus/notification-tone'
import type { chat_ui_Ctx } from '../chat_ui_Ctx.js'
export type SupportChatBox_type = typeof TYPE_CUSTOMER|typeof TYPE_RESTAURANT
export const TYPE_CUSTOMER = 'TYPE_CUSTOMER'
export const TYPE_RESTAURANT = 'TYPE_RESTAURANT'
const Controller_name = 'SupportChatBox_c'
export class SupportChatBox_c extends BaseController<chat_ui_Ctx> {
	private socket:socket_T
	readonly threadChatSection$ = writable$<HTMLDivElement>(null)
	readonly type$ = writable$<string>(null)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly user_session_support_chat_window_hide$ = user_session_support_chat_window_hide$_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly isLoggedIn$ = this.consumer_login_user$.isLoggedIn$
	readonly PublicKey$ = PublicKey$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly socket_io_loaded$ = socket_io_loaded$_b(this.ctx)
	readonly busy$ = writable$<boolean>(false)
	readonly text_busy$ = writable$<string>(null)
	readonly email$ = writable$<string>(null)
	readonly formErrors$:Writable$<string[]>
	readonly guestInfo$ = writable$<GuestInfo>(null)
	readonly messageText$ = writable$<string>(null)
	readonly minimize$ = writable$(true)
	readonly name$ = writable$<string>(null)
	readonly notificationAudio$ = writable$<HTMLAudioElement>(null)
	readonly phone$ = writable$<string>(null)
	readonly showGuestForm$ = writable$<boolean>(false)
	readonly thread$ = writable$<IChatThread>(null)
	readonly UserName$ = derived$<Writable$<IChatThread>, string>(this.thread$,//region
		(thread:IChatThread)=>thread?.UserName)//endregion
	readonly UserNameInitials$ = derived$<Readable$<string>, string>(this.UserName$,//region
		(UserName:string)=>initials_(UserName) || '')//endregion
	readonly userOnline$ = derived$<Writable$<IChatThread>, boolean>(this.thread$,//endregion
		(thread:IChatThread)=>thread?.userOnline)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.init_chat().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly init_chat = async ()=>{
		log(this.ctx, Controller_name, 'init_chat()')
		this.busy$.$ = true
		this.text_busy$.$ = 'Our waiters are serving other customers. Please wait we will connect your shortly. Sorry for the delay.'
		const query:any = {}
		query.threadType = CHAT_THREAD_TYPE_SUPPORT
		if (this.isLoggedIn$.$) {
			query.authCode = (this.consumer_login_user$.$ as User).AuthCode
			query.userType = this.type$.$ === TYPE_CUSTOMER ? 'customer' : 'rest-user'
		} else {
			const guestInfo = this.guestInfo$.$
			const PublicKey = this.PublicKey$.$
			query.name = guestInfo.name
			query.email = guestInfo.email
			query.phone = guestInfo.phone || null
			query.userType = 'guest'
			query.publicKey = PublicKey
		}
		log(this.ctx, Controller_name, 'query', query)
		await subscribe_wait_timeout(this.socket_io_loaded$, I, timeout_ms)
		this.socket = io(SOCKET_SERVER_CHAT_(this.ctx.webConfig),
			{
				query: query
			})
		this.socket.on('error', async (error)=>{
			this.notyf_error('Unable to connect to chat at the moment. Please try later.')
			await this.disconnect(true)
			log(this.ctx, Controller_name, 'connection error', error)
		})
		this.socket.on('connected', (data)=>{
			this.thread$.$ = data.thread
			this.socket.emit('get-thread-messages', { threadID: this.thread$.$.ID })
			if (this.thread$.$.UserID) {
				this.init_chat_window()
			}
			log(this.ctx, Controller_name, 'connected to server', data)
		})
		this.socket.on('receive-message', (data:any)=>{
			const message:IChatMessage = data.message
			this.thread$.$.messages = this.thread$.$.messages || []
			this.thread$.$.messages.push(message)
			// If message recieved in current thread
			this.threadChatSectionScrollBottom()
			// If message came from user
			if (message.SenderType === 'user') {
				// Show Desktop notification
				show_Notification({
					title: `${this.thread$.$.UserName}`,
					body: message.Message,
				})
				// Play Notification Tone
				if (this.notificationAudio$.$) {
					this.notificationAudio$.$.pause()
					this.notificationAudio$.$.currentTime = 0
				}
				this.notificationAudio$.$ = new Audio(default_notification_tone_url)
				this.notificationAudio$.$.play().then()
			}
			log(this.ctx, Controller_name, 'receive-message', message)
		})
		this.socket.on('send-thread-messages', (data)=>{
			if (this.thread$.$ && data.messages && data.messages.length > 0) {
				const message:IChatMessage = data.messages[0]
				if (this.thread$.$.ID === message.ThreadID) {
					this.thread$.$.messages = data.messages
				}
			}
			this.threadChatSectionScrollBottom()
			log(this.ctx, Controller_name, 'send-thread-messages', data)
		})
		this.socket.on('thread-online-users', (data)=>{
			this.thread$.$.userOnline = data.user.online
			log(this.ctx, Controller_name, 'thread-online-users', data)
		})
		this.socket.on('user-assigned', (data)=>{
			merge(this.thread$.$, data.thread)
			this.init_chat_window()
			log(this.ctx, Controller_name, 'thread-online-users', data)
		})
		this.socket.on('thread-closed', async (data)=>{
			if (this.thread$.$.ID === data.threadID) {
				await this.disconnect(true)
				this.notyf_success('Thanks!<br>Chat session has been completed, If u have more questions you can contact us again.')
			}
		})
	}
	readonly init_chat_window = ()=>{
		this.busy$.$ = false
		this.text_busy$.$ = null
	}
	readonly close_chat_window = async (event)=>{
		event.stopPropagation()
		await this.disconnect(!this.thread$.$)
	}
	readonly hide_chat_window = (event)=>{
		event.stopPropagation()
		this.user_session_support_chat_window_hide$.$ = true
	}
	readonly disconnect = async (force?:boolean)=>{
		let confirm = force
		if (!force) {
			confirm = await this.confirmModal$.$.open({
				message: 'Are you sure you want to disconnect chat session?',
			})
		}
		if (confirm) {
			this.minimize$.$ = true
			if (this.socket) {
				this.socket.disconnect()
				this.socket = null
			}
			this.thread$.$ = null
			this.busy$.$ = false
			this.text_busy$.$ = null
		}
	}
	readonly open_chat = async ()=>{
		this.minimize$.$ = false
		if (!this.thread$.$) {
			if (this.isLoggedIn$.$) {
				await this.init_chat()
			} else {
				this.showGuestForm$.$ = true
			}
		}
	}
	readonly toggleMinimize = ()=>{
		this.minimize$.update(minimize=>!minimize)
	}
	readonly send_message = ()=>{
		if (isDefined(this.messageText$.$) && this.messageText$.$.trim().length > 0) {
			this.socket.emit('send-message', {
				message: this.messageText$.$
			})
			this.messageText$.$ = ''
			this.threadChatSectionScrollBottom()
		}
	}
	readonly submitGuestForm = async ()=>{
		if (!this.formErrors$.$.length) {
			this.showGuestForm$.$ = false
			await this.init_chat()
		}
	}
	private threadChatSectionScrollBottom = ()=>{
		setTimeout(()=>{
			const threadChatSection = this.threadChatSection$.$
			threadChatSection.scrollTop = threadChatSection.scrollHeight
		}, 10)
	}
}
declare global {
	interface Window {
		io:io_T
	}
}
interface GuestInfo {
	name:string
	email:string
	phone?:string
}
