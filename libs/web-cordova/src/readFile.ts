export async function readFile(file_entry:FileEntry):Promise<string|ArrayBuffer> {
	return new Promise((resolve, reject)=>{
		file_entry.file((file:File)=>{
			const reader = new FileReader()
			reader.onloadend = function () {
				console.log('Successful file read: ' + this.result)
				resolve(this.result)
			}
			reader.readAsText(file)
		}, reject)
	})
}
