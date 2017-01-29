import template from './trip-detail.html';

export default {
  template,
  bindings: {
    trip: '<'
  },
  controller
};

function controller () {
  this.$onInit = () => {
    this.getModeMiles = () => {
      this.modeMiles = this.trip.movements.reduce((accumulator, movement) => {
        console.log(movement);
        accumulator[movement.mode] += movement.distance;
        return accumulator;
      }, {air: 0, car: 0, bus: 0, train: 0});
      console.log(this.modeMiles);
    };
    this.getModeMiles();
  };
};