import template from './dashboard.html';

export default {
  template,
  bindings: {
    trips: '<'
  },
  controller
};

function controller () {

  this.$onInit = () => {
    console.log('trips: ', this.trips);
  };
}