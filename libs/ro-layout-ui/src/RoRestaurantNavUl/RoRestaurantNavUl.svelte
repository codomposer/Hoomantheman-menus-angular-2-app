<script lang="ts">
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { getContext_ui_ctx } from '@menus/ui'
import {
	REST_INFO_TAB, ACCOUNT_INFORMATION_TAB, MENUS_TAB, ORDERS_TAB, COUPONS_TAB, PREVIEW_TAB, CHARTS_TAB, FIN_REPORT_TAB,
	FIN_STATEMENT_TAB, CUSTOMER_REVIEW_TAB,
} from '@menus/web-config'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
import { RoRestaurantNavLi } from '../RoRestaurantNavLi'
import { TutorialChapterId } from '@menus/ro-support-ui';
export let show_tutorial_icon = false
export let a_class_:(tab:string)=>string = ()=>''
export let li_class_:(tab:string)=>string = ()=>''
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
</script>

<ul class="RoRestaurantNavUl {$$props.class}">
  {#if $ro_auth_rules$[REST_INFO_TAB]}
    <RoRestaurantNavLi
			class={li_class_(REST_INFO_TAB)}
			{a_class_}
			tab={REST_INFO_TAB}
			name="Restaurant Info"
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.RESTAURANT_INFORMATION : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[ACCOUNT_INFORMATION_TAB]}
    <RoRestaurantNavLi
			class={li_class_(ACCOUNT_INFORMATION_TAB)}
			{a_class_}
			tab={ACCOUNT_INFORMATION_TAB}
			name="Account Information"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.ACCOUNT_INFORMATION : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[CHARTS_TAB]}
    <RoRestaurantNavLi
			class={li_class_(CHARTS_TAB)}
			{a_class_}
			tab={CHARTS_TAB}
			name="MenuSense &trade;"
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.MENU_SENSE : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[PREVIEW_TAB]}
    <RoRestaurantNavLi
			class={li_class_(PREVIEW_TAB)}
			{a_class_}
			tab={PREVIEW_TAB}
			name="Preview"
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.PREVIEW : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[MENUS_TAB]}
    <RoRestaurantNavLi
			class={li_class_(MENUS_TAB)}
			{a_class_}
			tab={MENUS_TAB}
			name="Menus"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.MENUS : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[ORDERS_TAB]}
    <RoRestaurantNavLi
			class={li_class_(ORDERS_TAB)}
			{a_class_}
			tab={ORDERS_TAB}
			name="Orders"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.ORDERS : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[COUPONS_TAB]}
    <RoRestaurantNavLi
			class={li_class_(COUPONS_TAB)}
			{a_class_}
			tab={COUPONS_TAB}
			name="Coupons"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.COUPONS : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[FIN_REPORT_TAB]}
    <RoRestaurantNavLi
			class={li_class_(FIN_REPORT_TAB)}
			{a_class_}
			tab={FIN_REPORT_TAB}
			name="Financial Reports"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.FINANCIAL_REPORTS : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[FIN_STATEMENT_TAB]}
    <RoRestaurantNavLi
			class={li_class_(FIN_STATEMENT_TAB)}
			{a_class_}
			tab={FIN_STATEMENT_TAB}
			name="Financial Statements"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.FINANCIAL_REPORTS : undefined}"
		></RoRestaurantNavLi>
  {/if}
	{#if $ro_auth_rules$[CUSTOMER_REVIEW_TAB]}
    <RoRestaurantNavLi
			class={li_class_(CUSTOMER_REVIEW_TAB)}
			{a_class_}
			tab={CUSTOMER_REVIEW_TAB}
			name="Customer Reviews"
			requires_EnableOnlineOrdering={true}
			tutorial_chapter="{show_tutorial_icon ? TutorialChapterId.FINANCIAL_REPORTS : undefined}"
		></RoRestaurantNavLi>
  {/if}
</ul>
