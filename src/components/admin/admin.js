import template from './admin.html';

export default {
  template,
  bindings: {
    trips: '<'
  },
  controller
};

controller.$inject = ['chartService'];
function controller (chartService) {
  this.$onInit = () => {
    console.log(this.trips);
  };
}