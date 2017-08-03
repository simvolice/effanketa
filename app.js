const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const dbConnect = require('./utils/dbConnect');
const config = require('./utils/devConfig');
const AuthService = require('./services/Auth');
const MenuService = require('./services/MenuService');
const CounterService = require('./services/CounterService');

const cors = require('cors');//TODO В продакте обязательно удалить
const fsExtra = require('fs-extra');



const app = express();
app.set('trust proxy', 'loopback');
app.use(helmet());
app.use(helmet.noCache());





//TODO В продакте обязательно удалить
cors({credentials: true, origin: true});
app.use(cors());


app.use(favicon(path.join(__dirname, 'public/assets/img/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.urlencoded({extended: false}));



app.use(express.static(path.join(__dirname, 'public')));
fsExtra.ensureDirSync(path.join(__dirname, 'public/uploads/'));






require('./routes')(app);




dbConnect.connect();


if (config.firstStart) {
    CounterService.initialCounter();
    AuthService.createUserSuperRoot(config.hashAdmin);
    MenuService.createAllMenuItem();




}








// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {


    // render the error page
    res.status(err.status || 500);
    res.json({"code": 1});
});

module.exports = app;
