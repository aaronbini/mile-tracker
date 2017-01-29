import template from './destination-movements.html';

export default {
  template,
  bindings: {
    totalTrip: '<',
  },
  controller
};

controller.$inject = ['tripService', '$state'];
function controller (tripService, $state) {

  this.$onInit = () => {
    if (this.totalTrip === null) {
      $state.go('dashboard');
    }
    console.log('total trip: ', this.totalTrip);
  };

  //submit fully formed new trip from this state and then transition to dashboard
  //dashboard should reflect newly added trip
  this.addNewTrip = (trip) => {
    tripService.addTrip(trip)
      .then(trip => {
        this.resetTrip();
        $state.go('dashboard', {trip});
      })
      .catch(err => console.log(err));
  };
}