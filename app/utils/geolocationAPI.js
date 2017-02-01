const loadLocation = new Promise((success, error) => {
    if (!navigator) {
        error({
            message: 'navicator is not supported',
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

loadLocation.then(res => {
    console.log(res);
})

export default loadLocation;
