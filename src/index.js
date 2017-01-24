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

angular.bootstrap(document, [app.name]);
