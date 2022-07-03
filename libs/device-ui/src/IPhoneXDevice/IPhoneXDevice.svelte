<script lang="ts">
import { EnsureDevices } from '../EnsureDevices'
</script>
<EnsureDevices></EnsureDevices>
<div class="marvel-device {$$props.class||''}">
  <div class="top-bar"></div>
  <div class="sleep"></div>
  <div class="bottom-bar"></div>
  <div class="volume"></div>
  <div class="overflow">
    <div class="shadow shadow--tr"></div>
    <div class="shadow shadow--tl"></div>
    <div class="shadow shadow--br"></div>
    <div class="shadow shadow--bl"></div>
  </div>
  <div class="inner-shadow"></div>
  <div class="screen">
    <slot></slot>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.marvel-device {
	.screen {
		img {
			max-width: 100%;
		}
	}
	&.iphone8 {
		/* for responsive device */
		@media (max-width: $screen-xs-max) {
			width: auto;
			height: auto;
			max-width: 375px;
			max-height: 667px;
			margin-left: 8px;
			margin-right: 8px;
			.sensor {
				opacity: 0;
			}
		}
		:after {
			@media (max-width: $screen-xs-max) {
				box-shadow: none;
			}
		}
		@media (max-width: $screen-xs-max) {
			padding: 4px 0 0;
			background: none;
			box-shadow: none;
			.top-bar, .sleep, .volume, .camera, .sensor, .speaker, .home, .bottom-bar {
				opacity: 0;
			}
			&:before {
				background: none;
			}
			&:after {
				box-shadow: none;
			}
		}
	}
}
</style>
