<script lang="ts">
import { EnsureDevices } from '../EnsureDevices/index.js'
</script>
<EnsureDevices></EnsureDevices>
<div class="marvel-device silver1 {$$props.class||''}">
  <div class="top-bar"></div>
  <div class="sleep"></div>
  <div class="volume"></div>
  <div class="camera"></div>
  <div class="sensor"></div>
  <div class="speaker"></div>
  <div class="screen">
    <slot></slot>
  </div>
  <div class="home"></div>
  <div class="bottom-bar"></div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.marvel-device {
	&.iphone8 {
		/* for responsive device */
		@media (max-width: $screen-xs-max) {
			width: auto;
			height: auto;
			max-width: 375px;
			max-height: 667px;
			margin-left: 8px;
			margin-right: 8px;
			padding: 4px 0 0;
			background: none;
			box-shadow: none;
			&:before {
				background: none;
			}
			&:after {
				box-shadow: none;
			}
			> * {
				opacity: 0;
			}
			.sensor {
				opacity: 0;
			}
		}
		:after {
			@media (max-width: $screen-xs-max) {
				box-shadow: none;
			}
		}
	}
	.screen {
		img {
			max-width: 100%;
		}
	}
}
</style>
