export function is_new_o_(object:{ id?:number, ID?:number, is_new?:boolean }):boolean {
	return !!(!object || (!(object.ID > 0) && !(object.id > 0)) || object.is_new)
}
