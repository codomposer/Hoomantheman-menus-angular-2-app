<script lang="ts">
import { CheckBox } from '@menus/form-ui'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
import { OrderSettings_label } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { ro_restaurant$ } = _
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_OrderSettings" class="RestInfoTab_OrderSettings">
  <div class="section-heading">{OrderSettings_label}</div>
  <div class="border">
  	<div class="section-subheading auto-accept">Auto Accept</div>
    <div class="row">
      <div class="col-lg-8 input-container">
        <CheckBox
					text="Auto Accept New Order" text_bold={true} toggle={true}
					bind:value={$ro_restaurant$.AutoAcceptNewOrder}
				></CheckBox>
      </div>
    </div>
	<div class="section-subheading">New Order Notification</div>
    <div class="row">
			<div class="col-sm-6 col-md-6 col-lg-6 input-container">
				<CheckBox
					text="Call On New Order" toggle={true}
					bind:value={$ro_restaurant$.CallOnNewOrder}></CheckBox>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-6 input-container">
				<CheckBox
					text="Email On New Order" toggle={true}
					bind:value={$ro_restaurant$.EmailOnNewOrder}></CheckBox>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-6 input-container">
				<CheckBox
					text="Fax On New Order" toggle={true}
					bind:value={$ro_restaurant$.FaxOnNewOrder}></CheckBox>
			</div>
			<div class="col-sm-6 col-md-6 col-lg-6 input-container">
				<CheckBox
					text="Sms On New Order" toggle={true}
					bind:value={$ro_restaurant$.SMSOnNewOrder}></CheckBox>
			</div>
    </div>
	</div>
  <slot></slot>
  <div class="section-subheading">Checkout Message</div>
  <div class="row">
    <div class="col-lg-8 input-container">
      <CheckBox
				text="Show Checkout Message" toggle={true}
				bind:value={$ro_restaurant$.Show_Checkout_Message}
			></CheckBox>
      <textarea
				class="form-control" name="Checkout_Message" id="rest_Segment_Message"
				placeholder="Please leave your message here"
				disabled={!$ro_restaurant$.Show_Checkout_Message}
				bind:value={$ro_restaurant$.Checkout_Message} cols="30" rows="6"
			></textarea>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
@import "@menus/css/clearfix";
.RestInfoTab_OrderSettings {
	.section-subheading {
		margin-top: 0;
		margin-bottom: 8px;

		&.auto-accept {
			margin-top: 20px;
		}
	}
}
</style>