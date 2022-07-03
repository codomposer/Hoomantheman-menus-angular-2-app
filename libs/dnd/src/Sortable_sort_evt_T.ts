export type Sortable_sort_evt_T<T = any[]> = CustomEvent<Sortable_sort_evt_data_T<T>>
export interface Sortable_sort_evt_data_T<T = any[]> {
	out_list:T,
	list:T,
	sort_idx_a:number[],
}
