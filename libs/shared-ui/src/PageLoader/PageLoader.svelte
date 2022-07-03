<script lang="ts">
export let center:'page'|'parent' = 'page', message = ''
</script>

<div class="PageLoader page-loader-container {$$props.class||''}"
		 class:page={center === 'page'}
		 class:parent={center === 'parent'}
>
  {#if center}
    <div
			class="page-loader-overlay"
			class:page={center === 'page'}
			class:parent={center === 'parent'}
		></div>
  {/if}
	<div
		class="page-loader"
		class:page-center={center === 'page'}
		class:parent-center={center === 'parent'}
	>
    <svg class="page-loader-circular" viewBox="25 25 50 50">
      <circle
				class="page-loader-path"
				cx="50"
				cy="50"
				r="20"
				fill="none"
				stroke-width="2"
				stroke-miterlimit="10"
			/>
    </svg>
		{message}
  </div>
</div>

<style type="text/scss">
@import "@menus/css/lib";
$green: $brand-success; //#008744
$blue: $gray; //#0057e7;
$red: $brand-danger; //#d62d20;
$yellow: $brand-warning; //#ffa700;
$white: #eee;
// scaling... any units
$width: 100px;
:global(.PageLoader) {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 5%;
	overflow: hidden;
	z-index: 100;
	&.page {
		position: fixed;
		width: 100vw;
		height: 100vh;
	}
	&.parent {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	:global(.page-loader-overlay) {
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .1);
		cursor: wait;
		z-index: 100;
		&.page {
			position: fixed;
		}
		&.parent {
			position: absolute;
		}
	}
	:global(.page-loader) {
		position: relative;
		margin: 0 auto;
		width: $width;
		&:before {
			content: '';
			display: block;
			padding-top: 100%;
		}
		&.page-center, &.parent-center {
			top: 0;
			z-index: 101;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
			height: 100%;
		}
		&.page-center {
			position: fixed;
		}
		&.parent-center {
			position: absolute;
		}
	}
	:global(.page-loader-circular) {
		animation: #{"rotate"} 2s linear infinite;
		height: 100%;
		transform-origin: center center;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	:global(.page-loader-path) {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		animation: #{"dash"} 1.5s ease-in-out infinite, #{"color"} 6s ease-in-out infinite;
		stroke-linecap: round;
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35px;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124px;
		}
	}
	@keyframes color {
		100%,
		0% {
			stroke: $red;
		}
		40% {
			stroke: $blue;
		}
		66% {
			stroke: $green;
		}
		80%, 90% {
			stroke: $yellow;
		}
	}
}
</style>
