<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { Enable_Points$_b } from '@menus/platform-settings'
import { user_full_name_ } from '@menus/user-common'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
import { ProfileMenu_c } from './ProfileMenu_c.js'
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx, dispatch = createEventDispatcher()
const Enable_Points$ = Enable_Points$_b(ctx)
export const _ = new ProfileMenu_c(ctx, dispatch)
const { consumer_login_user$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $consumer_login_user$}
  <div class="ProfileMenu dropdown profile-dropdown {$$props.class||''}">
    <a class="list-item full-name"
			 href="/settings"
			 on:click={evt => _.toggle_ProfileHandle(true)}
		>{ user_full_name_($consumer_login_user$) }</a>
		{#if $Enable_Points$}
      <a class="list-item my-points"
				 href="/my-points"
				 on:click|preventDefault={evt => _.navigate('/my-points')}
			><span class="icon fa fa-gift"></span>You have {$consumer_login_user$.Points} pts.</a>
    {/if}
		<a class="list-item past-orders"
			 href="/past-orders"
			 on:click|preventDefault={evt => _.navigate('/past-orders')}
		>My Orders</a>
    <a class="list-item settings"
			 href="/settings"
			 on:click|preventDefault={evt => _.navigate('/settings')}
		>Settings</a>
    <a class="list-item logout"
			 href="/logout"
			 on:click|preventDefault={evt => _.logout()}
		>Log Out</a>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.ProfileMenu {
	position: fixed;
	top: 64px;
	left: auto;
	right: 20px;
	display: block;
	min-width: 224px;
	background: white;
	@media (max-width: $grid-float-breakpoint-max) {
		position: static;
		padding-top: 0;
	}
	> .list-item {
		position: relative;
		display: block;
		text-align: left;
		padding: 18px 0 18px 48px;
		&:hover {
			background-color: $brand-success;
			color: white;
			text-decoration: none;
		}
		&::before {
			display: block;
			position: absolute;
			top: 0;
			left: 12px;
			height: 100%;
			width: 24px;
			background-repeat: no-repeat;
			background-position: 50%;
			background-size: contain;
			z-index: 1;
			content: " ";
		}
		&.full-name {
			@media (min-width: $screen-md-min) {
				display: none;
			}
			&::before {
				color: #455A64;
				background-image: vurl('/assets/img/cr/profile.svg');
				width: 18px;
    			left: 15px;
			}
		}
		&.my-points {
			padding-left: 15px;

			.icon {
				font-size: 22px;
    			margin-right: 11px;
			}
		}
		&.past-orders {
			&::before {
				width: 18px;
    			left: 16px;
				background-image: vurl('/assets/img/cr/order-history.svg');
			}
		}
		&.settings {
			&::before {
				background-image: vurl('/assets/img/cr/settings.svg');
			}
		}
		&.logout {
			&::before {
				left: 11px;
				background-image: vurl('/assets/img/cr/cancel-address.svg');
			}
		}
		.icon {
			text-align: left;
		}
	}
}
</style>
