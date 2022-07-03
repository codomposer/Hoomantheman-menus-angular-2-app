import { io } from 'socket.io-client'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { support_chat_window_hide$_b, IChatMessage, IChatThread } from '@menus/chat'
import { isDefined, log, merge, show_Notification } from '@menus/util'
import { SOCKET_SERVER_CHAT_, CHAT_THREAD_TYPE_ORDERS, timeout_ms } from '@menus/web-config'
import { consumer_login_user$_b, User } from '@menus/consumer-user-common'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { io_T, socket_io_loaded$_b, socket_io_loaded$_T, socket_T } from '@menus/socket.io'
import { navigating_goto_b } from '@menus/page'
import { default_notification_tone_url } from '@menus/notification-tone'
import type { consumer_chat_ui_Ctx } from '../consumer_chat_ui_Ctx.js'
const Controller_name = 'OrderChat_c'
export class OrderChat_c extends BaseController<consumer_chat_ui_Ctx> {
	readonly orderID:Writable$<number> = writable$(null)
	private socket:socket_T
	readonly threadChatSection$:Writable$<HTMLDivElement> = writable$(null)
	readonly support_chat_window_hide$ = support_chat_window_hide$_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly socket_io_loaded:socket_io_loaded$_T = socket_io_loaded$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly busyText$:Writable$<string> = writable$('')
	readonly messageText$:Writable$<string> = writable$(null)
	readonly notificationAudio$:Writable$<HTMLAudioElement> = writable$(null)
	readonly thread$:Writable$<IChatThread> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.init_chat().then()
	}
	async onDestroy() {
		log(this.ctx, Controller_name, 'ngOnDestroy')
		if (this.socket) {
			this.socket.disconnect()
		}
		this.support_chat_window_hide$.$ = false
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	};
	readonly init_chat = async ()=>{
		log(this.ctx, Controller_name, 'init_page()')
		this.busy$.$ = true
		this.busyText$.$ = 'Our waiters are serving other customers. Please wait we will connect your shortly. Sorry for the delay.'
		await subscribe_wait_timeout(this.socket_io_loaded, I, timeout_ms)
		this.socket = io(
			SOCKET_SERVER_CHAT_(this.ctx.webConfig),
			{
				query: {
					authCode: (this.consumer_login_user$.$ as User)?.AuthCode!,
					userType: 'customer',
					threadType: CHAT_THREAD_TYPE_ORDERS.toString(),
					orderID: this.orderID.toString()
				}
			})
		this.socket.on('error', ()=>{
			this.notyf_error('Unable to connect to chat at the moment. Please try later.')
			this.navigating_goto('/past-orders')
			log(this.ctx, Controller_name, 'connection error')
		})
		this.socket.on('connected', (data)=>{
			this.thread$.$ = data.thread
			this.socket.emit('get-thread-messages', { threadID: this.thread$.$.ID })
			if (this.thread$.$.UserID) {
				this.init_chat_window()
			}
			log(this.ctx, Controller_name, 'connected to server', data)
		})
		this.socket.on('receive-message', async (data:any)=>{
			const message:IChatMessage = data.message
			this.thread$.$.messages = this.thread$.$.messages || []
			this.thread$.$.messages.push(message)
			// If message recieved in current thread
			this._threadChatSectionScrollBottom()
			// If message came from user
			if (message.SenderType === 'user') {
				// Show Desktop notification
				await show_Notification({
					title: `${this.thread$.$.UserName}`,
					body: message.Message,
				})
				// Play Notification Tone
				if (this.notificationAudio$.$) {
					this.notificationAudio$.$.pause()
					this.notificationAudio$.$.currentTime = 0
				}
				this.notificationAudio$.$ = new Audio(default_notification_tone_url)
				await this.notificationAudio$.$.play()
			}
			log(this.ctx, 'receive-message', message)
		})
		this.socket.on('send-thread-messages', (data)=>{
			if (this.thread$.$ && data.messages && data.messages.length > 0) {
				const message:IChatMessage = data.messages[0]
				if (this.thread$.$.ID === message.ThreadID) {
					this.thread$.$.messages = data.messages
				}
			}
			this._threadChatSectionScrollBottom()
			log(this.ctx, 'send-thread-messages', data)
		})
		this.socket.on('thread-online-users', (data)=>{
			this.thread$.$.userOnline = data.user.online
			log(this.ctx, 'thread-online-users', data)
		})
		this.socket.on('user-assigned', (data)=>{
			merge(this.thread$.$, data.thread)
			this.init_chat_window()
			log(this.ctx, 'thread-online-users', data)
		})
		this.socket.on('thread-closed', async (data)=>{
			if (this.thread$.$.ID === data.threadID) {
				this.disconnect()
				this.notyf_success('Thanks!<br>Chat session has been completed, If u have more questions you can contact us again.')
				await this.navigating_goto('/past-orders')
			}
		})
	}
	readonly init_chat_window = ()=>{
		this.busy$.$ = false
		this.busyText$.$ = null
	}
	readonly send_message = ()=>{
		if (isDefined(this.messageText$.$) && this.messageText$.$.trim().length > 0) {
			this.socket.emit('send-message', {
				message: this.messageText$.$
			})
			this.messageText$.$ = ''
			this._threadChatSectionScrollBottom()
		}
	}
	readonly disconnect = ()=>{
		if (this.socket) {
			this.socket.disconnect()
		}
	}
	readonly closeThread = (thread:IChatThread)=>{
		log(this.ctx, 'closeThread', thread)
		this.socket.emit('close-thread', { threadID: thread.ID })
	}
	readonly goBack = async ()=>{
		await this.navigating_goto('/past-orders')
	}
	private _threadChatSectionScrollBottom = ()=>{
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
