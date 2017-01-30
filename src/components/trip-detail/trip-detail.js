import template from './trip-detail.html';

export default {
  template,
  bindings: {
    trip: '<'
  },
  controller
};

controller.$inject = ['chartService'];
function controller (chartService) {
  this.$onInit = () => {
    console.log(this.trip);
    this.emissions = 12;
    const bar = document.getElementById('bar');
    this.getModeMiles();
    chartService.configModeChart(bar, this.modeMiles);
  };


  this.getModeMiles = () => {
    this.modeMiles = this.trip.movements.reduce((accumulator, movement) => {
      accumulator[movement.mode] += movement.distance;
      return accumulator;
    }, {air: 0, car: 0, bus: 0, train: 0});
  };

};