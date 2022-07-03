export class APIRequestQuery {
	public pcpk?:string
	protected static fill = (requestData:APIRequestQuery, objectData:any, mapObject)=>{
		for (const mapKey in mapObject) {
			if (!mapObject.hasOwnProperty(mapKey)) continue
			const mapValue = mapObject[mapKey]
			if (objectData[mapValue]) {
				requestData[mapKey] = objectData[mapValue]
			}
		}
	}
}
