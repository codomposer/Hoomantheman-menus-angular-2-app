<script lang="ts">
import { EnsureDevices } from '../EnsureDevices'
</script>
<EnsureDevices></EnsureDevices>
<div class="MacbookDevice">
  <div class="marvel-device macbook">
    <div class="bar top-bar"></div>
    <div class="camera"></div>
    <div class="screen">
      <slot></slot>
    </div>
    <div class="bar bottom-bar"></div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.MacbookDevice {
	display: flex;
	align-items: center;
	justify-content: center;
	@media (min-width: $screen-sm-min) {
		width: 100%;
	}
	.marvel-device {
		margin-left: 8px;
		margin-right: 8px;
		&.macbook {
			width: 40vw;
			height: 21vw;
			max-width: 960px;
			max-height: 600px;
			@media (max-width: $screen-xs-max) {
				width: auto;
				height: auto;
				padding: 0;
			}
			.bar {
				top: 94.4%;
				@media (max-width: $screen-xs-max) {
					opacity: 0;
				}
			}
			.screen {
				@media (max-width: $screen-xs-max) {
					box-shadow: none;
				}
				img {
					max-width: 100%;
				}
			}
		}
	}
}
</style>
