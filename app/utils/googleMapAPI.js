import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_API_BASE } from './constants';

function convertToLitLng({ latitude, longitude }) {
    return new window.google.maps.LatLng(latitude, longitude);
}

export function createMarker(map, position, title) {
    if (map) {
        return new window.google.maps.Marker({
            map,
            position: convertToLitLng(position),
            title,
        });
    }
    return null;
}

export function setMapOnAll(map, markers) {
    for (let i = 0; i < markers.length; i += 1) {
        markers[i].setMap(map);
    }
    return markers;
}

export function getGoogleMapUrl(key = GOOGLE_MAP_API_KEY) {
    return `${GOOGLE_MAP_API_BASE}/js?key=${key}`;
}

export function initMap(container, position, map) {
    if (!window.google) {
        return null;
    }
    return map || new window.google.maps.Map(container,
        {
            center: convertToLitLng(position),
            scrollwheel: true,
            zoom: 12,
        });
}

export function changeLocation(map, location) {
    if (map) {
        map.setCenter(convertToLitLng(location));
    }
}

export function clearMarkers(markers) {
    setMapOnAll(null, markers);
}
