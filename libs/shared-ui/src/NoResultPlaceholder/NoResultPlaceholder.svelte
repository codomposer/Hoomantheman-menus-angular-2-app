<script lang="ts">
import type { NoResultPlaceholder_config_T } from './NoResultPlaceholder_config_T.js'
export let config:NoResultPlaceholder_config_T = {}
</script>

<div class="NoResultPlaceholder no-result-placeholder-section">
  <div class="empty-result">
    <div class="empty-result-icon { config.icon }"></div>
    <div class="empty-result-title">{ config.title }</div>
    <div class="empty-result-subtitle">{ config.subtitle }</div>
		{#if config.buttons && config.buttons.length}
      <div class="no-result-action-buttons">
        {#each config.buttons as button}
          <button class="btn btn-lg btn-success empty-result-action { button.type }"
									on:click={button.action}
					>{ button.title }</button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style type="text/scss" global>
@import "@menus/css/lib";
.NoResultPlaceholder {
	.empty-result {
		text-align: center;
		padding-top: 121px;
		.empty-result-icon {
			margin: 0 auto;
			width: 112px;
			height: 112px;
		}
		.empty-result-title {
			font-weight: $lato-black;
			font-size: 18px;
			margin-top: 3px;
		}
		.empty-result-subtitle {
			font-weight: $lato-regular;
			line-height: 20px;
			margin-top: 1px;
			padding: 0 24px;
		}
		.no-result-action-buttons {
			.btn.empty-result-action {
				margin-top: 20px;
				margin-right: 20px;
				&.service-type {
					text-transform: capitalize;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
