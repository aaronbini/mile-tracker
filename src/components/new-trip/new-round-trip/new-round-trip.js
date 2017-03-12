import template from './new-round-trip.html';

export default {
  template,
  bindings: {
    airports: '<',
    totalTrip: '<'
  },
  controller
};

controller.$inject = ['flightService', '$state'];
function controller (flightService, $state) {
  
  this.$onInit = () => {
    //add display property for displaying in dropdown
    this.airports = this.airports.map(airport => {
      airport.display = `(${airport.code}) ${airport.name}, ${airport.country}`;
      return airport;
    });
  };

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

  //submit flights for distance calculation
  this.submitFlights = () => {
    let flightPromises = this.newFlights.map(flight => {
      //attach departure and destination cities to totalTrip
      /**
       * 
       * The below will need to be removed when 
       * switch is made to having user enter departure and destination
       **/
      // if (flight.departure) {
      //   this.totalTrip.departure = flight.from.city;
      // }
      // if (flight.destination) {
      //   this.totalTrip.destination = flight.to.city;
      // }
      return flightService.getDistance(flight.from.code, flight.to.code);
    });
    Promise.all(flightPromises)
      .then(array => {
        //need to attach mode and distance to each movement,
        //and add each movement to totalTrip
        array.forEach(flight => {
          let intDistance = parseInt(flightService.cleanDistance(flight.distance), 10);
          let movement = {mode: 'air', distance: intDistance};
          this.totalTrip.movements.push(movement);
        });
        //sum miles from all trip movements
        const totalMiles = array.reduce((total, flight) => {
          let intDistance = parseInt(flightService.cleanDistance(flight.distance), 10);
          return total + intDistance;
        }, 0);
        //attach totalMiles to totalTrip
        this.totalTrip.totalMiles = totalMiles;

        $state.go('tripLegs', {totalTrip: this.totalTrip});
      })
      .catch(err => console.log(err));
    
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
      //allow user to enter airport code, airport name, or city name to filter
      if (lowercaseCode.indexOf(lowercaseQuery) === 0 || 
          lowercaseAirport.indexOf(lowercaseQuery) === 0 ||
          lowercaseCity.indexOf(lowercaseQuery) === 0) {
        return true;
      } else { return false; };
    };
  }

};
