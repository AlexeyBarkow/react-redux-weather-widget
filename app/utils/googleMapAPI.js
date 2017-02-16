import { GOOGLE_MAP_API_KEY, GOOGLE_MAP_API_BASE } from './constants';

function convertToLitLng(location) {
    const lat = location.latitude;
    const lng = location.longitude;
    return { lat, lng };
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

export function setCenter(map, position) {
    map.setCenter(convertToLitLng(position));
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
            scrollwheel: false,
            zoom: 12,
        });
}

export function changeLocation(map, { latitude, longitude }) {
    if (map) {
        map.setCenter(new window.google.maps.LatLng(latitude, longitude));
    }
}

export function clearMarkers(markers) {
    setMapOnAll(null, markers);
}
