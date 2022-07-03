export interface NoResultPlaceholder_config_T {
	icon?:string
	title?:string
	subtitle?:string
	buttons?:{
		type:string
		title:string
		action:(evt:MouseEvent)=>void
	}[]
}
