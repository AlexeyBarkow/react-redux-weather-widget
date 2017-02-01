const GOOGLE_MAP_API_KEY = 'AIzaSyCOPA2wyfe0T9xSeRxTDs1Jz7B38s1hiUM';

function convertToLitLng(location) {
    const lat = location.latitude;
    const lng = location.longitude;
    return { lat, lng };
}

export function getGoogleMapUrl(key = GOOGLE_MAP_API_KEY) {
    return `https://maps.googleapis.com/maps/api/js?key=${key}`;
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

export function initMap(container, position) {
    if (!window.google) {
        return null;
    }
    const map = new window.google.maps.Map(container,
        {
            center: convertToLitLng(position),
            scrollwheel: false,
            zoom: 12,
        });
    return map;
}

export function changeLocation(map, { latitude, longitude }) {
    if (map) {
        map.setCenter(new window.google.maps.LatLng(latitude, longitude));
    }
}
