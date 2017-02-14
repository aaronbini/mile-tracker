routes.$inject = ['$stateProvider', '$urlRouterProvider']; 

export default function routes($stateProvider, $urlRouterProvider) {
    
  $stateProvider.state({
    name: 'welcome',
    url: '/',
    data: { public: true },
    resolve: {
      user: ['userService', 'tokenService', (u,t) => {
        if (t.get()) {
          return u.getMe();
        } else { return null; }
      }]
    },
    views: {
      main: {
        component: 'welcome' 
      }
    }
  });

  $stateProvider.state({
    name: 'newTrip',
    url: '/newTrip',
    params: {
      airports: null
    },
    resolve: {
      airports: ['flightService', flight => flight.getAll()],
      users: ['userService', user => user.getAll()],
      user: ['userService', u => u.getMe()]
    },
    views: {
      header: {
        component: 'dashboardHeader'
      },
      main: {
        component: 'newTrip'
      }
    }
  });

  $stateProvider.state({
    name: 'tripLegs',
    url: '/tripLegs',
    params: {
      totalTrip: null,
      airMiles: null
    },
    resolve: {
      totalTrip: ['$transition$', t => t.params().totalTrip]
    },
    views: {
      header: {
        component: 'dashboardHeader'
      },
      main: {
        component: 'destinationMovements'
      }
    }
  });

  $stateProvider.state({
    name: 'dashboard',
    url: '/dashboard',
    params: {
      newTrip: null
    },
    resolve: {
      user: ['userService', u => u.getMe()],
      trips: ['tripService', t => t.getMyTrips()],
      newTrip: ['$transition$', t => {
        if (t.params().totalTrip) {
          return t.params().totalTrip;
        }
      }],
      companyMiles: ['tripService', t => t.getCompanyMileage()],
      unconfirmed: ['tripService', t => t.getUnconfirmed()]
    },
    views: {
      header: {
        component: 'dashboardHeader'
      },
      main: {
        component: 'dashboard'
      }
    }
  });

  $stateProvider.state({
    name: 'dashboard.tripDetail',
    url: '/tripDetail/:id',
    resolve: {
      tripDetails: ['tripService', '$transition$', (trip, transition) => trip.getOneTrip(transition.params().id)],
    },
    component: 'tripDetail'
  });

  $stateProvider.state({
    name: 'admin',
    url: '/admin',
    data: { admin: true },
    resolve: {
      trips: ['tripService', trip => trip.getAllTrips()],
      companyMiles: ['tripService', t => t.getCompanyMileage()],
      companyEmissions: ['tripService', t => t.getEmissions()]
    },
    views: {
      header: {
        component: 'dashboardHeader'
      },
      main: {
        component: 'admin'
      }
    }
  });

  $stateProvider.state({
    name: 'admin.tripDetail',
    url: '/tripDetail/:id',
    resolve: {
      tripDetails: ['tripService', '$transition$', (trip, transition) => trip.getOneTrip(transition.params().id)],
    },
    component: 'adminDetail'
  });

  $urlRouterProvider.otherwise('/');
}