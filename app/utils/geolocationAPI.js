function loadLocation() {
    return new Promise((success, error) => {
        if (!navigator) {
            error({
                message: 'navigator is not supported',
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((geoposition) => {
            if (geoposition) {
                success({
                    latitude: geoposition.coords.latitude,
                    longitude: geoposition.coords.longitude,
                });
            } else {
                error({
                    message: 'could not get geoposition',
                });
            }
        });
    });
}

const geolocationAPI = {
    loadLocation,
};

export default geolocationAPI;
