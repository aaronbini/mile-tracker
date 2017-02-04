import template from './welcome.html';

export default {
  template,
  bindings: {
    user: '<'
  },
  controller
};

controller.$inject = ['flightService'];
function controller (flightService) {
  this.$onInit = () => {
    flightService.getAll();
  };
}
