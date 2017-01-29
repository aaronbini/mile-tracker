import template from './new-trip.html';
import styles from './new-trip.scss';

export default {
  template,
  bindings: {
    airports: '<'
  },
  controller
};

function controller () {
  this.styles = styles;
  
  this.$onInit = () => {
    this.resetTrip = () => {
      this.totalTrip = {
        startDate: null,
        endDate: null,
        departure: null,
        destination: null,
        movements: []
      };
    };
    this.resetTrip();
  };

  this.options = ['Air', 'Ground'];
  this.mode = 'Air';
  this.groundMode = 'Car';
  
}