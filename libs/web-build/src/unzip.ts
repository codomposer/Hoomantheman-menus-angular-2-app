export function unzip<O extends unknown = unknown>(a2:O[][]):unzip_ret_T<O> {
	return (
		a2.reduce(
			(memo, a1)=>{
				memo[a1[0] as string] = a1[1] as O
				return memo
			}, {} as unzip_ret_T<O>)
	)
}
export type unzip_ret_T<O extends unknown = unknown> = Record<string, O>
