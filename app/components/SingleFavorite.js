import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';
import WeatherSummary from './WeatherSummary';
import TabController from '../containers/TabController';
import Tab from './Tab';
import TabHeader from './TabHeader';
import TabContainer from './TabContainer';

function SingleFavorite({ className, metric, favorite, weather, forecast, removeHandler }) {
    const remove = () => {
        removeHandler(favorite.index);
    };

    console.log(weather)
    return (
        <section className={classnames(className, 'favorite')}>
            <div className="modal-content">
                <div className="modal-header">
                    <Button className="remove-cross close" noDefaultStyles onClickHandler={remove} tooltip={{ placement: 'bottom', tooltipText: 'Remove from favorites' }}>
                        <span aria-hidden="true">×</span>
                    </Button>
                    <h4 className="modal-title">
                        {
                            weather.city || favorite.cityname
                        }, {
                            weather.country || favorite.countryCode
                        }
                    </h4>
                </div>
                <div className="modal-body">
                    <TabController defaultSelectedTabIndex="1">
                        <TabContainer headerContainer>
                            <TabHeader index="1">Weather now</TabHeader>
                            <TabHeader index="2">Forecast</TabHeader>
                        </TabContainer>
                        <TabContainer>
                            <Tab index="1">
                                <WeatherSummary weather={weather} shortView metric={metric} />
                            </Tab>
                            <Tab index="2">
                                lorem ipsum
                            </Tab>
                        </TabContainer>
                    </TabController>
                </div>
            </div>
        </section>
    );
}

SingleFavorite.propTypes = {
    className: PropTypes.string,
    metric: PropTypes.string.isRequired,
    removeHandler: PropTypes.func.isRequired,
    favorite: PropTypes.object.isRequired,
    weather: PropTypes.object,
};

SingleFavorite.defaultProps = {
    className: '',
    weather: {},
};

export default SingleFavorite;
