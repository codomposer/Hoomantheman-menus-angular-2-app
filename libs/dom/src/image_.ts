export async function image_(src:string):Promise<HTMLImageElement> {
	const image = new Image()
	image.src = src
	return new Promise(res=>{
		image.onload = ()=>{
			res(image)
		}
	})
}
