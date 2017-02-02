import template from './admin-detail.html';

export default {
  template,
  bindings: {
    tripDetails: '<'
  },
  controller
};

controller.$inject = ['chartService'];
function controller (chartService) {
  this.$onInit = () => {
    this.trip = this.tripDetails.trip;
    this.emissions = this.tripDetails.emissions;
    const bar = document.getElementById('bar');
    this.getModeMiles();
    chartService.configModeChart(bar, this.modeMiles, 'Miles');
  };


  this.getModeMiles = () => {
    this.modeMiles = this.trip.movements.reduce((accumulator, movement) => {
      accumulator[movement.mode] += movement.distance;
      return accumulator;
    }, {air: 0, car: 0, bus: 0, train: 0});
  };

};