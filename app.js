const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const dbConnect = require('./utils/dbConnect');
const config = require('./utils/devConfig');
const scheduler = require('./utils/agenda');



const AuthService = require('./services/Auth');

const CounterService = require('./services/CounterService');
const CountryService = require('./services/CountryService');
const RoleService = require('./services/RoleService');
const ItemForFactInCredits = require('./services/ItemForFactInCredits');
const GrmStatusService = require('./services/GrmStatusService');
const TypePeriod = require('./services/TypePeriod');
const NameYear = require('./services/NameYear');

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





async function initDB() {
   await dbConnect.connect();
   await scheduler.changeStatusOnComplaint();
}



initDB();


async function initApp() {

    await CounterService.initialCounter();

    await GrmStatusService.initialGrmStatus();
    await GrmStatusService.initialGrmCanalsRequest();

    await ItemForFactInCredits.initialItemFactForCredits();

    await CountryService.initialCountry();
    await RoleService.initialRoles();


    await TypePeriod.initialTypePeriod();
    await NameYear.initialNameYear();

    await AuthService.createUserSuperRoot(config.hashAdmin);


}

if (config.firstStart) {

        initApp();


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
