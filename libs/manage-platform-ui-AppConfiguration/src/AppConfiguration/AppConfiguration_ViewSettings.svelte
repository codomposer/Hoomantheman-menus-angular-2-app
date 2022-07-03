<script lang="ts">
import { Row } from '@menus/bootstrap'
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const {
	device_type$, enable_beta_features$, is_vendor_admin_role$, selected_restaurant_address$, restaurant_address_a$,
} = _
export let AppConfiguration_ViewSettings_errors:string[]
$: AppConfiguration_ViewSettings_errors = []
</script>

<Row>
  <div class="section-heading">View Settings</div>
  <div class="form-group">
    <label for="device_type">Mobile Type</label>
    <select class="form-control" name="device_type" id="device_type"
						bind:value={$device_type$}
		>
      {#if $enable_beta_features$}
        <option value="macbook">Macbook</option>
      {/if}
			<option value="iphone-x">Iphone X & up</option>
      <option value="iphone8">Iphone 8</option>
      <option value="iphone5s">Iphone 5s</option>
    </select>
  </div>
	{#if $is_vendor_admin_role$}
    <div class="form-group">
      <label for="selected_restaurant_address">Addresses</label>
      <select class="form-control" name="selected_restaurant_address"
							id="selected_restaurant_address"
							bind:value={$selected_restaurant_address$}
			>
        {#each $restaurant_address_a$ as restaurant_address}
          <option value={restaurant_address}>{ restaurant_address.Address }</option>
        {/each}
      </select>
    </div>
  {/if}
</Row>
