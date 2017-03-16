import React, { PropTypes, Component } from 'react';
import Script from 'react-load-script';
import isEqual from 'lodash/isEqual';
import Loading from '../components/Loading';
import { getGoogleMapUrl, initMap, createMarker, setMapOnAll, clearMarkers, setCenter } from '../utils/googleMapAPI';
import '../styles/gmap.scss';

class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // script loading status
            googleScriptLoaded: 'loading',
            map: null,
            // markers that are transformed to google.map object
            stateMarkers: [],
        };
    }

    componentWillReceiveProps = (newProps) => {
        const { map } = this.state;
        const { markers, location } = this.props;
        const { location: newLocation, markers: newMarkers } = newProps;

        if (!map) {
            return;
        }

        if (!isEqual(markers, newMarkers)) {
            const stateMarkers = this.getStateMarkers(map, newMarkers);
            this.setState({ stateMarkers });
        }

        if (newLocation !== location) {
            setCenter(map, newLocation);
        }
    }

    shouldComponentUpdate(newProps, newState) {
        const { map, googleScriptLoaded } = this.state;
        const { locationServiceMessage } = this.props;
        return newState.googleScriptLoaded !== googleScriptLoaded || !map ||
            locationServiceMessage !== newProps.locationServiceMessage;
    }

    // creates an array with google.map markers
    getStateMarkers = (map, markers) => {
        const { stateMarkers } = this.state;

        if (stateMarkers.length > 0) {
            clearMarkers(stateMarkers);
        }

        return setMapOnAll(map,
            markers.map(curr => createMarker(map, curr.location, curr.title)));
    };

    scriptLoadingFailed = () => {
        this.setState({
            googleScriptLoaded: 'failed',
        });
    };

    scriptLoaded = () => {
        this.setState({
            googleScriptLoaded: 'loaded',
        });
    };

    initMapBlock = (element) => {
        if (!element) {
            return;
        }

        const { location, markers } = this.props;
        const map = this.state.map || initMap(element, location);
        const stateMarkers = this.getStateMarkers(map, markers);

        this.setState({ map, stateMarkers });
    };

    updateComponent = (e) => {
        e.preventDefault();
        this.setState({
            map: null,
        });

        this.props.getLocation();
    };

    render() {
        const { className, location, locationServiceMessage } = this.props;
        const { googleScriptLoaded } = this.state;

        return (
            <div className={className}>
                {(() => {
                    if (googleScriptLoaded === 'loaded' && location.longitude && location.latitude) {
                        return (
                            <div
                              className="pseudo-paragraph"
                              style={{
                                  width: '100%',
                                  height: '500px',
                              }}
                              id="map"
                              ref={this.initMapBlock}
                            />
                        );
                    } else if (googleScriptLoaded === 'loading') {
                        return <Loading />;
                    }
                    return undefined;
                })()}
                { locationServiceMessage
                    ? (
                        <div className="pseudo-paragraph">
                            <p>
                                {
                                    <span>
                                        { locationServiceMessage
                                        || 'Google Maps service is not responding or google location service is not enabled.'} <a href="#" onClick={this.updateComponent}>Retry?</a>
                                    </span>
                                }
                            </p>
                        </div>
                    )
                    : undefined
                }
                <Script
                  url={getGoogleMapUrl()}
                  onLoad={this.scriptLoaded}
                  onError={this.scriptLoadingFailed}
                />
            </div>
        );
    }
}

GoogleMap.propTypes = {
    className: PropTypes.string,
    location: PropTypes.object,
    markers: PropTypes.array,
    getLocation: PropTypes.func.isRequired,
    locationServiceMessage: PropTypes.string,
};

GoogleMap.defaultProps = {
    className: '',
    location: {
        message: 'No location available',
    },
    markers: [],
    locationServiceMessage: '',
};

export default GoogleMap;
