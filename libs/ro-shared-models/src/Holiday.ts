export interface Holiday {
	ID?:number
	Name:string
	Date_Start?:string
	Date_End?:string
	Enabled:boolean
	// ui
	edit_mode?:boolean
	start_date_error?:string
	end_date_error?:string
}
