import React, { PropTypes, Component } from 'react';
import TabController from './TabController';
import { formatDate } from '../utils/unifiedDateFormat';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
    changeForecastFilter = (e) => {
        this.props.setForecastFilter(e.target.value);
    }

    render() {
        const { weather, forecast, forecastFilter, metric } = this.props;
        return (
            <TabController defaultSelectedTabIndex="1">
                <TabContainer headerContainer>
                    <TabHeader index="1">City Overview</TabHeader>
                    <TabHeader index="2">Weather forecast</TabHeader>
                </TabContainer>
                <TabContainer>
                    <Tab noRenderWhenHidden index="1">
                        <WeatherSummary
                          formatDate={date => `Info gathered in ${formatDate(date)}`}
                          showDate
                          weather={weather}
                          metric={metric}
                        />
                    </Tab>
                    <Tab noRenderWhenHidden index="2">
                        <WeatherForecastSummary
                          forecastFilter={forecastFilter}
                          changeFilter={this.changeForecastFilter}
                          forecast={forecast}
                          className="summary"
                          metric={metric}
                        />
                    </Tab>
                </TabContainer>
            </TabController>
        );
    }
}

IndexMain.propTypes = {
    weather: PropTypes.object,
    forecast: PropTypes.array,
    forecastFilter: PropTypes.string.isRequired,
    setForecastFilter: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
};

IndexMain.defaultProps = {
    weather: {
        status: 0,
    },
    forecast: {
        status: 0,
    },
    nearestCities: [],
    city: '',
    countryCode: '',
};

export default IndexMain;
