flightService.$inject = ['$http', 'apiUrl', '$window'];

export default function flightService ($http, apiUrl, $window) {

  const AIRPORTS = 'airports';

  function cleanDistance (distance) {
    if (distance.indexOf(',') > -1) {
      distance = distance.split(',').join('');
    }
    return distance;
  }

  function getAll () {
    if ($window.localStorage.getItem(AIRPORTS)) {
      return JSON.parse($window.localStorage.getItem(AIRPORTS));
    } else {
      return $http.get(`${apiUrl}/flights`, {cache: true})
        .then(response => {
          $window.localStorage.setItem(AIRPORTS, JSON.stringify(response.data));
          return response.data;
        });
    }
  }

  function getDistance (start, end) {
    return $http.get(`${apiUrl}/flights/distance?start=${start}&end=${end}`)
      .then(response => response.data);
  }

  getAll();

  return { getAll, getDistance, cleanDistance };

}