import template from './dashboard.html';

export default {
  template,
  bindings: {
    trips: '<',
    user: '<',
    newTrip: '<'
  },
  controller
};

controller.$inject = ['chartService'];
function controller (chartService) {

  this.$onInit = () => {
    this.current = null;
    this.totalEmissions = 43;
    this.milesTraveled = {air: 0, car: 0, bus: 0, train: 0};
    this.trips.forEach(trip => {
      trip.movements.reduce((accumulator, movement) => {
        accumulator[movement.mode] += movement.distance;
        return accumulator;
      }, this.milesTraveled);
    });
    console.log(this.milesTraveled);
  };

  

}