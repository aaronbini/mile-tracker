userService.$inject = ['$http', 'apiUrl'];

export default function distanceService ($http, apiUrl) {

  function cleanString(string) {
    if (string.indexOf(' ') > -1) {
      return string.split(' ').join('+');
    }
    return string;
  }

  function getDistance (start, end) {
    return $http.get(`${apiUrl}/airports/distance?start=${start}&end=${end}`)
      .then(response => response.data);
  }

  return { cleanString, getDistance };

}