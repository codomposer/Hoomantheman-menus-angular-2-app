import * as moment from 'moment'

import { DB } from '../model/database.model'

import { Constants } from '../constants'
import { log } from '@menus/util'

import { Socket } from '../model/socket.model'
import { OrdersChat } from '../model/orders-chat.model'
import { SupportChat } from '../model/support-chat.model'
import { Chat } from '../model/chat.model'
import {
  CHAT_THREAD_TYPE_ORDERS,
  CHAT_THREAD_TYPE_SUPPORT,
} from '@menus/web-config'

export class Chat_c {
  LOG_TAG = 'Chat_c'

  private chat: Chat
  private ordersChat: OrdersChat
  private supportChat: SupportChat

  private db = new DB()
  private userSocketList: Socket[] = []
  private customerSocketList: Socket[] = []
  private restUserSocketList: Socket[] = []
  private guestSocketList: Socket[] = []
  private nps: any
  private constants: Constants

  constructor(io: any, constants: Constants) {
    this.constants = constants

    this.nps = io.of('/chat')

    this.chat = new Chat(this.nps, this.constants, this.db, this.guestSocketList, this.customerSocketList, this.restUserSocketList, this.userSocketList)
    this.ordersChat = new OrdersChat(this.chat, this.db)
    this.supportChat = new SupportChat(
      this.chat,
      this.db,
    )

    this.nps.use(this.useMiddleware)
        .on('connection', this.onConnection)
  }

  /**
   * Middleware
   */
  private useMiddleware = async (socket: Socket, next: any) => {
    const query = socket.handshake.query

    log(window.webConfig_ctx, this.LOG_TAG, 'Socket middleware')

    const userType = query.userType
    let isAuthenticated = false
    let errorCode = null

    // Common
    if (userType === 'user') {
      try {
        isAuthenticated = await this.chat.authenticateUser(socket)
      } catch (e) {
        log(window.webConfig_ctx, this.LOG_TAG, 'authenticateUser Exception', e.message)

        isAuthenticated = false
        errorCode = e.message
      }

    } else {

      // If thread type is `Orders`
      if (query.threadType === CHAT_THREAD_TYPE_ORDERS) {
        isAuthenticated = await this.ordersChat.useMiddleware(socket)
      }
      // If thread type is `Support`
      else if (query.threadType === CHAT_THREAD_TYPE_SUPPORT) {
        try {
          isAuthenticated = await this.supportChat.useMiddleware(socket)
        } catch (e) {
          log(window.webConfig_ctx, this.LOG_TAG, 'supportChat.useMiddleware Exception', e.message)

          isAuthenticated = false
          errorCode = e.message
        }
      }
    }

    if (!isAuthenticated) {
      next(new Error(JSON.stringify({
        status: isAuthenticated,
        code: errorCode
      })))
    } else {
      next()
    }
  }

  /**
   * On Connection
   */
  private onConnection = async (socket: Socket) => {
    // @ts-ignore
    socket.joinedTimestamp = moment().unix()
    const threadType = socket.handshake.query.threadType

    log(window.webConfig_ctx, 'Connected client.', socket.userType)

    // Common
    if (socket.userType == 'user') {
      const threadsOrderResult = await this.db.findThreadsOrder({
        userID: socket.user.ID
      })

      const threadsSupportResult = await this.db.findThreadsSupport({
        userID: socket.user.ID
      })

      socket.threads = threadsOrderResult.recordset.concat(threadsSupportResult.recordset)
      this.chat.connectUser(socket)

      log(window.webConfig_ctx, this.LOG_TAG, 'User Threads', socket.threads.length)
    } else {

      // If thread type is `Orders`
      if (threadType == CHAT_THREAD_TYPE_ORDERS) {
        await this.ordersChat.onConnection(socket)
      }
      // If thread type is `Support`
      else if (threadType == CHAT_THREAD_TYPE_SUPPORT) {
        await this.supportChat.onConnection(socket)
      }

    }

    // TODO: Verify security, Also check if a user has `active` socket connection, can he call the `on` event, and send messages to some other threads

    socket
    .on('send-message', (data: any) => {
      this.chat.onSendMessage(socket, data)
    })
    .on('get-thread-messages', (data: any) => {
      this.chat.onGetThreadMessages(socket, data)
    })
    .on('close-thread', (data: any) => {
      this.chat.onCloseThread(socket, data)
    })
    .on('disconnect', () => {
      this.chat.onDisconnect(socket)
    })
  }
}
