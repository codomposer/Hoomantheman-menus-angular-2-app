import { Writable$, writable$ } from '@ctx-core/store'
import { consumer_http_client_b, rate_order_item_payload_T } from '@menus/consumer-http'
import { OrderItemsDetailsAPIRequestQuery } from '@menus/consumer-order'
import { RateOrderItemAPIRequestQuery } from '@menus/consumer-order-common'
import { add_points_b, consumer_login_user$_b, assign_AllowReviewOrderCount_b } from '@menus/consumer-user-common'
import { BaseModalController } from '@menus/modal'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { Order, OrderItem_I } from '@menus/shared-order'
import { fork_map_icon_ } from '@menus/shared-ui-lib'
import { getBytesByMb, isDefined, log } from '@menus/util'
import { colors, RO_ALLOWED_IMG_TYPES, RO_MAX_IMG_SIZE } from '@menus/web-config'
import type { consumer_order_ui_Ctx } from '../consumer_order_ui_Ctx.js'
import type { WriteReviewModal_close_T, WriteReviewModal_open_T, WriteReviewModal_I } from './WriteReviewModal_I.js'
const Controller_name = 'WriteReviewModal_c.js'
export class WriteReviewModal_c
	extends BaseModalController<WriteReviewModal_open_T, WriteReviewModal_close_T, consumer_order_ui_Ctx>
	implements WriteReviewModal_I {
	readonly activeReviewIcon = fork_map_icon_(colors.brandSuccess)
	readonly add_points = add_points_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly inActiveReviewIcon = fork_map_icon_(colors.darkGray)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly assign_AllowReviewOrderCount = assign_AllowReviewOrderCount_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly SubmitReview_busy$:Writable$<boolean> = writable$(false)
	readonly order$:Writable$<Order> = writable$(null)
	readonly order_items$:Writable$<OrderItem_I[]> = writable$([])
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	};
	readonly before_open_modal = async ({ order }:{ order:Order })=>{
		this.busy$.$ = true
		try {
			this.order$.$ = order
			const requestData = new OrderItemsDetailsAPIRequestQuery()
			requestData.a = order.ID
			OrderItemsDetailsAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
			this.order_items$.$ =
				await this.consumer_http_client.get_past_order_items_details(requestData) as OrderItem_I[]
		} finally {
			this.busy$.$ = false
		}
	}
	readonly getForkRatingText = (orderItem)=>{
		if (isDefined(orderItem) && isDefined(orderItem.CustomerRating)) {
			if (orderItem.CustomerRating === 1) {
				return 'Yikes'
			} else if (orderItem.CustomerRating === 2) {
				return 'Bites'
			} else if (orderItem.CustomerRating === 3) {
				return 'All right'
			} else if (orderItem.CustomerRating === 4) {
				return 'Worth a try'
			} else if (orderItem.CustomerRating === 5) {
				return 'Love it'
			} else {
				return ''
			}
		} else {
			return ''
		}
	}
	readonly setRating = (orderItem, rating)=>{
		orderItem.CustomerRating = rating
		this.order_items$.$ = this.order_items$.$
	}
	readonly delete_review_image = async (orderItem, index)=>{
		this.busy$.$ = true
		try {
			const orderItemImage = orderItem.orderImages[index]
			const requestData = new RateOrderItemAPIRequestQuery()
			RateOrderItemAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
			requestData.a = orderItemImage.ID
			const payload = await this.consumer_http_client.delete_review_image(requestData)
			if (payload?.Code === 'DELETE_IMAGE') {
				orderItem.orderImages[index] = {
					exist: false
				}
				let foundIndex = null
				for (const item of orderItem.CustomerMenuItemUploads) {
					if (item.BoxIndex === index) {
						foundIndex = index
						break
					}
				}
				if (foundIndex) {
					orderItem.CustomerMenuItemUploads.splice(foundIndex, 1)
				}
				await this.notyf_success('Image deleted successfully.')
			} else {
				await this.notyf_error('Unable to delete image.')
			}
			log(this.ctx, Controller_name, 'delete_review_image', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly submit_review = async ()=>{
		this.SubmitReview_busy$.$ = true
		try {
			const reviewPromises:Promise<rate_order_item_payload_T>[] = []
			for (const orderItem of this.order_items$.$) {
				if (orderItem.CustomerRating) {
					const requestData = new RateOrderItemAPIRequestQuery()
					RateOrderItemAPIRequestQuery.fillOrderItem(requestData, orderItem)
					OrderItemsDetailsAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
					reviewPromises.push(this.consumer_http_client.rate_order_item(requestData))
				}
			}
			if (reviewPromises.length) {
				const payloads = await Promise.all(reviewPromises)
				let total_points = 0
				let allowReviewOrderCount = 0
				// Add User Points
				for (const response of payloads) {
					if (response?.Code === 'ADD_CUSTOMER_FEEDBACK') {
						total_points += response.AddedCustomerPoints
						allowReviewOrderCount = response.AllowReviewOrderCount
					}
				}
				this.add_points(total_points)
				await this.assign_AllowReviewOrderCount(allowReviewOrderCount)
				await this.close({ total_points })
				log(this.ctx, Controller_name, 'all reviews done', payloads)
			} else {
				await this.notyf_error('Rating is required.')
			}
		} finally {
			this.SubmitReview_busy$.$ = false
		}
		log(this.ctx, Controller_name, 'submit_review')
	}
	readonly upload_review_image = async (orderItem, reviewImageInput, index)=>{
		log(this.ctx, Controller_name, 'upload_review_image', orderItem, reviewImageInput)
		orderItem.CustomerMenuItemUploads = orderItem.CustomerMenuItemUploads || []
		const inputElement:HTMLInputElement = reviewImageInput
		const fileCount:number = inputElement.files.length
		const formData = new FormData()
		// a file was selected
		if (fileCount) {
			const file = inputElement.files.item(0)
			if (RO_ALLOWED_IMG_TYPES.indexOf(file.type) === -1) {
				inputElement.value = ''
				await this.notyf_error('Sorry!<br>Invalid file format. Only PNG and JPG are allowed.')
			} else if (file.size > getBytesByMb(RO_MAX_IMG_SIZE)) {
				inputElement.value = ''
				await this.notyf_error(`Sorry!<br>File size can't be greater then ${RO_MAX_IMG_SIZE}MB.`)
			} else {
				formData.append('file[]', file)
				this.busy$.$ = true
				try {
					const requestData = new RateOrderItemAPIRequestQuery()
					requestData.m = orderItem.ItemID
					requestData.b = index
					requestData.o = this.order$.$.OrderNumber
					RateOrderItemAPIRequestQuery.fill_login_user(requestData, this.consumer_login_user$.$)
					const payload = await this.consumer_http_client.upload_review_image(requestData, formData)
					if (payload?.Code === 'FILE_UPLOAD_SUCCESS') {
						const orderItemImage = payload.Image
						orderItem.orderImages[index] = orderItemImage
						orderItem.orderImages[index].exist = true
						orderItem.CustomerMenuItemUploads = orderItem.CustomerMenuItemUploads || []
						orderItem.CustomerMenuItemUploads.push(orderItemImage)
						this.add_points(parseFloat(payload.AddedCustomerPoints.toString()))
						await this.notyf_success('Image uploaded successfully.')
					} else {
						inputElement.value = ''
						await this.notyf_error('Unable to upload file.')
					}
					log(this.ctx, Controller_name, 'upload_review_image', { payload, formData })
				} finally {
					this.busy$.$ = false
				}
			}
		}
	}
}
