import React, { PropTypes, Component } from 'react';
import GoogleMap from './GoogleMap';

class BottomWrapper extends Component {
    render() {
        const { weatherOverall, geolocation, getLocation } = this.props;
        const markers = [];
        let mapCenter = weatherOverall.location;

        if (!geolocation.message) {
            markers.push({
                title: 'You',
                location: geolocation,
            });
            mapCenter = mapCenter || geolocation;
        }

        if (weatherOverall.city) {
            markers.push({
                title: weatherOverall.city,
                location: weatherOverall.location,
            });
        }

        return (
            <GoogleMap className="map panel" location={mapCenter} markers={markers} getLocation={getLocation} />
        );
    }
}

BottomWrapper.propTypes = {
    weatherOverall: PropTypes.object.isRequired,
    geolocation: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
};

export default BottomWrapper;
