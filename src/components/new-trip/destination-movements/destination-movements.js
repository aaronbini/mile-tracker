import template from './destination-movements.html';

export default {
  template,
  bindings: {
    totalTrip: '<',
  },
  controller
};

controller.$inject = ['tripService', '$state', 'distanceService'];
function controller (tripService, $state, distanceService) {

  this.$onInit = () => {
    // if (this.totalTrip === null) {
    //   $state.go('dashboard');
    // }
    this.destMovements = {
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

    this.options = [
      {option: 'estimate', text: 'Yes, and I would like to estimate my mileage.'},
      {option: 'individual', text: 'Yes, and I would like to enter the individual trip legs.'},
      {option: 'none', text: 'No, I would like to submit the trip as is.'}
    ];
    this.selectSubmission = 'estimate';

    this.groundMode = 'car';

    this.states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 
      'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 
      'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 
      'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 
      'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 
      'WA', 'WI', 'WV', 'WY'];
  };

  this.resetTrips = () => {
    this.trips = [ {fromCity: null, fromState: null, toCity: null, toState: null } ];
  };

  this.resetTrips();

  this.addTripLeg = () => {
    this.trips.unshift( {fromCity: null, fromState: null, toCity: null, toState: null } );
  };

  this.removeTripLeg = (trip, index) => {
    this.trips = [
      ...this.trips.slice(0, index),
      ...this.trips.slice(index + 1)  
    ];
  };

  this.addDistances = () => {
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

  //may not need to send along trip, but could have a success message on dashboard if trip is passed
  this.addTotalTrip = () => {
    if (this.selectSubmission === 'estimate') {
      for (let prop in this.destMovements) {
        let current = this.destMovements[prop];
        if (current.distance !== null) {
          current.distance = parseInt(current.distance, 10);
          //add mileage to total trip miles
          this.totalTrip.totalMiles += current.distance;
          //add the subTrip to the movements array
          this.totalTrip.movements.push({mode: current.mode, distance: current.distance});
        }
      }
      this.submitNewTrip(this.totalTrip);
    } else {
      this.addDistances();
    }
  };

  this.submitNewTrip = (trip) => {
    tripService.addTrip(trip)
      .then(trip => {
        $state.go('dashboard', {newTrip: trip});
      })
      .catch(err => console.log(err));
  };
}