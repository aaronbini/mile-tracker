distanceService.$inject = ['$http', 'apiUrl'];

export default function distanceService ($http, apiUrl) {

  function cleanString(string) {
    if (string.indexOf(' ') > -1) {
      return string.split(' ').join('+');
    }
    return string;
  }

  function getDistance (start, end, mode = 'car') {
    return $http.get(`${apiUrl}/groundTrips?from=${start}&to=${end}&mode=${mode}`)
      .then(response => response.data);
  }

  return { cleanString, getDistance };

}