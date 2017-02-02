tripService.$inject = ['$http', 'apiUrl'];

export default function tripService($http, apiUrl) {

  function getMyTrips () {
    return $http.get(`${apiUrl}/trips/byEmployee`)
      .then(result => result.data);
  }

  //use default params here to set dates
  function getAllTrips (from = new Date('1987-01-01'), to = new Date()) {
    return $http.get(`${apiUrl}/trips?from=${from}&to=${to}`)
      .then(result => result.data);
  }

  function getOneTrip (id) {
    return $http.get(`${apiUrl}/trips/byTrip/${id}`)
      .then(result => result.data);
  }

  function getCompanyMileage () {
    return $http.get(`${apiUrl}/trips/companyTotals`)
      .then(result => result.data);
  }

  function getUnconfirmed () {
    return $http.get(`${apiUrl}/trips/unconfirmed`)
      .then(result => result.data);
  }

  function confirmTrip (tripId) {
    return $http.put(`${apiUrl}/trips/addUser/${tripId}`)
      .then(result => result.data);
  }

  function addTrip (newTrip) {
    return $http.post(`${apiUrl}/trips`, {trip: newTrip})
      .then(result => result.data);
  }

  return {
    getMyTrips,
    getOneTrip,
    getAllTrips,
    getUnconfirmed,
    getCompanyMileage,
    confirmTrip,
    addTrip
  };
}