import { log } from '@menus/util'
import { Socket } from './socket.model'
import { DB } from './database.model'
import { Chat } from './chat.model'
import { Guest } from './guest.model'
import { CHAT_THREAD_TYPE_SUPPORT } from '@menus/web-config'

const LOG_TAG = 'SupportChat'
export class SupportChat {
  /**
   * constructor
   */
  constructor(protected ctx: Ctx, private chat: Chat, private db: DB,) {}

  /**
   * Middleware Thread Type Orders
   */
  public useMiddleware = async (socket: Socket) => {
    const query = socket.handshake.query
    const userType = query.userType

    log(this.ctx, LOG_TAG, 'useMiddleware', userType)

    let isAuthenticated = false

    // if userType `guest`

    if (userType == 'guest') {
      isAuthenticated = await this.chat.authenticateGuest(socket)
    } else if (userType == 'customer') {
      isAuthenticated = await this.chat.authenticateCustomer(socket)
    } else if (userType == 'rest-user') {
      isAuthenticated = await this.chat.authenticateUser(socket)
    }

    return isAuthenticated
  }

  /**
   * On Connection
   */
  public onConnection = async (socket: Socket) => {
    log(this.ctx, LOG_TAG, 'onConnection', socket.userType)

    // if userType `guest`

    if (socket.userType == 'guest') {
      const user = <Guest>socket.user

      const supportDataResult = await this.db.createChatThreadsSupportData({
        GuestID: user.GuestID,
        GuestName: user.FirstName,
        GuestEmail: user.Email,
        GuestPhone: user.Phone,
      })

      if (supportDataResult.recordset.length > 0) {
        const typeDataID = supportDataResult.recordset[0].ID

        const chatThreadResult = await this.db.createChatThread(CHAT_THREAD_TYPE_SUPPORT, typeDataID)

        if (chatThreadResult.recordset.length > 0) {
          const threadID = chatThreadResult.recordset[0].ID

          const threadsResult = await this.db.findThreadsSupport({
            ID: threadID
          })

          socket.thread = threadsResult.recordset[0]
          this.chat.connectGuest(socket)

          log(this.ctx, 'New Thread Created', threadsResult.recordset)
        }
      }

      log(this.ctx, LOG_TAG, 'orderDataResult')
    } else if (socket.userType == 'customer') {

      // const threadsResult = await this.db.findThreadsSupport({
      //     customerID: socket.user.ID
      // });

      // // If thread exists
      // if (threadsResult.recordset.length > 0) {
      //     socket.thread = threadsResult.recordset[0];
      //     this.chat.connectCustomer(socket);

      //     log(this.ctx, LOG_TAG, 'Thread Already Exist', threadsResult.recordset);
      // }
      // else {
      // If thread DONT exists
      // log(this.ctx, LOG_TAG, 'Thread NOT Exist', threadsResult.recordset);

      const supportDataResult = await this.db.createChatThreadsSupportData({
        customerID: socket.user.ID
      })

      if (supportDataResult.recordset.length > 0) {
        const typeDataID = supportDataResult.recordset[0].ID

        const chatThreadResult = await this.db.createChatThread(CHAT_THREAD_TYPE_SUPPORT, typeDataID)

        if (chatThreadResult.recordset.length > 0) {
          const threadID = chatThreadResult.recordset[0].ID

          const threadsResult = await this.db.findThreadsSupport({
            ID: threadID
          })

          socket.thread = threadsResult.recordset[0]
          this.chat.connectCustomer(socket)

          log(this.ctx, 'New Thread Created', threadsResult.recordset)
        }
      }
      // }

      log(this.ctx, LOG_TAG, 'orderDataResult')
    } else if (socket.userType == 'rest-user') {

      const supportDataResult = await this.db.createChatThreadsSupportData({
        restUserID: socket.user.ID
      })

      if (supportDataResult.recordset.length > 0) {
        const typeDataID = supportDataResult.recordset[0].ID

        const chatThreadResult = await this.db.createChatThread(CHAT_THREAD_TYPE_SUPPORT, typeDataID)

        if (chatThreadResult.recordset.length > 0) {
          const threadID = chatThreadResult.recordset[0].ID

          const threadsResult = await this.db.findThreadsSupport({
            ID: threadID
          })

          socket.thread = threadsResult.recordset[0]
          this.chat.connectRestUser(socket)

          log(this.ctx, 'New Thread Created', threadsResult.recordset)
        }
      }

      log(this.ctx, LOG_TAG, 'orderDataResult')
    }
  }
}
