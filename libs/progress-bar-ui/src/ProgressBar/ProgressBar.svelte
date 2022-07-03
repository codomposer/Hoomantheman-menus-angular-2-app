<script lang="ts">
import { style_ } from '@ctx-core/html'
export let index = 0, labels:string[] = []
let segment_width_percent = 0
$: segment_width_percent =
	labels.length
	? (100.0 / labels.length)
	: 0
let point_width_percent = 0
$: point_width_percent =
	labels.length
	? (100.0 / (labels.length - 1))
	: 0
</script>

<div class="ProgressBar">
  <div class="progress-text-section">
    {#each labels as label,label_index}
      <div class="progress-text text-center"
					 class:text-right={label_index === (labels.length - 1)}
					 class:text-left={label_index === 0}
					 style={style_({
             left: label_index === (labels.length - 1)
               ? 'auto' : `${label_index * point_width_percent}%`,
             right: label_index === (labels.length - 1)
               ? '0' : `auto`
           })}
			><div>{ label }</div></div>
    {/each}
  </div>
  <div class="progress-bar-section">
    <div class="progress-bar-bg"></div>
    <div class="progress-bar-bg-active"
				 style={style_({ width: `${index * point_width_percent}%`})}
		></div>
    <div class="row">
      {#each labels as label,label_index}
        <div class="progress-knob knob-center"
						 class:knob-right={label_index === (labels.length - 1)}
						 class:knob-left={label_index === 0}
						 class:active={index >= label_index}
						 style={style_({
               left: label_index === (labels.length - 1)
                 ? 'auto' : `${label_index * point_width_percent}%`,
               right: label_index === (labels.length - 1)
                 ? '0' : `auto`
             })}
				></div>
      {/each}
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.ProgressBar {
	.progress-text-section {
		position: relative;
		display: flex;
		flex-direction: row;
		height: 20px;
		width: 100%;
		.progress-text {
			position: absolute;
			font-weight: $lato-black;
			color: #33CF79;
			text-transform: uppercase;
			text-align: left;
			&.text-right {
				div {
					margin-left: 50%;
				}
			}
			div {
				margin-left: -50%;
			}
		}
	}
	.progress-bar-section {
		position: relative;
		margin-top: 6px;
		margin-bottom: 48px;
		height: 20px;
		width: 100%;
		.progress-knob {
			position: absolute;
			display: inline-block;
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background-color: #EAEBEB;
			margin-top: 3px;
			margin-left: -2px;
			&.active {
				background-color: $brand-success;
			}
			&.knob-center {
				text-align: center;
			}
			&.knob-right {
				text-align: right;
			}
			&.knob-left {
				text-align: left;
			}
		}
		.progress-bar-bg {
			background-color: #EAEBEB;
			position: absolute;
			top: 6px;
			width: 100%;
			height: 6px;
		}
		.progress-bar-bg-active {
			background-color: $brand-success;
			position: absolute;
			top: 6px;
			width: 0;
			height: 6px;
		}
	}
}
</style>
