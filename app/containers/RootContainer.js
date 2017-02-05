import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import StaticFixator from './StaticFixator';
import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import AsideBar from '../components/AsideBar';
import GoogleMap from './GoogleMap';
import * as actions from '../dataflow/actions/actions';

class RootContainer extends Component {
    constructor(props) {
        super(props);
        const { getLocation } = props;
        getLocation();
    }

    getChildContext() {
        return {
            weather: this.props.weather,
            forecast: this.props.forecast,
        };
    }

    componentWillReceiveProps({
        geolocation,
        nearestCities,
        getNearestTo,
        redirectToCity,
    }) {
        if (geolocation !== this.props.geolocation) {
            getNearestTo(geolocation);
        }
        if (nearestCities !== this.props.nearestCities
            && nearestCities.length > 0) {
            const { name, countryCode } = nearestCities[0];
            redirectToCity(name, countryCode);
        }
    }

    render() {
        const { children, geolocation, weather, nearestCities } = this.props;
        const markers = [];
        if (geolocation) {
            markers.push({
                title: 'You',
                location: geolocation,
            });
        }

        if (weather.city) {
            markers.push({
                title: weather.city,
                location: weather.location,
            });
        }

        return (
            <div className={`app-wrapper fixed-background background-${weather.weatherTypes ? weather.weatherTypes[0].main : 'default'}`}>
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
                            <GoogleMap className="map panel" location={weather.location} markers={markers} />
                        </div>
                    </div>
                </div>
                <Footer className="footer" />
            </div>
        );
    }
}

RootContainer.childContextTypes = {
    weather: PropTypes.object,
    forecast: PropTypes.array,
};

RootContainer.propTypes = {
    children: PropTypes.node,
    weather: PropTypes.object.isRequired,
    forecast: PropTypes.array,
    geolocation: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    getNearestTo: PropTypes.func.isRequired,
    nearestCities: PropTypes.array.isRequired,
    redirectToCity: PropTypes.func.isRequired,
};

RootContainer.defaultProps = {
    children: null,
    forecast: [],
    geolocation: null,
};


function mapStateToProps(state) {
    return {
        geolocation: state.weatherApp.geolocation,
        city: state.weatherApp.city,
        weather: state.weatherApp.weather,
        forecast: state.weatherApp.forecast,
        nearestCities: state.weatherApp.nearestCities,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
