import template from './dashboard.html';

export default {
  template,
  bindings: {
    trips: '<',
    user: '<',
    newTrip: '<',
    companyMiles: '<',
    unconfirmed: '<'
  },
  controller
};

controller.$inject = ['chartService', '$state', 'tripService', '$scope'];
function controller (chartService, $state, tripService, $scope) {

  this.$onInit = () => {
    this.companyTotals = this.companyMiles.reduce((accumulator, mode) => {
      accumulator[mode._id] += mode.total;
      return accumulator;
    }, {car: 0, air: 0, bus: 0, train: 0});
    this.confirmed = [];
    for (let i = 0; i < this.unconfirmed.length; i++) {
      this.confirmed[i] = false;
    }
    Promise.all([
      tripService.getEmissions(),
      tripService.getEmissions(true)
    ])
      .then(([companyEmissions, soloEmissions]) => {
        this.companyEmissions = companyEmissions.total;
        this.soloEmissions = soloEmissions.total;
        console.log('companyEmissions: ', this.companyEmissions);
        console.log('soloEmissions: ', this.soloEmissions);
        $scope.$digest();
      })
      .catch(err => console.log(err));
    
    //should probably be done on server-side
    this.milesTraveled = {air: 0, car: 0, bus: 0, train: 0};
    this.trips.forEach(trip => {
      trip.movements.reduce((accumulator, movement) => {
        accumulator[movement.mode] += movement.distance;
        return accumulator;
      }, this.milesTraveled);
    });
  };

  this.addConfirmations = () => {
    //could add to in-memory arrays or make http requests to update arrays
    let confirmationPromises = this.unconfirmed.filter((trip, index) => {
      return this.confirmed[index];
    }).map(trip => {
      return tripService.confirmTrip(trip._id);
    });
    Promise.all(confirmationPromises)
      .then(trips => {
        this.trips.push(...trips);
        return tripService.getUnconfirmed();   
      })
      .then(unconfirmed => {
        this.unconfirmed = unconfirmed;
        $scope.$digest();
      })
      .catch(err => console.log(err));
  };

  this.showDetails = (id) => {
    $state.go('dashboard.tripDetail', {id});
  };

}