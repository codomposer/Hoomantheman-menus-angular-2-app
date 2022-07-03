<script lang="ts">
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { ManagePayments } from '../ManagePayments/index.js'
import { TutorialChapterId } from '@menus/ro-support-ui';
const TAB_PAYMENTS = 'TAB_PAYMENTS'
const TAB_TRANSACTIONS = 'TAB_TRANSACTIONS'
let activeTab = TAB_PAYMENTS
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="Billing page">
	<div class="page-title-section">
		<div class="page-title-text cursor-default">
			Billing

			<a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.BILLING}" target="_blank"><i class="fa fa-youtube-play"></i></a>
		</div>
	</div>

  <!-- Nav tabs -->
  <ul class="nav nav-pills scrollable">
    <li class:active={activeTab === TAB_PAYMENTS}
		><a href="." on:click|preventDefault={evt => activeTab = TAB_PAYMENTS}>Payments</a></li>
    <li href="." class:active|preventDefault={activeTab === TAB_TRANSACTIONS}
		><a href="." on:click|preventDefault={evt => activeTab = TAB_TRANSACTIONS}>Transactions</a>
    </li>
  </ul>
  <div class="tab-content">
    {#if activeTab === TAB_PAYMENTS}
			<div class="tab-pane payments-tab-pane">
				<ManagePayments></ManagePayments>
			</div>
		{:else if activeTab === TAB_TRANSACTIONS}
			<div class="tab-pane transactions-tab-pane" class:active={activeTab === TAB_TRANSACTIONS}>
				No Transactions Found...
			</div>
    {/if}
  </div>
</div>

<style type=text/scss>
.Billing {
	.nav-pills {
		border-bottom: 1px solid #DBDBDB;
	}
}
</style>
