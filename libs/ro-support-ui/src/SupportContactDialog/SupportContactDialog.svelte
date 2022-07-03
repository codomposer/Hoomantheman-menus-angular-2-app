<script lang="ts">
import type { CustomerService } from '@menus/ro-user'
import { globalSettings$_b } from '@menus/ro-user'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_support_ui_Ctx } from '../ro_support_ui_Ctx.js'
export let no_phone = false, no_email = false, text_a = ['Business Customer service']
const ctx = getContext_ui_ctx() as ro_support_ui_Ctx
const globalSettings$ = globalSettings$_b(ctx)
let CustomerService:CustomerService, Phone:string, Email:string
$: CustomerService = $globalSettings$?.CustomerService
$: Email = CustomerService?.Email
$: Phone = CustomerService?.Phone
</script>

<div class="SupportContactDialog customer-service-section">
	{#each text_a as text}
		<div>{text}</div>
	{/each}
	{#if !no_phone && Phone}
		<div class="phone-number contact">
			<div class="phone-icon icon"></div>
			<a href={`tel:${Phone}`}>{Phone}</a>
		</div>
	{/if}
	{#if !no_email && Email}
		<div class="email contact">
			<div class="fa fa-envelope icon"></div>
			<a href={`mailto:${Email}`}>{Email}</a>
		</div>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.SupportContactDialog {
	padding: 24px 0;
	max-width: 300px;
	min-width: 300px;
	border-radius: 4px;
	text-align: center;
	background-color: $gray;
	color: white;
	@media (max-width: $screen-sm-max) {
		margin-top: 40px;
		margin-left: auto;
		margin-right: auto;
	}
	@media (max-width: $screen-xs-max) {
		max-width: 100vw;
		min-width: 100vw;
	}
	.contact {
		margin-top: 4px;
		font-weight: $lato-black;
		font-size: 18px;
		.icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 24px;
			height: 24px;
			margin-right: 11px;
			vertical-align: middle;
		}
		a {
			color: white;
		}
	}
}
</style>
