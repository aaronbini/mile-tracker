userService.$inject = ['$http', 'apiUrl'];

export default function flightService ($http, apiUrl) {

  function getAll () {

    return $http.get(`${apiUrl}/airports`)
      .then(response => response.data);
  }

  function getDistance (start, end) {
    return $http.get(`${apiUrl}/airports/distance?start=${start}&end=${end}`)
      .then(response => response.data);
  }

  return { getAll, getDistance };

}