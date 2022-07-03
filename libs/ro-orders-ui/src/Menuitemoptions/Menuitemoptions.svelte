<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { getContext_ui_ctx } from '@menus/ui'
import type { RoMenuitem_I } from '@menus/ro-shared-models'
import type { shopping_cart_T } from '@menus/shopping-cart'
import { Menuitemoptions_c } from './Menuitemoptions_c.js'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import type { action$_T, menu_cartitem$_T } from './Menuitemoptions_c.js'
const ctx = getContext_ui_ctx() as ro_orders_ui_Ctx, dispatch = createEventDispatcher()
export let menu_cartitem$:menu_cartitem$_T, action$:action$_T, ro_menuitem:RoMenuitem_I, shopping_cart:shopping_cart_T
export const _ = new Menuitemoptions_c({ ctx, dispatch, menu_cartitem$, action$, })
const { ro_menuitem$ } = _
$: _.ro_menuitem$.$ = ro_menuitem
$: _.shopping_cart$.$ = shopping_cart
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="menu-item-details-section Menuitemoptions">
  <div class="menu-item-name-wrapper">
    <button type="button" class="close" on:click={evt => _.close()} aria-label="Close">
      <div class="delete-icon"></div>
    </button>
    <div class="menu-item-name">{ $ro_menuitem$.Name }</div>
  </div>
  <div class="menu-item-description">{ $ro_menuitem$.Description }</div>
  <div class="menu-item-sizes-list">
    {#if $ro_menuitem$.menuoptionsizes?.length}
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="3"
            >Choose item size <div class="chip-label chip-label-primary">Required</div></th>
          </tr>
        </thead>
        <tbody>
          {#each $ro_menuitem$.menuoptionsizes$ || [] as menuoptionsize}
            <tr on:click={evt => _.select_menuoptionsize(menuoptionsize)}>
              <td class="nostretch">
                {#if menuoptionsize.id === $ro_menuitem$.menuoptionsize?.ID}
                  <div class="radio-on-icon"></div>
                {:else}
                  <div class="radio-off-icon"></div>
                {/if}
              </td>
              <td>{ menuoptionsize.Name }</td>
              <td class="text-right">${ menuoptionsize.Price }</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  <div class="menu-item-options-list">
    {#each $ro_menuitem$.menuoptions || [] as menuoption}
      <table class="table">
        <thead>
          <tr>
            <th colspan="3">{ menuoption.OptionHeader }
              {#if menuoption.min_select}
                <div class="chip-label chip-label-primary">Required</div>
              {:else}
                <div class="chip-label chip-label-gray">Optional</div>
              {/if}
            </th>
          </tr>
        </thead>
        <tbody>
          {#each menuoption.OptionItems as menuoptionitem}
            <tr on:click={evt => _.select_menuoptionitem(menuoptionitem, menuoption)}>
              <td class="nostretch">
                {#if menuoption.Is_Single_Select}
                  {#if menuoption.selected_OptionItem?.ID === menuoptionitem.ID}
                    <div class="radio-on-icon"></div>
                  {:else}
                    <div class="radio-off-icon"></div>
                  {/if}
                {:else}
                  {#if menuoptionitem.is_selected}
                    <div class="checkbox-on-icon"></div>
                  {:else}
                    <div class="checkbox-off-icon"></div>
                  {/if}
                {/if}
              </td>
              <td>
                { menuoptionitem.Name }
              </td>
              <td class="text-right">
                {#if menuoptionitem.Price}
                  <span>${ menuoptionitem.Price }</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/each}
  </div>
  <div class="text-center">
    <div class="menu-item-qty-section noselect">
      <div class="menu-item-qty">
        <div class="qty-minus" on:click={evt => _.update_menu_cartitem_quantity(-1)}>
          <div class="close-icon"></div>
        </div>
        <div class="qty-value">{ $ro_menuitem$.quantity || 0 }</div>
        <div class="qty-plus" on:click={evt => _.update_menu_cartitem_quantity(1)}>
          <div class="open-icon"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="add-to-cart-wrapper">
    <button class="btn btn-lg btn-success btn-block"
						on:click={evt => _.add_to_cart()}
		>{ $action$ === 'add' ? 'Add' : 'Update'} to Cart ({ currency_str_($ro_menuitem$.Price, 'USD') }
			)</button>
  </div>
</div>

<style type=text/scss global>
.menu-item-option-items-modal {
	.modal-body {
		padding-top: 32px;
		.chip-label {
			margin-left: 7px;
		}
	}
}
</style>
