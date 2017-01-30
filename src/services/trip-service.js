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

  //mongoose model for trip has departure, destination, startDate, endDate, user
  //this routes expects a "movements" array to be attached to the body, which
  //will contain all of the trips associated with the totalTrip, each of these requires
  //a string specifying mode ['air', 'car', 'bus', 'train']
  function addTrip (newTrip) {
    return $http.post(`${apiUrl}/trips`, {trip: newTrip})
      .then(result => result.data);
  }

  return {
    getMyTrips,
    getOneTrip,
    getAllTrips,
    getCompanyMileage,
    addTrip
  };
}