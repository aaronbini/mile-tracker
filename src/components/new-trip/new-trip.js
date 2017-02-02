import template from './new-trip.html';
import styles from './new-trip.scss';

export default {
  template,
  bindings: {
    airports: '<',
    users: '<'
  },
  controller
};

controller.$inject = ['$mdSidenav'];
function controller ($mdSidenav) {
  this.styles = styles;
  
  this.$onInit = () => {
    console.log('users: ', this.users);

    this.options = ['Air', 'Ground'];
    this.mode = 'Air';
    this.groundMode = 'Car';

    this.resetTrip = () => {
      this.totalTrip = {
        startDate: new Date(),
        endDate: new Date(),
        departure: null,
        destination: null,
        users: [],
        confirmedUsers: [],
        movements: []
      };
    };
    this.resetTrip();
    //array for confirmed users, will be set to true if user confirms
    //that they traveled with other users
    this.userConfirmations = [];
    for (let i = 0; i < this.users.length; i++) {
      this.userConfirmations[i] = false;
    }
    console.log(this.userConfirmations);
  };

  this.toggleSideNav = () => {
    $mdSidenav('addUsers').toggle();
  };

  //add other users who user traveled with
  this.addUsers = () => {
    this.added = true;
    this.addedUsers = this.users.filter((user, index) => {
      //return user if the user has been confirmed, 
      //then map to array of only ids
      return this.userConfirmations[index];
    }).map(user => {
      return user._id;
    });

    this.totalTrip.users.push(...this.addedUsers);
    console.log(this.totalTrip);
    this.toggleSideNav();
  };
  
}