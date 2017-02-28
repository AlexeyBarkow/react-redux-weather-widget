import React, { PropTypes, Component } from 'react';
import GoogleMap from './GoogleMap';

class BottomWrapper extends Component {
    render() {
        const { weatherOverall, geolocation, getLocation } = this.props;
        const markers = [];
        const mapCenter = weatherOverall.location || geolocation;

        if (!geolocation.message) {
            markers.push({
                title: 'You',
                location: geolocation,
            });
        }

        if (weatherOverall.city && weatherOverall.location) {
            markers.push({
                title: weatherOverall.city,
                location: weatherOverall.location,
            });
        }

        return (
            <GoogleMap className="map panel col-xs-12" location={mapCenter} markers={markers} locationServiceMessage={geolocation.message} getLocation={getLocation} />
        );
    }
}

BottomWrapper.propTypes = {
    weatherOverall: PropTypes.object.isRequired,
    geolocation: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
};

export default BottomWrapper;
