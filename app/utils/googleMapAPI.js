import { GOOGLE_MAP_API_KEY } from './constants';

function convertToLitLng(location) {
    const lat = location.latitude;
    const lng = location.longitude;
    return { lat, lng };
}

export function createMarker(map, position, title) {
    if (map) {
        const marker = new window.google.maps.Marker({
            map,
            position: convertToLitLng(position),
            title,
        });
        return marker;
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
    return `https://maps.googleapis.com/maps/api/js?key=${key}`;
}

export function initMap(container, position, map) {
    if (!window.google) {
        return null;
    }
    const newMap = map || new window.google.maps.Map(container,
        {
            center: convertToLitLng(position),
            scrollwheel: false,
            zoom: 12,
        });
    return newMap;
}

export function changeLocation(map, { latitude, longitude }) {
    if (map) {
        map.setCenter(new window.google.maps.LatLng(latitude, longitude));
    }
}

export function clearMarkers(markers) {
    setMapOnAll(null, markers);
}
