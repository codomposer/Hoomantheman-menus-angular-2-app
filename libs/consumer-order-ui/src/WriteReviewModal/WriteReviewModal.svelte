<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { style_ } from '@ctx-core/html'
import { getContext_ui_ctx } from '@menus/ui'
import { PageLoader } from '@menus/shared-ui'
import { api_src_ } from '@menus/api'
import { ladda } from '@menus/ladda'
import type { consumer_order_ui_Ctx } from '../consumer_order_ui_Ctx.js'
import { WriteReviewModal_c } from './WriteReviewModal_c.js'
const ctx = getContext_ui_ctx() as consumer_order_ui_Ctx
export const _ = new WriteReviewModal_c(ctx)
export const open = _.open, close = _.close
const {
	busy$, SubmitReview_busy$, is_modal_open$, order$, order_items$, activeReviewIcon, inActiveReviewIcon,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Write Review Modal -->
<div class="modal write-review-modal fade d-block in"
		 tabindex="-1"
		 role="dialog"
		 aria-labelledby="myModalLabel"
>
  <div class="modal-dialog" role="document" mStopEvent>
  <div class="modal-content">
    {#if $busy$}
      <PageLoader center="parent"></PageLoader>
    {/if}

		<div class="modal-header">
        <button type="button"
								class="close"
								on:click={close}
								aria-label="Close"
				>
          <div class="delete-icon"></div>
        </button>
        <h4 class="modal-title">Write Review</h4>
      </div>

      <div class="modal-body modal-scrollable">
        <div class="restaurant-details clearfix">
          {#if $order$?.RestImageExist}
            <div class="restaurant-img"
								 style={style_({
                   'background-image': `url(${api_src_($order$.FileName)})`
                 })}
						></div>
          {:else}
            <div class="restaurant-cuisine-icon">
              <div class="cuisine-icon-{$order$.CuisineID} custom-cuisine-icon"></div>
            </div>
          {/if}
					<div class="item-details">
            <div class="item-restaurant-name">{ $order$.RestaurantName }</div>
            <div class="item-address c-text2">{ $order$.RestaurantAddress }</div>
          </div>
        </div>

        <div class="order-item-list">
          {#each $order_items$ as orderItem}
            <div class="order-item">
              <div class="item-name">{ orderItem.ItemName }</div>

              <div class="customer-rating">
                <img class="rating-image"
										 alt="1 star"
										 src={orderItem.CustomerRating >= 1 ? activeReviewIcon : inActiveReviewIcon}
										 on:click={_evt => _.setRating(orderItem, 1)}/>
                <img class="rating-image"
										 alt="2 stars"
										 src={orderItem.CustomerRating >= 2 ? activeReviewIcon : inActiveReviewIcon}
										 on:click={_evt => _.setRating(orderItem, 2)}/>
                <img class="rating-image"
										 alt="3 stars"
										 src={orderItem.CustomerRating >= 3 ? activeReviewIcon : inActiveReviewIcon}
										 on:click={_evt => _.setRating(orderItem, 3)}/>
                <img class="rating-image"
										 alt="4 stars"
										 src={orderItem.CustomerRating >= 4 ? activeReviewIcon : inActiveReviewIcon}
										 on:click={_evt => _.setRating(orderItem, 4)}/>
                <img class="rating-image"
										 alt="5 stars"
										 src={orderItem.CustomerRating >= 5 ? activeReviewIcon : inActiveReviewIcon}
										 on:click={_evt => _.setRating(orderItem, 5)}/>
                <span class="customer-rating-text">{ _.getForkRatingText(orderItem) }</span>
              </div>
              <div class="customer-comment">
                <textarea class="form-control"
													name="comment"
													cols="30"
													rows="3"
													bind:value={orderItem.CustomerComment}
								></textarea>
              </div>

              <div class="order-images clearfix">
                {#each orderItem?.orderImages || [] as orderImage,index}
                  <div class="order-image">
                    {#if orderImage}
                      <div class="custom-photo"
													 style={style_({'background-image': `url(${orderImage.URL})`})}
											>
                        <div class="custom-photo-close">
                          <div class="close-3-white-icon custom-icon"
															 on:click={_evt => _.delete_review_image(orderItem, index)}
													></div>
                        </div>
                      </div>
                    {:else}
                      <div class="add-photo-icon no-photo"
											>
<!--                           on:click={_evt => vm.upload_Image(orderItem, index)}-->
                        <input class="order-image-file"
															 type="file"
															 on:change={evt => _.upload_review_image(orderItem, evt.target, index)}
												/>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="modal-footer">
				<div class="row">
					<button use:ladda={$SubmitReview_busy$} type="button" class="col-xs-6 btn btn-primary"
									on:click={_.submit_review}
					>Save</button>
					<button type="button"
									class="col-xs-6 btn btn-primary btn-inverse"
									on:click={close}
					>Cancel</button>
				</div>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss>
@import "@menus/consumer-shared-css/lib";
.modal.write-review-modal {
	.modal-body {
		padding-top: 42px;
		.restaurant-details {
			padding-bottom: 32px;
			border-bottom: 1px solid #DBDBDB;
			.item-details {
				float: left;
			}
			.restaurant-cuisine-icon {
				float: left;
				width: 88px;
				height: 94px;
				padding: 18px 16px;
				background-color: #F7F7F7;
				.custom-cuisine-icon {
					width: 100%;
					height: 100%;
				}
			}
			.restaurant-img {
				float: left;
				width: 88px;
				height: 94px;
				margin: 0;
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50%;
			}
			.item-details {
				margin-top: 22px;
				padding-left: 16px;
				.item-restaurant-name {
					font-weight: $lato-bold;
					font-size: 18px;
				}
				.item-address {
					margin-top: 8px;
				}
			}
		}
		.order-item-list {
			.order-item {
				margin-top: 40px;
				.item-name {
					font-weight: $lato-black;
					font-size: 18px;
				}
				.customer-rating {
					padding-left: 4px;
					.rating-image {
						cursor: pointer;
						width: 40px;
						margin-left: -10px;
					}
					.customer-rating-text {
						margin-left: 16px;
						font-size: 11px;
					}
				}
				.customer-comment {
					margin-top: 24px;
					textarea {
						padding-top: 11px;
						padding-bottom: 11px;
						padding-left: 16px;
						padding-right: $input-height-large;
					}
				}
				.order-images {
					margin-top: 24px;
					.order-image {
						cursor: pointer;
						width: 80px;
						height: 80px;
						float: left;
						margin-right: 24px;
						.no-photo {
							position: relative;
							width: 100%;
							height: 100%;
							padding: 8px;
							.order-image-file {
								cursor: pointer;
								position: absolute;
								width: 100%;
								height: 100%;
								opacity: 0;
								top: 0;
								left: 0;
							}
						}
						.custom-photo {
							height: 100%;
							background-repeat: no-repeat !important;
							background-position: 50% !important;
							background-size: contain !important;
							.custom-photo-close {
								display: none;
								text-align: right;
								.custom-icon {
									background-color: #7D8488;
								}
							}
							&:hover {
								.custom-photo-close {
									display: block;
								}
							}
						}
					}
				}
				.customer-images {
					margin-top: 24px;
					.customer-image {
						float: left;
						margin-right: 24px;
						width: 80px;
						height: 80px;
						img {
							max-width: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
