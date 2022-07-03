<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { PlatformIcon } from '@menus/platform-ui'
import { ProgressBar } from '@menus/progress-bar-ui'
import type { consumer_auth_ui_Ctx } from '../consumer_auth_ui_Ctx.js'
import { Signup_c } from './Signup_c.js'
import Signup_step_1 from './Signup_step_1.svelte'
import Signup_step_2 from './Signup_step_2.svelte'
import Signup_step_3 from './Signup_step_3.svelte'
import Signup_step_4 from './Signup_step_4.svelte'
const ctx = getContext_ui_ctx() as consumer_auth_ui_Ctx
export const _ = new Signup_c(ctx)//region
const { busy$, step$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="page consumer-Signup">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
	{#if $busy$}
    <PageLoader center="page"></PageLoader>
  {/if}

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a on:click|preventDefault={_.onclick_goback} href="/">« Back</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Signup</span>
			</li>
		</ul>
	</div>

	<div class="register-section-wrapper">
    <div class="register-section">
      <div class="register-section-label">Sign up</div>
      <div class="register-progress-wrapper">
        <ProgressBar
					labels={['Name', 'Email', 'Password', 'Security']}
					index={$step$ - 1}
				></ProgressBar>
      </div>
      <div class="register-form">
        {#if $step$ === 1}
          <Signup_step_1 {_}></Signup_step_1>
        {:else if $step$ === 2}
          <Signup_step_2 {_}></Signup_step_2>
        {:else if $step$ === 3}
          <Signup_step_3 {_}></Signup_step_3>
        {:else if $step$ === 4}
          <Signup_step_4 {_}></Signup_step_4>
        {/if}
      </div>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.consumer-Signup {
	padding-bottom: 100px;
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
	.register-section-wrapper {
		padding: 0 24px;
		.register-section {
			margin-top: 89px;
			background-color: white;
			border-radius: 3px;
			max-width: 360px;
			margin-left: auto;
			margin-right: auto;
			@media (max-width: $screen-xs-max) {
				margin-top: 24px;
			}
			.register-section-label {
				font-weight: $lato-black;
				font-size: 24px;
				text-align: center;
			}
			.register-progress-wrapper {
				margin: 40px 0 37px;
			}
			.register-form {
				margin-top: 27px;
				.next-btn {
					margin-top: 24px;
				}
				a {
					font-weight: bold;
				}
			}
		}
	}
	.agree_prompt {
		margin-bottom: 8px;
	}
	.agree_container {
		display: flex;
		.CheckBox {
			margin-right: 8px;
		}
	}
}
</style>
