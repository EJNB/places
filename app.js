// Libraries.
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); /*body-parser es una libreria q va a ser lectura del cuerpo de la peticion */
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');

// Models.
const dbconfig = require('./config/database.config');
dbconfig.connect();

// Routes.
const placesRouter = require('./routes/places.route');
const usersRouter = require('./routes/user.route');
const sessionsRouter = require('./routes/session.route');

/*Configuracion de los middlewares*/
// app.use(logger('dev'));
/*Configuracion del middelware body-parser, estas dos opciones dependen del tipo de peticion q estamos recibiendo*/
app.use(bodyParser.json({}));//esta nos permitira leer las q vienen en formato raw
app.use(bodyParser.urlencoded({extend: false}));//esta nos permitira leer las peticiones q vienen en formato x-www-form-urlencoded
// app.use(express.static(path.json(__dirname, 'public')));

app.use('/places', placesRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

app.listen(3000, () => {
    console.log('server running on port 3000');
});
