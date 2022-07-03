import type { RoHeading_I } from './RoHeading_I.js'
import type { RoMenuitemHeading_I } from './RoMenuitemHeading_I.js'
export class RoHeading implements RoHeading_I {
	public ID:number
	public Name:string
	public Description:string
	public Enabled:boolean
	public HeadingName:string
	public Menu:RoMenuitemHeading_I[]
	// ui
	public hidden:boolean
	public SortID?:number
}
