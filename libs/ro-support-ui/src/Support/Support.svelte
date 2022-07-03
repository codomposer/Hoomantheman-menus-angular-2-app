<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_support_ui_Ctx } from '../ro_support_ui_Ctx.js'
import { Support_c } from './Support_c.js'
import { TutorialChapterId } from '../Tutorial/TutorialChapterId.js';
const ctx = getContext_ui_ctx() as ro_support_ui_Ctx
export const _ = new Support_c(ctx)
const { globalSettings$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="Support page">
  	<div class="page-title-section">
		<div class="page-title-text cursor-default">
			Frequently asked questions

			<a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.SUPPORT}" target="_blank"><i class="fa fa-youtube-play"></i></a>
		</div>
	</div>
	{#if !$globalSettings$}
    <PageLoader></PageLoader>
  {:else}
    <div class="main-contents">
      <div class="row">
        <div class="col-md-7 col-lg-8">
          <div class="faq-section">
            {#each $globalSettings$.OwnerFAQ || [] as faq}
              <div class="faq-item" class:collapsed={!faq.isOpen}>
              <div class="faq-side" on:click={evt => _.toggleFAQ(faq)}>
                <div class="collapse-toggle"
										 class:open-icon={!faq.isOpen}
										 class:close-icon={faq.isOpen}
								></div>
              </div>
              <div class="faq-details">
                <div class="faq-question" on:click={evt => _.toggleFAQ(faq)}>
                  { faq.Question }
                </div>
                <div class="faq-answer">
                  {@html faq.Answer}
                </div>
              </div>
            </div>
            {/each}
          </div>
        </div>
        <div class="col-md-5 col-lg-4">
			<a href="/backoffice/tutorial" class="btn btn-lg btn-success btn-block watch-tutorial-button">Watch tutorial video</a>

          <div class="support-center-section">
            <div class="support-title">
              <div class="support-icon"></div>
              Support center
            </div>
            <div class="support-text">
              <div>Can't find the answer?</div>
              <div>We are here to help you.</div>
            </div>
            <div class="support-email">
              { $globalSettings$.CustomerService?.Email }
            </div>
            <div class="support-phone">
              <div class="phone-icon"></div>
							{ $globalSettings$.CustomerService?.Phone }
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style type=text/scss>
@import "@menus/css/lib";
.Support {
	// .faq-title {
	// 	font-weight: $lato-black;
	// 	font-size: 32px;
	// 	margin: 0 0 40px;
	// 	@media (max-width: $screen-xs-max) {
	// 		margin-left: 20px;
	// 		margin-right: 20px;
	// 	}
	// }
	.main-contents {
		.faq-section {
			.faq-item {
				padding: 26px 0;
				border-bottom: 1px solid #DBDBDB;
				.faq-side {
					float: left;
					width: 64px;
					text-align: center;
				}
				.faq-details {
					overflow: hidden;
					.faq-question {
						font-weight: $lato-black;
						font-size: 18px;
						cursor: pointer;
					}
					.faq-answer {
						margin-top: 22px;
					}
				}
				&.collapsed {
					.faq-details {
						.faq-answer {
							display: none;
						}
					}
				}
			}
		}

		.watch-tutorial-button {
			display: block;
			max-width: 300px;
			margin: 0 auto 16px;
		}

		.support-center-section {
			padding: 32px;
			width: 100%;
			background-color: #263238;
			border: 1px solid #979797;
			border-radius: 3px;
			max-width: 300px;
			margin-left: auto;
			margin-right: auto;
			@media (max-width: $screen-sm-max) {
				margin-top: 50px;
			}
			.support-title {
				font-weight: $lato-black;
				font-size: 18px;
				color: white;
				letter-spacing: 0;
				.support-icon {
					vertical-align: middle;
					margin-right: 16px;
				}
			}
			.support-text {
				margin-top: 14px;
				color: white;
			}
			.support-email {
				margin-top: 35px;
				color: white;
			}
			.support-phone {
				margin-top: 16px;
				color: white;
				.phone-icon {
					vertical-align: middle;
					margin-right: 19px;
				}
			}
		}
	}
}
</style>
