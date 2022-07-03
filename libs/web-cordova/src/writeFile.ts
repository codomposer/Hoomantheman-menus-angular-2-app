export async function writeFile(file_entry:FileEntry, data:Blob|string):Promise<FileWriter> {
	return new Promise((resolve, reject)=>{
		// Create a FileWriter object for our FileEntry (log.txt).
		file_entry.createWriter((file_writer:FileWriter)=>{
			file_writer.onwriteend = async ()=>{
				console.log('Successful file write...')
				resolve(file_writer)
			}
			file_writer.onerror = (e)=>{
				console.log('Failed file write: ' + e.toString())
				reject(e)
			}
			file_writer.write(data)
		})
	})
}
