import angular from 'angular';
import app from './app';
import routes from './routes';
import auth from './auth';
import http from './http';
import './scss/main.scss';

// app.constant('apiUrl', process.env.API_URL || '/api');
app.constant('apiUrl', 'http://localhost:3000/api');

app.config(http);
app.config(routes);
app.run(auth);

angular.bootstrap(document, [app.name]);
