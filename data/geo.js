function geo() {
	navigator.geolocation.watchPostion(position => {
		console.log(position.coords.latitude, position.coords.longitude)
	})
}

geo();