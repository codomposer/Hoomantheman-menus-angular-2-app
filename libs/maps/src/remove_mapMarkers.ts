export function remove_mapMarkers(oldMapMarkers:google.maps.Marker[]):void {
	setTimeout(()=>{
		for (const mapMarker of oldMapMarkers) {
			mapMarker.setMap(null)
		}
	}, 250)
}
