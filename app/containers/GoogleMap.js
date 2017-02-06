import React, { PropTypes, Component } from 'react';
import Script from 'react-load-script';
import Loading from '../components/Loading';
import { getGoogleMapUrl, initMap, createMarker, setMapOnAll, clearMarkers, setCenter } from '../utils/googleMapAPI';
import css from '../styles/gmap.scss';

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

        this.scriptLoaded = this::this.scriptLoaded;
        this.scriptLoadingFailed = this::this.scriptLoadingFailed;
        this.initMapBlock = this::this.initMapBlock;
        this.getStateMarkers = this::this.getStateMarkers;
        this.updateComponent = this::this.updateComponent;
    }

    componentWillReceiveProps(newProps) {
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
        const { map, googleScriptLoaded } = this.state;
        if (newState.googleScriptLoaded !== googleScriptLoaded || !map) {
            return true;
        }
        return false;
    }

    // creates an array with google.map markers
    getStateMarkers(map, markers) {
        const { stateMarkers } = this.state;

        if (stateMarkers.length > 0) {
            clearMarkers(stateMarkers);
        }

        return setMapOnAll(map,
            markers.map(curr => createMarker(map, curr.location, curr.title)));
    }

    scriptLoadingFailed() {
        this.setState({
            googleScriptLoaded: 'failed',
        });
    }

    scriptLoaded() {
        this.setState({
            googleScriptLoaded: 'loaded',
        });
    }

    initMapBlock(element) {
        if (!element) {
            return;
        }

        const { location, markers } = this.props;
        const map = this.state.map || initMap(element, location);
        const stateMarkers = this.getStateMarkers(map, markers);

        this.setState({ map, stateMarkers });
    }

    updateComponent() {
        this.setState({
            map: null,
        });

        this.forceUpdate();
    }

    render() {
        const { className, location } = this.props;
        const { googleScriptLoaded } = this.state;

        return (
            <div className={className}>
                {
                    googleScriptLoaded === 'loaded' && location !== null && !location.message
                    ? (
                        <div
                          style={{
                              width: '100%',
                              height: '500px',
                          }}
                          id="map"
                          ref={this.initMapBlock}
                        />
                    )
                    : googleScriptLoaded === 'loading'
                    ? (<Loading />)
                    : (
                        <div>
                            <p>
                                {
                                    location
                                    ? location.message
                                    : <span>
                                        Google Maps service is not respondingor google location
                                        service is not enabled. <a href="#" onClick={this.updateComponent}>Retry?</a>
                                    </span>
                                }
                            </p>
                        </div>
                    )
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
};

GoogleMap.defaultProps = {
    className: '',
    location: null,
    markers: [],
};

export default GoogleMap;
