import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import StaticFixator from './StaticFixator';
import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import AsideBar from '../components/AsideBar';
import GoogleMap from './GoogleMap';
import * as actions from '../actions/actions';

class RootContainer extends Component {
    getChildContext() {
        return {
            changeWeatherInfo: this.props.changeWeatherInfo,
            weather: this.props.weather,
            forecast: this.props.forecast,
        };
    }

    render() {
        const { children, geolocation, weather } = this.props;
        const markers = [];
        if (weather.city) {
            markers.push({
                title: weather.city,
                location: weather.location,
            });
        }
        return (
            <div className="app-wrapper">
                <div className="sticky-top">
                    <StaticFixator placeholderClass="header__placeholder animate-height">
                        <Header className="header no-padding-top-and-bottom-rsm" />
                    </StaticFixator>
                    <div className="container">
                        <div className="row">
                            <MainContainer className="main col-sm-9 col-xs-12">
                                {children}
                                <GoogleMap className="map" location={geolocation} markers={markers} />
                            </MainContainer>
                            <AsideBar className="aside col-sm-3 col-xs-12" />
                        </div>
                    </div>
                </div>
                <Footer className="footer" />
            </div>
        );
    }
}

RootContainer.childContextTypes = {
    changeWeatherInfo: PropTypes.func,
    weather: PropTypes.object,
    forecast: PropTypes.array,
};

RootContainer.propTypes = {
    children: PropTypes.node,
    weather: PropTypes.object.isRequired,
    forecast: PropTypes.array,
    changeWeatherInfo: PropTypes.func.isRequired,
    geolocation: PropTypes.object.isRequired,
};

RootContainer.defaultProps = {
    children: null,
    forecast: [],
};


function mapStateToProps(state) {
    return {
        geolocation: state.weatherApp.geolocation,
        city: state.weatherApp.city,
        weather: state.weatherApp.weather,
        forecast: state.weatherApp.forecast,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
