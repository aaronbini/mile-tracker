export default {
  template: `
      <div class="flex-direction-column"
        <h2>Welcome</h2>
        <h3>Equal Exchange Travel Tracker</h3>
        <img class="logo" src="../../../images/ee_logo.png" alt="">
        <p>Log in to enter mileage information about your trips.</p>
      </div> 
  `
};

controller.$inject = ['flightService'];
function controller (flightService) {
  flightService.getAll();
}
