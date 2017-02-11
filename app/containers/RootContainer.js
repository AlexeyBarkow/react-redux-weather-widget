import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import StaticFixator from './StaticFixator';
import Footer from '../components/Footer';
import MainContainer from '../components/MainContainer';
import AsideBar from '../components/AsideBar';
import { IMAGES_UNUSUAL_PATH } from '../utils/constants';

class RootContainer extends Component {
    render() {
        const {
            main,
            bottom,
            weatherOverall,
            nearestCities,
        } = this.props;

        return (
            <div className="app-wrapper fixed-background" style={{ backgroundImage: `url(${IMAGES_UNUSUAL_PATH}${weatherOverall.main}.jpg)` }}>
                <div className="sticky-top">
                    <StaticFixator placeholderClass="header__placeholder">
                        <Header className="header no-padding-top-and-bottom-rsm" />
                    </StaticFixator>
                    <div className="container">
                        <div className="row">
                            <MainContainer className="main col-sm-9 col-xs-12 panel">
                                { main }
                            </MainContainer>
                            <AsideBar nearestCities={nearestCities} className="aside col-sm-3 col-xs-12 panel" />
                            { bottom }
                        </div>
                    </div>
                </div>
                <Footer className="footer" />
            </div>
        );
    }
}

RootContainer.propTypes = {
    main: PropTypes.node.isRequired,
    bottom: PropTypes.node,
    weatherOverall: PropTypes.object.isRequired,
    nearestCities: PropTypes.array.isRequired,
};

RootContainer.defaultProps = {
    bottom: null,
};

export default RootContainer;
