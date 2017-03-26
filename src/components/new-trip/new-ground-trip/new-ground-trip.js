import template from './new-ground-trip.html';

export default {
  template,
  bindings: {
    totalTrip: '<'
  },
  controller
};

controller.$inject = ['distanceService', 'tripService', '$state'];
function controller (distanceService, tripService, $state) {
  
  this.$onInit = () => {
    this.disabled = false;
    this.groundTrips = {
      car: {
        distance: null,
        mode: 'car'
      },
      bus: {
        distance: null,
        mode: 'bus'
      },
      train: {
        distance: null,
        mode: 'train'
      }
    };
  };

  this.callMade = false;

  this.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 
    'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 
    'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 
    'WA', 'WI', 'WV', 'WY'];

  this.groundOptions = [{type: 'car', display: 'Car'}, {type: 'bus', display: 'Bus'}, {type: 'train', display: 'Train'}];
  this.groundMode = 'car';

  this.options = [
    {option: 'estimate', text: 'I would like to estimate my total mileage.'},
    {option: 'individual', text: 'I would like to enter the individual trip legs.'}
  ];
  
  this.selectSubmission = 'estimate';

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

  this.submitNewTrip = (trip) => {
    this.callMade = !this.callMade;
    tripService.addTrip(trip)
      .then(trip => {
        $state.go('dashboard', {newTrip: trip});
      })
      .catch(err => console.log(err));
  };

  this.submitTotalTrip = () => {
    this.disabled = true;
    if (this.selectSubmission === 'estimate') {
      for (let prop in this.groundTrips) {
        let current = this.groundTrips[prop];
        if (current.distance !== null) {
          current.distance = parseInt(current.distance, 10);
          this.totalTrip.totalMiles += current.distance;
          this.totalTrip.movements.push({mode: current.mode, distance: current.distance});
        }
      }
      this.submitNewTrip(this.totalTrip);
    } else {
      this.addTripLegs();
    }
  };

  //submit ground trips
  this.addTripLegs = () => {
    console.log('adding trip legs');
    let tripQueries = this.trips.map(trip => {
      return {from: `${trip.fromCity}+${trip.fromState}`, to: `${trip.toCity}+${trip.toState}`};
    });
    let tripPromises = tripQueries.map(trip => {
      return distanceService.getDistance(trip.from, trip.to, this.groundMode);
    });
    Promise.all(tripPromises)
      .then(array => {
        array.forEach(trip => {
          let distance = trip.rows[0].elements[0].distance.value;
          distance = Math.floor(distance / 1000 / 1.609);
          let movement = {mode: this.groundMode, distance};
          this.totalTrip.movements.push(movement);
        });

        const tripMiles = array.reduce((total, trip) => {
          let distance = trip.rows[0].elements[0].distance.value;
          distance = Math.floor(distance / 1000 / 1.609);
          return total + distance;
        }, 0);
        this.totalTrip.totalMiles += tripMiles;
        this.submitNewTrip(this.totalTrip);
      })
      .catch(err => console.log(err));
  };


}