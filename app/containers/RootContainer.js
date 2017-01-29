import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import StaticFixator from './StaticFixator';
import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import AsideBar from '../components/AsideBar';
import * as actions from '../actions/actions';

class RootContainer extends Component {
    // constructor(props) {
    //     super(props);
    // }

    getChildContext() {
        return {
            changeWeatherInfo: this.props.changeWeatherInfo,
            weather: this.props.weather,
        };
    }

    render() {
        const { children } = this.props;
        return (
            <div className="app-wrapper">
                <div className="sticky-top">
                    <StaticFixator placeholderClass="header__placeholder animate-height">
                        <Header className="header" />
                    </StaticFixator>
                    <div className="container">
                        <div className="row">
                            <MainContainer className="main col-sm-9 col-xs-12">
                                {children}
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
};

RootContainer.propTypes = {
    children: PropTypes.node,
    weather: PropTypes.object.isRequired,
    changeWeatherInfo: PropTypes.func.isRequired,
};

RootContainer.defaultProps = {
    children: null,
};


function mapStateToProps(state) {
    return {
        geolocation: state.weatherApp.geolocation,
        city: state.weatherApp.city,
        weather: state.weatherApp.weather,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
