<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import { ladda } from '@menus/ladda'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_, email_errors_, phone_errors_ } from '@menus/validation'
import type { request_demo_ui_Ctx } from '../request_demo_ui_Ctx.js'
import { RequestDemo_c } from './RequestDemo_c.js'
const ctx = getContext_ui_ctx() as request_demo_ui_Ctx
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
export const _ = new RequestDemo_c(ctx)
const { busy$, FirstName$, LastName$, RestName$, Email$, Phone$ } = _
let FirstName_errors = [], LastName_errors = [], RestName_errors = [], Email_errors = [], Phone_errors = []
let form_errors:string[]
$: form_errors = [...FirstName_errors, ...LastName_errors, ...RestName_errors, ...Email_errors, ...Phone_errors]
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="RequestDemo">
  <div class="section-ready-to-learn">
    <div class="section-details">
      <div class="section-title">Ready to learn more?</div>
      <div class="section-subtitle">Request a free product demo today.</div>
      <form on:submit|preventDefault={evt => form_errors.length || _.submit_RequestDemo(evt)}>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group input-container"
								 class:has-error={FirstName_errors?.length}
						>
              <label for="FirstName">First Name</label>
              <input type="text" class="form-control" name="FirstName" id="FirstName"
										 required
										 bind:value={$FirstName$}
										 use:validation={$FirstName$, ['First Name', required_errors_]}
										 on:errors={evt => FirstName_errors = evt.detail}
							>
              <ValidationMessages errors={FirstName_errors}>O</ValidationMessages>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group input-container"
								 class:has-error={LastName_errors?.length}
						>
              <label for="LastName">Last Name</label>
              <input type="text" class="form-control" name="LastName" id="LastName"
										 required
										 bind:value={$LastName$}
										 use:validation={$LastName$, ['Last Name', required_errors_]}
										 on:errors={evt => LastName_errors = evt.detail}
							>
              <ValidationMessages errors={LastName_errors}></ValidationMessages>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group input-container"
								 class:has-error={RestName_errors?.length}
						>
              <label for="RestName">Business Name</label>
              <input type="text" class="form-control" name="RestName" id="RestName"
										 required
										 bind:value={$RestName$}
										 use:validation={$RestName$, ['Business Name', required_errors_]}
										 on:errors={evt => RestName_errors = evt.detail}
							>
              <ValidationMessages errors={RestName_errors}></ValidationMessages>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group input-container"
								 class:has-error={Email_errors?.length}
						>
              <label for="Email">Email</label>
              <input type="text" class="form-control" name="Email" id="Email"
										 required
										 bind:value={$Email$}
										 use:validation={$Email$, ['Email', required_errors_, email_errors_]}
										 on:errors={evt => Email_errors = evt.detail}
							>
              <ValidationMessages errors={Email_errors}></ValidationMessages>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group input-container"
								 class:has-error={Phone_errors?.length}
						>
              <label for="Phone">Phone</label>
              <input type="text" class="form-control" name="Phone" id="Phone"
										 required
										 bind:value={$Phone$}
										 use:validation={$Phone$, ['Phone', required_errors_, phone_errors_]}
										 on:errors={evt => Phone_errors = evt.detail}
							>
              <ValidationMessages errors={Phone_errors}></ValidationMessages>
            </div>
          </div>
        </div>
				{#if has_dom}
          <div class="row">
            <div class="col-sm-12">
              <button use:ladda={$busy$} type="submit"
											class="btn btn-primary btn-xlg btn-block btn-request-demo"
											class:btn-xlg={$innerWidth_gt_SCREEN_XS_MIN$}
											class:btn-sm={$innerWidth_lte_SCREEN_XS_MIN$}
							>Request a Demo</button>
            </div>
          </div>
        {/if}
      </form>
    </div>
  </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.RequestDemo {
	.section-ready-to-learn {
		background: #F7F7F7;
		padding: 79px 135px;
		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
		}
		.section-details {
			max-width: 360px;
			margin: 0 auto;
			.section-title {
				font-weight: $lato-black;
				font-size: 32px;
				color: #2A3134;
				text-align: center;
			}
			.section-subtitle {
				margin: 15px 0 40px;
				font-size: 18px;
				text-align: center;
			}
			.btn-request-demo {
				margin-top: 4px;
			}
		}
	}
}
</style>
