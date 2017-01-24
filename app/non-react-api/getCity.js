const username = `aliaksei_barkou`;

function getOuterAPIRefString(cityStart) {
  return `http://ws.geonames.org/searchJSON?name_startsWith=${ cityStart }&username=${ username }`
}

function getCityAjax(cityStart) {
  return fetch(getOuterAPIRefString(cityStart));
}

export default getCityAjax;
