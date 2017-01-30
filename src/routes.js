routes.$inject = ['$stateProvider', '$urlRouterProvider']; 

export default function routes($stateProvider, $urlRouterProvider) {
    
  $stateProvider.state({
    name: 'welcome',
    url: '/',
    data: { public: true },
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
      }]
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
      trip: ['tripService', '$transition$', (trip, transition) => trip.getOneTrip(transition.params().id)]
    },
    component: 'tripDetail'
  });

  // $stateProvider.state({
  //   name: 'gallery',
  //   url: '/albums',
  //   params: {
  //     selected: { dynamic: true }
  //   },
  //   resolve: {
  //     albums: ['albumService', Album => Album.query().$promise],
  //     selected: ['$transition$', t => t.params().id]
  //   },
  //   component: 'albums',
  //   views: {
  //     header: {
  //       component: 'albumsHeader'
  //     },
  //     main: {
  //       component: 'albums' 
  //     }
  //   }
  // });

  // $stateProvider.state({
  //   name: 'gallery.album',
  //   url: '/{id}',
  //   abstract: true,
  //   default: '.thumbnail',
  //   resolve: {
  //     id: ['$transition$', t => t.params().id],
  //     album: ['albumService', '$transition$', (Album, t) => {
  //       return Album.get({ id: t.params().id }).$promise;
  //     }],
  //     // make images available to viewer components
  //     images: ['album', a => a.images]
  //   },
  //   component: 'album' 
  // });

  // $stateProvider.state({
  //   name: 'gallery.album.detail',
  //   url: '/detail',
  //   component: 'detailView'
  // });

  // $stateProvider.state({
  //   name: 'gallery.album.thumbnail',
  //   url: '/thumbnail',
  //   component: 'thumbnailView'
  // });

  $stateProvider.state({
    name: 'admin',
    url: '/admin',
    data: { admin: true },
    resolve: {
      trips: ['tripService', trip => trip.getAllTrips()]
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

  $urlRouterProvider.otherwise('/');
}