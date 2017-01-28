import template from './new-trip.html';
import styles from './new-trip.scss';

export default {
  template,
  bindings: {
    airports: '<'
  },
  controller
};

controller.$inject = ['tripService'];
function controller (tripService) {
  this.styles = styles;
  
  this.$onInit = () => {
    this.resetTrip = () => {
      this.totalTrip = {
        startDate: null,
        endDate: null,
        movements: []
      };
    };
    this.resetTrip();
  };

  this.options = ['Air', 'Ground'];
  this.groundOptions = ['Bus', 'Train', 'Car'];
  this.mode = 'Air';
  this.groundMode = 'Car';

  //could pass the new trip to next state but might not be necessary
  //as long as we resolve all users trips
  this.addNewTrip = (trip) => {
    tripService.addTrip(trip)
      .then(trip => {
        this.resetTrip();
        $state.go('dashboard', {trip});
      })
      .catch(err => console.log(err));
  };
  
}