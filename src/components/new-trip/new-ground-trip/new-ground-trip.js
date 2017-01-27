import template from './new-ground-trip.html';

export default {
  template,
  controller
};

controller.$inject = ['distanceService'];
function controller (distanceService) {
  
  this.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 
    'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 
    'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 
    'WA', 'WI', 'WV', 'WY'];

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

  //gives the form info to add a new company
  this.submitTrips = () => {
    let tripQueries = this.trips.map(trip => {
      return {from: `${trip.fromCity}+${trip.fromState}`, to: `${trip.toCity}+${trip.toState}`};
    });
    let tripPromises = tripQueries.map(trip => {
      return distanceService.getDistance(trip.from, trip.to);
    });
    Promise.all(tripPromises)
      .then(array => {
        console.log('trip array: ', array);
        this.tripMiles = array.reduce((total, trip) => {
          let distance = trip.rows[0].elements[0].distance.value;
          distance = Math.floor(distance / 1000 / 1.609);
          return total + distance;
        }, 0);
      })
      .catch(err => console.log(err));
    this.resetTrips();
  };


}