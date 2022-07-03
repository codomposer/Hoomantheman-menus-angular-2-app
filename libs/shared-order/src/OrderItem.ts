import type { OrderItem_I } from './OrderItem_I.js'
export class OrderItem implements OrderItem_I {
	// API Fields
	public ID:number
	public ItemID:number
	public ItemName:string
	public Amount:number
	public CustomerComment:string
	public CustomerRating:number
	public OrderID:number
	public Price:number
	public Qty:number
}
