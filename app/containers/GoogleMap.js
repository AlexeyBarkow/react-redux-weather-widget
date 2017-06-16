import React, { PropTypes, Component } from 'react';
import Script from 'react-load-script';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import Loading from '../components/Loading';
import { getGoogleMapUrl, initMap, createMarker, setMapOnAll, clearMarkers, changeLocation } from '../utils/googleMapAPI';
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
        const { googleMap } = this.state;
        const { markers, location } = this.props;
        const { location: newLocation, markers: newMarkers } = newProps;

        if (!googleMap) {
            return;
        }

        if (!isEqual(markers, newMarkers)) {
            const stateMarkers = this.getStateMarkers(googleMap, newMarkers);
            this.setState({ stateMarkers });
        }

        if (newLocation !== location) {
            changeLocation(googleMap, newLocation);
        }
    }

    shouldComponentUpdate(newProps, newState) {
        const { googleMap, googleScriptLoaded } = this.state;
        const { locationServiceMessage } = this.props;
        return newState.googleScriptLoaded !== googleScriptLoaded || !googleMap ||
            locationServiceMessage !== newProps.locationServiceMessage;
    }

    // creates an array with google.map markers
    getStateMarkers = (googleMap, markers) => {
        const { stateMarkers } = this.state;

        if (stateMarkers.length > 0) {
            clearMarkers(stateMarkers);
        }

        return setMapOnAll(googleMap,
            map(markers, curr => createMarker(googleMap, curr.location, curr.title)));
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
        const googleMap = this.state.googleMap || initMap(element, location);
        const stateMarkers = this.getStateMarkers(googleMap, markers);

        this.setState({ googleMap, stateMarkers });
    };

    updateComponent = (e) => {
        e.preventDefault();
        this.setState({
            googleMap: null,
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
