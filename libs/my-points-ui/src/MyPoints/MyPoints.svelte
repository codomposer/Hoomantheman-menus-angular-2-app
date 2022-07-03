<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { page_query$_b } from '@ctx-core/sapper'
import { navigating_goto_b } from '@menus/page'
import type { my_points_ui_Ctx } from '../my_points_ui_Ctx.js'
const ctx = getContext_ui_ctx() as my_points_ui_Ctx
const consumer_login_user$ = consumer_login_user$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
const page_query$ = page_query$_b(ctx)

const onclick_goback = async ()=>{
	const page_query = page_query$.$
	const returnUrl = page_query.returnUrl || '/'
	await navigating_goto(returnUrl)
}

</script>

<CrMainDashboard>
<div class="MyPoints my-points">

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={onclick_goback} href="/">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>My Points</span>
			</li>
		</ul>
	</div>

  <div class="your-points-section">
    <div>You have</div>
		{#if $consumer_login_user$}
      <div class="total-points">{ $consumer_login_user$?.Points } pts.</div>
    {/if}
		<div class="total-amount">It means you have $1.32</div>
  </div>
  <div class="main-contents">
    <div class="main-heading">
      <div>Take photos. Earn points.</div>
      <div>Get free food</div>
    </div>
    <div class="point-contents clearfix">
      <img src="/assets/img/cr/pts-dish.jpg"
					 alt="You have { $consumer_login_user$?.Points } pts."
			/>
    </div>
  </div>
</div>
</CrMainDashboard>

<style type=text/scss>
@import "@menus/consumer-shared-css/variables";
.MyPoints {
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
	.your-points-section {
		margin-top: 16px;
		text-align: center;
		padding: 57px 0 53px;
		color: white;
		background-color: $brand-success;
		.total-points {
			font-weight: $lato-black;
			font-size: 40px;
			margin-top: 1px;
		}
		.total-amount {
			opacity: 0.6;
			color: $gray;
			margin-top: 21px;
		}
	}
	.main-contents {
		.main-heading {
			margin-top: 80px;
			margin-bottom: 80px;
			font-weight: $lato-black;
			font-size: 32px;
			text-align: center;
		}
		.point-contents {
			text-align: center;
		}
	}
}
</style>
