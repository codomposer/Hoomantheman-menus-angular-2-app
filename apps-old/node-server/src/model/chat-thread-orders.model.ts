import { ChatThread } from './chat-thread.model'

export class ChatThreadOrders extends ChatThread {
  CustomerID: number
  CustomerName: string
  UserID: number
  UserName: string
  OrderNumber: string
}
