import template from './admin.html';

export default {
  template,
  bindings: {
    trips: '<',
    companyMiles: '<',
    companyEmissions: '<'
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

    const miles = document.getElementById('milesBar');
    chartService.configModeChart(miles, this.companyTotals, 'Miles');
    const emissions = document.getElementById('emissionsBar');
    chartService.configModeChart(emissions, this.companyEmissions, 'Emissions');
  };

  

  this.showDetails = (id) => {
    $state.go('admin.tripDetail', {id});
  };
}