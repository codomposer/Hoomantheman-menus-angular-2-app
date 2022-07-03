<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from 'svelte'
import { Modal } from '@menus/modal'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_signup_ui_Ctx } from '../../ro_signup_ui_Ctx.js'
import { Signup_step$_b } from '../Signup_step$_b.js'
import { STEP_NEW_REST } from '../STEP.js'
import { Signup_STEP_REST_LIST_restaurant_name_modal_c } from './Signup_STEP_REST_LIST_restaurant_name_modal_c.js'
const ctx = getContext_ui_ctx() as ro_signup_ui_Ctx
const dispatch = createEventDispatcher()
const Signup_step$ = Signup_step$_b(ctx)
const _ = new Signup_STEP_REST_LIST_restaurant_name_modal_c(ctx, dispatch)
export const { open, close } = _
const { rest_name$, search_rest_busy$, rest_list$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
let rest_name_input:HTMLInputElement
$: rest_name_input && rest_name_input.focus()
</script>

<Modal
	{_} no_footer={true} class="Signup_STEP_REST_LIST_restaurant_name_modal" title="Please enter your restaurant name"
>
  <div class="form-group restaurant-name-input">
    <input
			bind:this={rest_name_input}
			type="text" class="form-control" id="rest_name" name="rest_name"
			bind:value={$rest_name$}
			placeholder="Search for your company"
			required
		>
  </div>
	<div class="rest-auto-complete-list">
		{#if $search_rest_busy$}
			<PageLoader></PageLoader>
		{:else}
			<div class="auto-complete-item-wrapper">
				{#each $rest_list$ || [] as item}
					<div class="auto-complete-item"
							 on:click={_evt => _.choose_restaurant(item)}
					>
						<div class="restaurant-name">{ item.Name }</div>
						<div class="restaurant-address">
							{ item.Address_1 }
							{#if item.Address_2}<span>{ item.Address_2 }</span> {/if},
							{ item.City }, { item.State } { item.ZipCode }
						</div>
					</div>
				{/each}
				<div class="auto-complete-item create-new"
						 on:click={evt=>{
							 Signup_step$.$ = STEP_NEW_REST
						 }}
				>Create New Business</div>
			</div>
		{/if}
	</div>
</Modal>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.Signup_STEP_REST_LIST_restaurant_name_modal {
	.restaurant-name-input {
		margin: 12px 0 0;
	}
	.rest-auto-complete-list {
		background-color: white;
		width: 100%;
		margin-left: -1px;
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
		border-radius: 3px 3px 0 0;
		z-index: 1;
		.auto-complete-item-wrapper {
			padding-top: 10px;
			.auto-complete-item {
				cursor: pointer;
				padding: 11px 18px 16px;
				border-bottom: 1px solid #DBDBDB;
				.restaurant-name {
					font-weight: $lato-black;
				}
				.restaurant-address {
					margin-top: 3px;
				}
				&:hover {
					background-color: $brand-success;
					.restaurant-name, .restaurant-address {
						color: white;
					}
				}
				&.create-new {
					font-weight: $lato-black;
					color: $brand-success;
					&:hover {
						color: white;
					}
				}
			}
		}
	}
}
</style>
