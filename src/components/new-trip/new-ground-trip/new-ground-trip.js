import template from './new-ground-trip.html';

export default {
  template,
  bindings: {
    totalTrip: '<'
  },
  controller
};

controller.$inject = ['distanceService', '$state'];
function controller (distanceService, $state) {
  
  this.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 
    'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 
    'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 
    'WA', 'WI', 'WV', 'WY'];

  this.groundOptions = [{type: 'car', display: 'Car'}, {type: 'bus', display: 'Bus'}, {type: 'train', display: 'Train'}];
  this.groundMode = 'car';

  this.resetTrips = () => {
    this.trips = [ {fromCity: '', fromState: '', toCity: '', toState: '' } ];
  };

  this.resetTrips();

  this.addTripLeg = () => {
    this.trips.unshift( {fromCity: '', fromState: '', toCity: '', toState: '' } );
  };

  this.removeTripLeg = (trip, index) => {
    this.trips = [
      ...this.trips.slice(0, index),
      ...this.trips.slice(index + 1)  
    ];
  };

  //submit ground trips
  //TODO: change to single ground trip
  this.submitTrips = () => {
    let tripQueries = this.trips.map(trip => {
      //set the departure and destination cities
      this.totalTrip.departure = trip.fromCity;
      this.totalTrip.destination = trip.toCity;
      return {from: `${trip.fromCity}+${trip.fromState}`, to: `${trip.toCity}+${trip.toState}`};
    });
    let tripPromises = tripQueries.map(trip => {
      return distanceService.getDistance(trip.from, trip.to, this.groundMode);
    });
    Promise.all(tripPromises)
      .then(array => {
        //need to attach mode and distance to each movement,
        //and add each movement to totalTrip
        //should combine these two array loops
        array.forEach(trip => {
          let distance = trip.rows[0].elements[0].distance.value;
          //multiply by 2 for round-trip
          distance = Math.floor(distance / 1000 / 1.609) * 2;
          let movement = {mode: this.groundMode, distance};
          this.totalTrip.movements.push(movement);
        });
        this.tripMiles = array.reduce((total, trip) => {
          let distance = trip.rows[0].elements[0].distance.value;
          distance = Math.floor(distance / 1000 / 1.609);
          return total + distance;
        }, 0);
        //multiply trip leg by 2 for round-trip mileage
        this.totalTrip.totalMiles = this.tripMiles * 2;
        $state.go('tripLegs', {totalTrip: this.totalTrip});
      })
      .catch(err => console.log(err));
  };


}