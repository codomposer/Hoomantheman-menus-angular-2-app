<script lang="ts">
import { RoMainDashboard } from '@menus/ro-layout-ui'
import { MenuitemDetails, SizeTab, SizeTabSearch } from '@menus/ro-menu-ui'
</script>

<RoMainDashboard>
	<MenuitemDetails>
		<svelte:fragment slot="search-box">
			<SizeTabSearch></SizeTabSearch>
		</svelte:fragment>
		<SizeTab></SizeTab>
	</MenuitemDetails>
</RoMainDashboard>
