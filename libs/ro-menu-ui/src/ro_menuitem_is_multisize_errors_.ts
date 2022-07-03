import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
export function ro_menuitem_is_multisize_errors_(
	Menuitem_Is_multisize:boolean, ro_menuoptionsizes:RoMenuoptionsize_I[]
):string[] {
	return (
		(
			Menuitem_Is_multisize && (
				!ro_menuoptionsizes?.length
				|| !ro_menuoptionsizes.some(Menuoptionsize_I=>Menuoptionsize_I.Enabled)
			)
		)
		? ['At least one Size which is Enabled is required']
		: []
	)
}
