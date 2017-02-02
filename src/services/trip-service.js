tripService.$inject = ['$http', 'apiUrl'];

export default function tripService($http, apiUrl) {

  function getMyTrips () {
    return $http.get(`${apiUrl}/trips/byEmployee`)
      .then(result => result.data);
  }

  //use default params here to set dates
  function getAllTrips (startDate = new Date('1987-01-01'), endDate = new Date()) {
    return $http.get(`${apiUrl}/trips?startDate=${startDate}&endDate=${endDate}`)
      .then(result => result.data);
  }

  function getOneTrip (id) {
    return $http.get(`${apiUrl}/trips/byTrip/${id}`)
      .then(result => result.data);
  }

  function getCompanyMileage () {
    return $http.get(`${apiUrl}/movements/companyTotals`)
      .then(result => result.data);
  }

  function getEmissions(single) {
    if (single) {
      return $http.get(`${apiUrl}/movements/soloEmissions`)
        .then(result => result.data);

    } else {
      return $http.get(`${apiUrl}/movements/companyEmissions`)
        .then(result => result.data);
    }
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
    getEmissions,
    getCompanyMileage,
    confirmTrip,
    addTrip
  };
}