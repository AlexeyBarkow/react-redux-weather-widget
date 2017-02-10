import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import StaticFixator from './StaticFixator';
import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import AsideBar from '../components/AsideBar';
import GoogleMap from './GoogleMap';
import { IMAGES_UNUSUAL_PATH } from '../utils/constants';

class RootContainer extends Component {
    componentWillMount() {
        const { getLocation } = this.props;
        getLocation();
    }

    componentWillReceiveProps({ getNearestTo, geolocation }) {
        if (geolocation && geolocation !== this.props.geolocation) {
            getNearestTo(geolocation);
        }
    }

    render() {
        const { children, geolocation, weatherOverall, nearestCities, getLocation } = this.props;
        const markers = [];
        let mapCenter;

        if (geolocation) {
            markers.push({
                title: 'You',
                location: geolocation,
            });
            mapCenter = geolocation;
        }

        if (weatherOverall.city) {
            markers.push({
                title: weatherOverall.city,
                location: weatherOverall.location,
            });
        }

        return (
            <div className="app-wrapper fixed-background" style={{ backgroundImage: `url(${IMAGES_UNUSUAL_PATH}${weatherOverall.main}.jpg)` }}>
                <div className="sticky-top">
                    <StaticFixator placeholderClass="header__placeholder">
                        <Header className="header no-padding-top-and-bottom-rsm" />
                    </StaticFixator>
                    <div className="container">
                        <div className="row">
                            <MainContainer className="main col-sm-9 col-xs-12 panel">
                                {children}
                            </MainContainer>
                            <AsideBar nearestCities={nearestCities} className="aside col-sm-3 col-xs-12 panel" />
                            <GoogleMap className="map panel" location={weatherOverall.location || mapCenter} markers={markers} getLocation={getLocation} />
                        </div>
                    </div>
                </div>
                <Footer className="footer" />
            </div>
        );
    }
}

RootContainer.propTypes = {
    children: PropTypes.node,
    weatherOverall: PropTypes.object.isRequired,
    geolocation: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getNearestTo: PropTypes.func.isRequired,
    nearestCities: PropTypes.array.isRequired,
};

RootContainer.defaultProps = {
    children: null,
};

export default RootContainer;
