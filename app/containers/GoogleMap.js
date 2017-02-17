import React, { PropTypes, Component } from 'react';
import Script from 'react-load-script';
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
        const newMarkers = newProps.markers;
        const newLocation = newProps.location;

        if (!map) {
            return;
        }

        if (markers !== newMarkers) {
            const stateMarkers = this.getStateMarkers(map, newMarkers);

            this.setState({ stateMarkers });
        }


        if (newLocation !== location) {
            setCenter(map, newLocation);
        }
    }

    shouldComponentUpdate(_, newState) {
        const { map, googleScriptLoaded, location } = this.state;
        return newState.googleScriptLoaded !== googleScriptLoaded || !map
            || !!(location && location.message);
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

    updateComponent = () => {
        this.setState({
            map: null,
        });

        this.props.getLocation();
    };

    render() {
        const { className, location } = this.props;
        const { googleScriptLoaded } = this.state;

        return (
            <div className={className}>
                {(() => {
                    if (googleScriptLoaded === 'loaded' && !location.message) {
                        return (
                            <div
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
                    return (
                        <div>
                            <p>
                                {
                                    <span>
                                        { location.message
                                        || 'Google Maps service is not responding or google location service is not enabled.'} <a href="#" onClick={this.updateComponent}>Retry?</a>
                                    </span>
                                }
                            </p>
                        </div>
                    );
                })()}
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
};

GoogleMap.defaultProps = {
    className: '',
    location: {
        message: 'No location available',
    },
    markers: [],
};

export default GoogleMap;
