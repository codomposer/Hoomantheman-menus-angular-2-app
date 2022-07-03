<script lang="ts">
import { percentage_str_ } from '@ctx-core/number'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const { ro_restaurant$ } = _
</script>

{#if $ro_restaurant$}
<div id="RestInfoTab_TaxSettings" class="RestInfoTab_TaxSettings">
  <div class="section-heading">Tax Settings</div>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="tax-container">
        { percentage_str_($ro_restaurant$.Tax || 0) }
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_TaxSettings {
	.section-heading {
		margin-top: 0;
	}
	.tax-container {
		border: 1px solid rgba(69, 90, 100, .3);
		padding: 13px 12px;
		border-radius: 3px;
		line-height: 1.42857;
		background-color: #eee;
	}
}
</style>
