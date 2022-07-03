export async function resolveLocalFileSystemURL(url:string):Promise<Entry> {
	return new Promise((resolve, reject)=>{
		window.resolveLocalFileSystemURL(url, (dir)=>resolve(dir), err=>reject(err))
	})
}
