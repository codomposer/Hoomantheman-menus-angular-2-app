<script lang="ts">
import { RoMainDashboard } from '@menus/ro-layout-ui'
import { MenuitemDetails, OptionTab, OptionTabSearch } from '@menus/ro-menu-ui'
</script>

<RoMainDashboard>
	<MenuitemDetails>
		<svelte:fragment slot="search-box">
			<OptionTabSearch></OptionTabSearch>
		</svelte:fragment>
		<OptionTab></OptionTab>
	</MenuitemDetails>
</RoMainDashboard>
