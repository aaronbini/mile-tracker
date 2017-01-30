import template from './dashboard.html';

export default {
  template,
  bindings: {
    trips: '<',
    user: '<',
    newTrip: '<',
    companyMiles: '<'
  },
  controller
};

controller.$inject = ['chartService', '$state'];
function controller (chartService, $state) {

  this.$onInit = () => {
    this.companyTotals = this.companyMiles.reduce((accumulator, mode) => {
      accumulator[mode._id] += mode.total;
      return accumulator;
    }, {car: 0, air: 0, bus: 0, train: 0});
    console.log(this.companyTotals);
    this.current = null;
    this.yourEmissions = 13;
    this.companyEmissions = 37;
    this.milesTraveled = {air: 0, car: 0, bus: 0, train: 0};
    this.trips.forEach(trip => {
      trip.movements.reduce((accumulator, movement) => {
        accumulator[movement.mode] += movement.distance;
        return accumulator;
      }, this.milesTraveled);
    });
    console.log(this.milesTraveled);
  };

  this.showDetails = (id) => {
    $state.go('dashboard.tripDetail', {id});
  };

}