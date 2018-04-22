import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  styles,
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

  this.successMessage = 'Your trip has been successfully added.';

  this.$onInit = () => {
    if (this.newTrip) {
      this.showSuccessMessage();
    }
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

  this.showSuccessMessage = () => {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
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