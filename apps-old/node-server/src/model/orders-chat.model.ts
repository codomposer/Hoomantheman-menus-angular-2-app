import axios from 'axios'
import { CHAT_THREAD_TYPE_ORDERS } from '@menus/web-config'
import { log } from '@menus/util'
import type { ui_Ctx } from '@menus/ui'
import { Constants } from '../constants'
import type { Socket } from './socket.model'
import type { DB } from './database.model'
import type { Chat } from './chat.model'

const LOG_TAG = 'OrdersChat'
export class OrdersChat {
  /**
   * constructor
   */
  constructor(protected ctx: ui_Ctx, private chat: Chat, private db: DB,) {}

  /**
   * Middleware Thread Type Orders
   */
  public useMiddleware = async (socket: Socket) => {
    log(this.ctx, LOG_TAG, 'middlewareThreadTypeOrders')

    const query = socket.handshake.query
    const userType = query.userType
    const authCode = query.authCode

    let isAuthenticated = false

    if (userType === 'customer') {

      const isCustomerAuthenticated = await this.chat.authenticateCustomer(socket)

      if (isCustomerAuthenticated) {
        socket.orderNumber = query.orderNumber

        // Verify whether this `orderNumber` belongs to this `Customer` or not....
        const customerOrderResult = await this.db.findCustomerOrder(socket.orderNumber, socket.user.ID)
        if (customerOrderResult.recordset.length > 0) {

          const orderDB = customerOrderResult.recordset[0]

          const url = `${Constants.API_URL}/api/b/w.aspx?key=API_TEST_KEY&o=${orderDB.ID}&x=${authCode}&i=${socket.user.ID}`
          log(this.ctx, LOG_TAG, 'ordersURL', url)

          const ordersResponse = await axios.get(url)

          if (ordersResponse.data instanceof Array && ordersResponse.data.length > 0) {
            const orderAPI = ordersResponse.data[0]

            isAuthenticated = orderAPI.AllowChat
          }

          log(this.ctx, LOG_TAG, 'ordersResponse', ordersResponse.data)
        }
      }

      log(this.ctx, LOG_TAG, 'middlewareThreadTypeOrders', 'isAuthenticated', isAuthenticated)
    }

    return isAuthenticated
  }

  /**
   * On Connection
   */
  public onConnection = async (socket: Socket) => {
    if (socket.userType == 'customer') {
      const threadsResult = await this.db.findThreadsOrder({
        orderNumber: socket.orderNumber,
        customerID: socket.user.ID
      })

      // If thread exists
      if (threadsResult.recordset.length > 0) {
        socket.thread = threadsResult.recordset[0]
        this.chat.connectCustomer(socket)

        log(this.ctx, 'Thread Already Exist', threadsResult.recordset)
      } else {
        // If thread DONT exists
        log(this.ctx, 'Thread NOT Exist', threadsResult.recordset)

        const orderDataResult = await this.db.createChatThreadOrderData(socket.orderNumber, socket.user.ID)
        if (orderDataResult.recordset.length > 0) {
          const typeDataID = orderDataResult.recordset[0].ID

          await this.db.createChatThread(CHAT_THREAD_TYPE_ORDERS, typeDataID)

          const threadsResult = await this.db.findThreadsOrder({
            orderNumber: socket.orderNumber,
            customerID: socket.user.ID
          })

          socket.thread = threadsResult.recordset[0]
          this.chat.connectCustomer(socket)

          log(this.ctx, 'New Thread Created', threadsResult.recordset)
        }

        log(this.ctx, LOG_TAG, 'orderDataResult', orderDataResult.recordset[0])
      }
    }
  }
}
