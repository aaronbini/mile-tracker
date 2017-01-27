import template from './new-round-trip.html';

export default {
  template,
  bindings: {
    airports: '<'
  },
  controller
};

// controller.$inject = ['distanceService', 'flightService', 'tripService'];
controller.$inject = ['flightService'];
function controller (flightService) {
  
  this.$onInit = () => {
    //add display property for displaying in dropdown
    this.airports = this.airports.map(airport => {
      airport.display = `(${airport.code}) ${airport.name}, ${airport.country}`;
      return airport;
    });
  };
  
  //might not be necessary 
  this.resetFlights = () => {
    this.newFlights = [{from: null, to: null, searchFrom: '', searchTo: ''}];
  };

  this.resetFlights();

  this.addNewFlight = () => {
    this.newFlights.unshift({from: null, to: null, searchFrom: '', searchTo: ''});
  };

  this.removeFlight = (flight, index) => {
    this.newFlights = [
      ...this.newFlights.slice(0, index),
      ...this.newFlights.slice(index + 1)  
    ];
  };

  //gives the form info to add a new company
  this.submitFlights = () => {
    console.log(this.newFlights);
    let flightPromises = this.newFlights.map(flight => {
      return flightService.getDistance(flight.from.code, flight.to.code);
    });
    Promise.all(flightPromises)
      .then(array => {
        this.flightMiles = array.reduce((total, trip) => {
          trip.distance = flightService.cleanDistance(trip.distance);
          return total + parseInt(trip.distance, 10);
        }, 0);
      })
      .catch(err => console.log(err));
    this.resetFlights();
  };

  //search for airport
  this.querySearch = (query) => {
    let results = query ? this.airports.filter( createFilterFor(query) ) : this.airports;
    return results;
  };

  function createFilterFor(query) {
    const lowercaseQuery = angular.lowercase(query);

    return function filterFn(airport) {
      const lowercaseCode = angular.lowercase(airport.code) || '';
      const lowercaseAirport = angular.lowercase(airport.name) || '';
      const lowercaseCity = angular.lowercase(airport.city) || '';
      if (lowercaseCode.indexOf(lowercaseQuery) === 0 || 
          lowercaseAirport.indexOf(lowercaseQuery) === 0 ||
          lowercaseCity.indexOf(lowercaseQuery) === 0) {
        return true;
      } else { return false; };
    };
  }

};
