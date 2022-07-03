export async function readAsDataURL(file:Blob):Promise<string> {
	let resolve = null
	let reject = null
	const promise = new Promise<any>((res, rej)=>{
		resolve = res
		reject = rej
	})
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = ()=>{
		resolve(reader.result)
	}
	reader.onerror = (error)=>{
		reject(error)
	}
	return promise
}
