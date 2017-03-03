import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';
import WeatherSummary from './WeatherSummary';
import WeatherForecastShort from './WeatherForecastShort';
import TabController from '../containers/TabController';
import Tab from './Tab';
import TabHeader from './TabHeader';
import TabContainer from './TabContainer';

function SingleFavorite({
    className,
    metric,
    favorite,
    weather,
    forecast,
    removeHandler,
    index,
}) {
    const remove = () => {
        removeHandler(index);
    };

    return (
        <article className={classnames(className, 'favorite')}>
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
                    <TabController className="row" defaultSelectedTabIndex="1">
                        <TabContainer headerContainer>
                            <TabHeader index="1">Weather now</TabHeader>
                            <TabHeader index="2">Forecast</TabHeader>
                        </TabContainer>
                        <TabContainer>
                            <Tab noRenderWhenHidden index="1">
                                <WeatherSummary className="favorite__forecast" weather={weather} shortView metric={metric} />
                            </Tab>
                            <Tab noRenderWhenHidden index="2">
                                <WeatherForecastShort className="favorite__forecast" forecast={forecast} metric={metric} />
                            </Tab>
                        </TabContainer>
                    </TabController>
                </div>
            </div>
        </article>
    );
}

SingleFavorite.propTypes = {
    className: PropTypes.string,
    metric: PropTypes.string.isRequired,
    removeHandler: PropTypes.func.isRequired,
    favorite: PropTypes.object.isRequired,
    weather: PropTypes.object,
    forecast: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    index: PropTypes.number.isRequired,
};

SingleFavorite.defaultProps = {
    className: '',
    weather: {},
    forecast: [],
};

export default SingleFavorite;
