import { io, Socket } from 'socket.io-client'
import { not } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { support_chat_window_hide$_b, IChatMessage, IChatThread, MessageTemplate } from '@menus/chat'
import { ro_login_user$_b, ro_login_user_NotificationTone_path$_b, Ro_User } from '@menus/ro-user-common'
import { log, show_Notification } from '@menus/util'
import { SOCKET_SERVER_CHAT_, timeout_ms } from '@menus/web-config'
import { ro_sideMenuOpened$_b } from '@menus/ro-layout-ui'
import { notyf_error_b } from '@menus/notyf'
import type { ChatTemplatesModal_I } from '@menus/chat-ui'
import type { login_user$_T } from '@menus/user-common'
import type { ro_chat_ui_Ctx } from '../ro_chat_ui_Ctx.js'
const Controller_name = 'Chat_c'
export class Chat_c extends BaseController<ro_chat_ui_Ctx> {
	readonly chatTemplatesModal$:Writable$<ChatTemplatesModal_I> = writable$(null)
	readonly threadChatSection$:Writable$<HTMLDivElement> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_login_user$:login_user$_T<Ro_User> = ro_login_user$_b(this.ctx)
	readonly ro_login_user_NotificationTone_path$ = ro_login_user_NotificationTone_path$_b(this.ctx)
	readonly ro_sideMenuOpened$ = ro_sideMenuOpened$_b(this.ctx)
	readonly support_chat_window_hide$ = support_chat_window_hide$_b(this.ctx)
	notificationAudio = null
	readonly messageTemplates$:Writable$<MessageTemplate[]> = writable$([])
	readonly messageText$:Writable$<string> = writable$(null)
	readonly keywords$:Writable$<string> = writable$(null)
	readonly selectedThread$:Writable$<IChatThread> = writable$(null)
	readonly selectedThreadActionsOpened$:Writable$<boolean> = writable$(false)
	readonly threads$:Writable$<IChatThread[]> = writable$([])
	private socket:Socket
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load().then()
	}
	async onDestroy() {
		log(this.ctx, Controller_name, 'onDestroy')
		if (this.socket) {
			this.socket.disconnect()
		}
		this.support_chat_window_hide$.$ = false
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	};
	load = async ()=>{
		if (!has_dom) return
		log(this.ctx, Controller_name, 'load()')
		await subscribe_wait_timeout(this.ro_login_user$.ready$, I, timeout_ms)
		this.socket = io(SOCKET_SERVER_CHAT_(this.ctx.webConfig),
			{
				query: {
					authCode: (this.ro_login_user$._ as Ro_User)?.AuthCode,
					userType: 'user'
				}
			})
		this.socket.on('error', (error)=>{
			try {
				const response = JSON.parse(error.toString())
				if (response.code === 'USER_NOT_FOUND') {
					this.notyf_error(`Unable to connect to the chat, Your account doesn't exist.`)
				} else if (response.code === 'USER_COMPANY_NOT_FOUND') {
					this.notyf_error(`Unable to connect to the chat, Your account doesn't belongs to a company.`)
				} else {
					this.notyf_error(`Unable to connect to the chat, Please try again.`)
				}
			} catch (e) {
				this.notyf_error(`Unable to connect to the chat, Please try again.`)
			}
			log(this.ctx, Controller_name, 'connection error', error)
		})
		this.socket.on('connected', (data)=>{
			this.threads$.$ = data.threads
			log(this.ctx, Controller_name, 'connected to server', data)
		})
		this.socket.on('new-thread', (data)=>{
			const threads = this.threads$.$
			threads.push(data.thread)
			this.threads$.$ = threads
			log(this.ctx, Controller_name, 'new-thread', data)
		})
		this.socket.on('receive-message', (data:any)=>{
			const message:IChatMessage = data.message
			let selectedThread:IChatThread = null
			if (this.selectedThread$.$?.ID === message.ThreadID) {
				selectedThread = this.selectedThread$.$
			} else {
				const list = this.threads$.$.filter(t=>t.ID === message.ThreadID)
				if (list.length) {
					selectedThread = list[0]
				}
			}
			if (selectedThread) {
				selectedThread.messages = selectedThread.messages || []
				selectedThread.messages.push(message)
				// If message received in current selectedThread
				if (selectedThread.ID === this.selectedThread$.$?.ID) {
					this._threadChatSectionScrollBottom()
				} else {
					selectedThread.count = selectedThread.count || 0
					selectedThread.count++
				}
				this.selectedThread$.$ = selectedThread
				// If message came from customer
				if (message.SenderType === 'customer' || message.SenderType === 'guest') {
					// Show Desktop notification
					show_Notification({
						title: `${selectedThread.CustomerID ? selectedThread.CustomerName : selectedThread.GuestName}`,
						body: message.Message,
					})
					// Play Notification Tone
					if (this.notificationAudio) {
						this.notificationAudio.pause()
						this.notificationAudio.currentTime = 0
					}
					if ((this.ro_login_user$._ as Ro_User).NotificationTone) {
						this.notificationAudio = new Audio(this.ro_login_user_NotificationTone_path$.$)
						this.notificationAudio.play()
					}
				}
			}
			log(this.ctx, 'receive-message', message)
		})
		this.socket.on('send-thread-messages', (data)=>{
			const selectedThread = this.selectedThread$._
			if (selectedThread && data.messages?.length > 0) {
				const message:IChatMessage = data.messages[0]
				if (selectedThread.ID === message.ThreadID) {
					selectedThread.messages = data.messages
					this.selectedThread$._ = selectedThread
				}
			}
			this._threadChatSectionScrollBottom()
			log(this.ctx, 'send-thread-messages', data)
		})
		this.socket.on('thread-online-users', (data)=>{
			const threads = this.threads$.$ || []
			const list = threads.filter(t=>t.ID === data.threadID)
			if (list.length) {
				const thread:IChatThread = list[0]
				thread.isOtherOnline =
					thread.RestUserID
					? data.restUser.online
					: thread.CustomerID
						? data.customer.online
						: data.guest.online
				this.threads$.$ = threads
			}
			log(this.ctx, 'thread-online-users', data)
		})
		this.socket.on('thread-closed', (data)=>{
			const threadID = data.threadID
			if (threadID === this.selectedThread$.$.ID) {
				this.selectedThread$.$ = null
			}
			const threads = this.threads$.$
			const list = threads.filter(t=>t.ID === threadID)
			if (list.length) {
				const thread = list[0]
				const index = threads.indexOf(thread)
				threads.splice(index, 1)
				this.threads$.$ = threads
			}
		})
		this.socket.on('send-message-templates', (data)=>{
			log(this.ctx, 'send-message-templates', data)
			this.messageTemplates$.$ = data.messageTemplates
		})
	}
	toggleSelectedThreadActions = ()=>{
		this.selectedThreadActionsOpened$.update(not)
	}
	chooseThread = (selectedThread)=>{
		log(this.ctx, Controller_name, 'chooseThread', selectedThread)
		selectedThread.count = 0
		this.selectedThread$.$ = selectedThread
		this.socket.emit('get-thread-messages', { threadID: selectedThread.ID })
		this._threadChatSectionScrollBottom()
	}
	unSelectThread = ()=>{
		this.selectedThread$.$ = null
	}
	send_message = ()=>{
		const messageText = this.messageText$.$
		if (messageText.trim().length) {
			this.socket.emit('send-message', {
				message: messageText,
				threadID: this.selectedThread$.$.ID
			})
			this.messageText$.$ = ''
			this._threadChatSectionScrollBottom()
		}
	}
	onchange_search_text = ()=>{
		log(this.ctx, 'onchange_search_text', this.keywords$.$)
		for (const thread of this.threads$.$) {
			const search_text = this.keywords$.$.toLowerCase()
			const columns = ['CustomerName', 'OrderNumber', 'GuestName']
			let hidden = true
			for (const column of columns) {
				if (thread[column] && thread[column].toLowerCase().indexOf(search_text) > -1) {
					hidden = false
					break
				}
			}
			thread.hidden = hidden
		}
	}
	closeThread = (thread:IChatThread)=>{
		log(this.ctx, 'closeThread', thread)
		this.socket.emit('close-thread', { threadID: thread.ID })
	}
	pageClick = ()=>{
		this.selectedThreadActionsOpened$.$ = false
	}
	open_chatTemplatesModal = async ()=>{
		const data = await this.chatTemplatesModal$.$.open({
			messageTemplates: this.messageTemplates$.$,
		})
		if (data && data.messageTemplate) {
			this.messageText$.$ = data.messageTemplate.Value
		}
	}
	private _threadChatSectionScrollBottom = ()=>{
		setTimeout(()=>{
			const threadChatSection = this.threadChatSection$.$
			threadChatSection.scrollTop = threadChatSection.scrollHeight
		}, 10)
	}
}
