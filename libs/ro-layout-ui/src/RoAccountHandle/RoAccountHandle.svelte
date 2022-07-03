<script lang="ts">
import { toggle_mobile_menu_b } from '@menus/layout-ui'
import { ro_login_user$_b, ro_login_user_UserLevel_title$_b } from '@menus/ro-user-common'
import { getContext_ui_ctx } from '@menus/ui'
import { ro_logout_b } from '../ro_logout_b.js'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
const ro_login_user$ = ro_login_user$_b(ctx)
const ro_login_user_UserLevel_title$ = ro_login_user_UserLevel_title$_b(ctx)
const ro_logout = ro_logout_b(ctx)
const toggle_mobile_menu = toggle_mobile_menu_b(ctx)
</script>

{#if $ro_login_user$}
  <div class="RoAccountHandle">
    <a class="user-email-link" href="/backoffice/manage-restaurant">
      <div>
        { $ro_login_user$.Email || `${$ro_login_user$.FirstName || ''} ${$ro_login_user$.LastName || ''}` }
      </div>
      <div>{$ro_login_user_UserLevel_title$ || ''}</div>
    </a>
    <button class="btn btn-success btn-xs logout-btn hidden-xs" on:click={ro_logout}>Logout</button>
  </div>
{:else if $ro_login_user$ != null}
  <div class="RoAccountHandle">
    <a href="/backoffice/login" on:click={toggle_mobile_menu}>Login</a>
  </div>
{/if}

<style type="text/scss">
@import "@menus/ro-shared-css/lib";
.RoAccountHandle {
	display: flex;
	.user-email-link {
		margin-right: 31px;
		font-weight: $lato-bold;
		text-decoration: none;
		text-align: center;
		@media (max-width: $screen-xs-max) {
			margin-right: 0;
		}
	}
}
</style>
