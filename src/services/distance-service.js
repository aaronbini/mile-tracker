distanceService.$inject = ['$http', 'apiUrl'];

export default function distanceService ($http, apiUrl) {

  function cleanString(string) {
    if (string.indexOf(' ') > -1) {
      return string.split(' ').join('+');
    }
    return string;
  }

  function getDistance (start, end) {
    return $http.get(`${apiUrl}/groundTrips?from=${start}&to=${end}`)
      .then(response => response.data);
  }

  return { cleanString, getDistance };

}