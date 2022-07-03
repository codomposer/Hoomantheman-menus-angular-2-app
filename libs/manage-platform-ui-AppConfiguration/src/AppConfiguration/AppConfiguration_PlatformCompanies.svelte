<script lang="ts">
import type { AppConfiguration_c } from './AppConfiguration_c.js'
export let _:AppConfiguration_c
const { selected_platform_company$, platform_companies$ } = _
</script>

{#if $platform_companies$?.length > 1}
<div class="section-heading">Platform Companies</div>
<div class="form-group">
  <label for="selected_platform_company">Choose a company</label>
  <select class="form-control" name="selected_platform_company" id="selected_platform_company"
					bind:value={$selected_platform_company$}
	>
    {#each $platform_companies$ || [] as company}
      <option value={company}>
        { company.Name ? company.Name : '' }
				{ company.App_Name ? ` - ${company.App_Name}` : '' }
				{ company.App_ID ? ` - ${company.App_ID}` : '' }
      </option>
    {/each}
  </select>
</div>
{/if}
