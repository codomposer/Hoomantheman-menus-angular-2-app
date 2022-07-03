export function flat</*@formatter:on*/
	Value extends unknown = undefined,
	Out extends unknown[] = unknown[],
	>/*@formatter:off*/(arr:Value):Out {
  return [arr].flat() as Out
}
