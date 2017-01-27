import template from './new-trip.html';
import styles from './new-trip.scss';

export default {
  template,
  bindings: {
    airports: '<'
  },
  controller
};

controller.$inject = ['flightService'];
function controller (flightService) {
  this.styles = styles;
  this.$onInit = () => {
    // this.airports = flightService.airports;
    // flightService.getAll()
    //   .then(airports => this.airports = airports);
  }

  this.options = ['Air', 'Ground'];
  this.groundOptions = ['Bus', 'Train', 'Car'];
  this.mode = 'Air';
  this.groundMode = 'Car';
  
}