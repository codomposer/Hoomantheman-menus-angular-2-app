<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { quintOut } from 'svelte/easing'
import { crossfade } from 'svelte/transition'
import { idx_a_ } from '@ctx-core/array'
import { assign } from '@ctx-core/object'
let _el_a:HTMLElement[] = []
let el_a:HTMLElement[]
$: el_a = _el_a.filter(Boolean)
const dispatch = createEventDispatcher()
const [send, receive] = crossfade({
	duration: d=>Math.sqrt(d * 200),
	fallback(node) {
		const style = getComputedStyle(node)
		const transform = style.transform === 'none' ? '' : style.transform
		return {
			duration: 600,
			easing: quintOut,
			css: t=>`
transform: ${transform} scale(${t});
opacity: ${t}
          `.trim()
		}
	}
})
export let tag = 'div', key:string, list:any[], attrs = {}, onsubmit = ()=>{}
let over_el:HTMLElement, source_index:number, dragstart_clientY = 0
function ondragstart(evt:DragEvent) {
	const el = evt.target as HTMLElement
	source_index = parseInt(el.getAttribute('data-index'))
	dragstart_clientY = evt.clientY
}
function ondrag(evt:DragEvent) {
	evt.preventDefault()
	over_el = over_el_(evt)
}
function ondragend(evt:DragEvent) {
	evt.preventDefault()
	const el = evt.target as HTMLElement
	over_el = over_el_(evt) || el
	const index_str = over_el.getAttribute('data-index')
	const index = parseInt(index_str)
	const out_list = move([...list])
	const sort_idx_a = move(idx_a_(out_list.length))
	dispatch('sort', {
		out_list,
		list,
		sort_idx_a,
	})
	source_index = null
	function move<T>(a:T[]):T[] {
	  a[source_index] = [a[index], (a[index] = a[source_index])][0]
		return a
	}
}
function over_el_(evt:DragEvent) {
	const el = evt.target as HTMLElement
	let _over_el:HTMLElement, overlap = 0
	const el_top = el.offsetTop + evt.clientY - dragstart_clientY
	const el_bottom = el_top + el.offsetHeight
	for (const i_el of el_a) {
		const { offsetTop, offsetHeight } = i_el
		const i_top = offsetTop
		const i_bottom = i_top + offsetHeight
		if (el_bottom < i_top || el_top > i_bottom) {
			continue
		}
		// const top = Math[(el_top > i_top ? 'max' : 'min')](i_top, el_top)
		const top = Math.max(i_top, el_top)
		// const bottom = Math[el_top > i_top ? 'min' : 'max'](i_bottom, el_bottom)
		const bottom = Math.min(i_bottom, el_bottom)
		const out_overlap = bottom - top
		if (out_overlap > overlap) {
			overlap = out_overlap
			_over_el = i_el
		}
	}
	return _over_el
}
function key_value_(item) {
	return key == null ? item : item[key]
}
function processed_attrs_(item, index) {
	return assign({
		draggable: 'true',
		'data-index': index,
		'data-id': JSON.stringify(key_value_(item)),
	}, attrs)
}
</script>

{#if tag === 'div'}
  {#each list || [] as item, index (key_value_(item))}
    <div
			bind:this={_el_a[index]}
			{...processed_attrs_(item, index)}
			class="sortable {$$props.class||''}"
			class:over={el_a[index] === over_el}
			in:receive|local={{ key: key_value_(item) }}
			out:send|local={{ key: key_value_(item) }}
			on:dragstart={ondragstart}
			on:drag={ondrag}
			on:dragend={ondragend}
			on:click={evt => dispatch('itemclick', { evt, item, index })}
		>
      <slot {item} {index}>
        <div>{key_value_(item)}</div>
      </slot>
    </div>
  {/each}
{:else if tag === 'tr'}
  {#each list || [] as item, index (key_value_(item))}
    <tr
			bind:this={_el_a[index]}
			{...processed_attrs_(item, index)}
			class="sortable {$$props.class||''}"
			class:over={el_a[index] === over_el}
			in:receive|local={{ key: key_value_(item) }}
			out:send|local={{ key: key_value_(item) }}
			on:dragstart={ondragstart}
			on:drag={ondrag}
			on:dragend={ondragend}
			on:click={evt => dispatch('itemclick', { evt, item, index })}
		>
      <slot {item} {index}>
        <td>{key_value_(item)}</td>
      </slot>
    </tr>
  {/each}
{:else if tag === 'li'}
  {#each list || [] as item, index (key_value_(item))}
    <li
			bind:this={_el_a[index]}
			{...processed_attrs_(item, index)}
			class="sortable {$$props.class||''}"
			class:over={el_a[index] === over_el}
			in:receive|local={{ key: key_value_(item) }}
			out:send|local={{ key: key_value_(item) }}
			on:dragstart={ondragstart}
			on:drag={ondrag}
			on:dragend={ondragend}
			on:click={evt => dispatch('itemclick', { evt, item, index })}
		>
      <slot {item} {index}>
        <p>{key_value_(item)}</p>
      </slot>
    </li>
  {/each}
{:else if tag === 'form'}
  {#each list || [] as item, index (key_value_(item))}
    <form
			bind:this={_el_a[index]}
			{...processed_attrs_(item, index)}
			class="sortable {$$props.class||''}"
			class:over={el_a[index] === over_el}
			in:receive|local={{ key: key_value_(item) }}
			out:send|local={{ key: key_value_(item) }}
			on:submit={evt => onsubmit(evt)}
			on:dragstart={ondragstart}
			on:drag={ondrag}
			on:dragend={ondragend}
			on:click={evt => dispatch('itemclick', { evt, item, index })}
		>
      <slot {item} {index}>
        <p>{key_value_(item)}</p>
      </slot>
    </form>
  {/each}
{/if}

<style>
.over {
	border-color: rgba(48, 12, 200, 0.2);
}
</style>
