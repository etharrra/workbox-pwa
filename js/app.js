if (location.protocol !== "https:") {
    location.replace(
        `https:${location.href.substring(location.protocol.length)}`
    );
}

if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((sw) => console.log("registered"))
            .catch((error) => console.log(error));
    });
}

const successCallback = (position) => {
    var json = {};
    lat = position.coords.latitude;
    longi = position.coords.longitude;
    console.log(lat, longi);

    // get json data
    fetch("./data/jpLocation.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            json = data;
            // console.log(json);
            for (var i = 0; i < json.length; i++) {
                let jlet1 = json[i].latitude + 0.01;
                let jlet2 = json[i].latitude - 0.01;
                let jlong1 = json[i].longitude + 0.01;
                let jlong2 = json[i].longitude - 0.01;
                // console.log(jlet1,jlet2, jlong1, jlong2);

                const val1 = (lat) => {
                    if (jlet2 <= lat && lat <= jlet1) {
                        //   console.log("true");
                        return true;
                    } else {
                        //   console.log(lat);
                        return false;
                    }
                };
                const val2 = (longi) => {
                    if (jlong2 <= longi && longi <= jlong1) {
                        console.log("true");
                        return true;
                    } else {
                        console.log(long);
                        return false;
                    }
                };
                if (val1(lat) && val2(longi)) {
                    var noti = sessionStorage.getItem("welcome");
                    if (navigator.onLine == false && noti == null) {
                        alert(`Your are at ${json[i].name}`);
                        console.log(noti);
                        if (noti == null) {
                            sessionStorage.setItem("welcome", 1);
                        }
                        navigator.geolocation.clearWatch(watchId);
                        break;
                    } else {
                        console.log("false");
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
const errorCallback = (error) => {
    console.log(error);
};
const watchId = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback
);
