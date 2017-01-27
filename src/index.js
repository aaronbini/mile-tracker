import angular from 'angular';
import app from './app';
import routes from './routes';
import auth from './auth';
import http from './http';
import './scss/main.scss';

// app.constant('apiUrl', process.env.API_URL);
app.constant('apiUrl', 'http://localhost:3000/api');
app.constant('eeToken', process.env.ee_token);

app.config(http);
app.config(routes);
app.run(auth);

// if we wanted to turn on caching across the board...
// (only applies to gets)
// app.config( [ '$httpProvider', function( $httpProvider ) {
//     $httpProvider.defaults.config = true;
// }]);

angular.bootstrap(document, [app.name]);
