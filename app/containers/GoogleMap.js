import React, { PropTypes, Component } from 'react';
import Script from 'react-load-script';
import Loading from '../components/Loading';
import { getGoogleMapUrl, initMap, changeLocation, createMarker } from '../utils/googleMapAPI';

class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            googleScriptLoaded: 'loading',
            map: null,
        };

        this.scriptLoaded = this::this.scriptLoaded;
        this.scriptLoadingFailed = this::this.scriptLoadingFailed;
        this.initMapBlock = this::this.initMapBlock;
    }

    shouldComponentUpdate(_, newState) {
        if (newState.googleScriptLoaded !== this.state.googleScriptLoaded) {
            return true;
        }
        return false;
    }

    componentDidReceiveProps(newProps) {
        const oldLocation = this.props.location;
        const newLocation = newProps.location;
    }

    scriptLoaded() {
        this.setState({
            googleScriptLoaded: 'loaded',
        });
    }

    scriptLoadingFailed() {
        this.setState({
            googleScriptLoaded: 'failed',
        });
    }

    initMapBlock(element) {
        const { markers, location } = this.props;
        const map = initMap(element, location);

        markers.map(curr => createMarker(map, curr.location, curr.title));

        this.setState({ map });
    }


    render() {
        const { className } = this.props;
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
                                    : 'Google Maps service is not responding or google location service is not enabled'
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
