<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { CheckBox } from '@menus/form-ui'
import { Pagination } from '@menus/pagination-ui'
import { PageLoader } from '@menus/shared-ui'
import { TutorialChapterId } from '@menus/ro-support-ui';
import { getContext_ui_ctx } from '@menus/ui'
import { RO_USER_LEVEL_LIST, RO_USER_LEVEL_TITLES } from '@menus/web-config'
import { Edit_Ro_User_Modal } from '../Edit_Ro_User_Modal'
import type { ro_user_ui_Ctx } from '../ro_user_ui_Ctx.js'
import { Ro_Users_c, PAGINATION_ID } from './Ro_Users_c.js'
const ctx = getContext_ui_ctx() as ro_user_ui_Ctx
export const _ = new Ro_Users_c(ctx)
const {
	busy$, Edit_Ro_User_Modal_instance$, page$, pageSize$, resend_code_status_r$, ro_login_user$, ro_users$, keywords$,
	TotalPages$, TotalRow$, userLevel$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="Ro_Users page">
  <div class="page-title-section">
    <div class="page-title-text cursor-default">
      Users

	  <a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.USERS}" target="_blank"><i class="fa fa-youtube-play"></i></a>
    </div>
  </div>

  <div class="main-contents">
    <Edit_Ro_User_Modal bind:this={$Edit_Ro_User_Modal_instance$}
												on:create={evt => _.oncreate(evt)}
												on:update={evt => _.onupdate(evt)}
		></Edit_Ro_User_Modal>
    <div class="users-search-section">
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group filter-user-level">
            <select class="form-control input-sm text-line" bind:value={$userLevel$}>
              <option value={-1}>All</option>
							{#each RO_USER_LEVEL_LIST as item}
                <option value={item.id}>{ item.value }</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <input type="text" class="form-control input-sm text-line" name="search_text"
									 bind:value={$keywords$}
									 on:keyup={evt => evt.key === 'Enter' && _.search_text_Enter()}
									 placeholder="Search for Users"
						>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="text-right">
            <button class="btn btn-lg btn-success"
										on:click={evt => _.open_Edit_Ro_User_Modal_instance()}
						>Add User</button>
          </div>
        </div>
      </div>
			{#if $busy$}
        <PageLoader></PageLoader>
      {/if}
			<div class="users-list">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="id hidden-xs">ID</th>
              <th class="login">Login</th>
              <th class="name hidden-xs">Name</th>
              <th class="user-level hidden-xs">User Level</th>
              <th class="is_active">Active</th>
              <th class="edit"></th>
              <th class="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {#if !$busy$ && !$ro_users$?.length}
              <tr class="text-center">
                <td colspan="7">No Records to display</td>
              </tr>
            {/if}
						{#each $ro_users$ || [] as ro_user,index}
              <tr
								class:email-no-verified={!ro_user.EmailVerified}
								on:click={evt => _.select_ro_user(ro_user)}
							>
                <td class="id hidden-xs has-ribbon">
                  {#if !ro_user.EmailVerified}
                    <div class="ribbon ribbon-danger align-left"><span>Not Verified</span></div>
                  {/if}
									<div>{ ro_user.id }</div>
                </td>
                <td class="login">{ ro_user.Login }</td>
                <td class="name hidden-xs f-black">{ ro_user.FirstName } { ro_user.LastName }</td>
                <td class="user-level hidden-xs">
                  { RO_USER_LEVEL_TITLES[ro_user.UserLevel] }
                </td>
                <td class="is_active" on:click|stopPropagation>
                  {#if ro_user.EmailVerified}
                    <CheckBox toggle={true}
															disabled={ro_user.id === $ro_login_user$?.id || !ro_user.EmailVerified}
															bind:value={ro_user.Enabled}
															on:change={evt => _.save_ro_user(ro_user)}
										></CheckBox>
                  {:else if !$resend_code_status_r$[ro_user.id]}
                    <button class="btn btn-success btn-inverse btn-xs" type="button"
														on:click={evt=>_.resend_code(ro_user)}
										>Resend Code</button>
                  {:else if $resend_code_status_r$[ro_user.id] === 'sending'}
                    <div class="success">Resending Code</div>
                  {:else if $resend_code_status_r$[ro_user.id] === 'error'}
                    <div class="error">Error Resending Code</div>
                  {:else}
                    <div class="success">Code Sent</div>
                  {/if}
                </td>
                <td class="edit">
                  {#if ro_user.EmailVerified}
                    <div class="pencil-icon"
												 on:change={evt => _.open_Edit_Ro_User_Modal_instance(ro_user)}
										></div>
                  {/if}
                </td>
                <td class="delete">
                  {#if ro_user.id !== $ro_login_user$?.id}
                    <div class="delete-time-icon"
												 on:click|stopPropagation={evt => _.delete_ro_user(index, ro_user)}
										></div>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7">
                {#if $ro_users$.length}
                  <Pagination id={PAGINATION_ID}
															bind:page={$page$}
															bind:pageSize={$pageSize$}
															TotalPages={$TotalPages$}
															TotalRow={$TotalRow$}
									></Pagination>
                {/if}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.Ro_Users {
	overflow: hidden;
	height: calc(100vh - #{$navbar-height});
	.main-contents {
		.users-search-section {
			.filter-user-level {
				@media (min-width: $screen-sm-min) {
					.text-line {
						display: inline-block;
						width: auto;
					}
					.form-control {
						margin-left: 16px;
					}
					label {
						display: inline-block;
					}
				}
				label {
					display: none;
				}
			}
		}
		.users-list {
			height: calc(100vh - 124px);
			overflow: hidden;
			overflow-y: auto;
			position: relative;
			table {
				margin-bottom: 0;
				thead {
					th {
						position: sticky;
						top: 0;
						z-index: 10;
						background: white;
					}
				}
				tbody {
					.email-no-verified {
						td {
							position: relative;
							height: 75px;
							&.has-ribbon {
								padding-left: 50px;
							}
							.success {
								color: $brand-success;
							}
							.error {
								color: $brand-danger;
							}
						}
					}
				}
			}
		}
	}
}
</style>
