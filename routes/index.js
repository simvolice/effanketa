/**
 * Здесь настраиваем роутеры, разделяем на файлы
 *
 */
module.exports = function (app) {
    app.use('/', require('./authrouter'));
    app.use('/', require('./coutryRouter'));
    app.use('/', require('./roleRouter'));
    app.use('/', require('./formRouter'));
    app.use('/', require('./eventRouter'));
    app.use('/', require('./creditsRouter'));
    app.use('/', require('./grmRouter'));
    app.use('/', require('./finansialstatusRouter'));
    app.use('/', require('./mainScoreProgrammRouter'));
    app.use('/', require('./strategicRouter'));
    app.use('/', require('./buildReportRouter'));
    app.use('/', require('./mainScoreReportRouter'));
    app.use('/', require('./dataIntermIndexRouter'));
    app.use('/', require('./excelRouter'));


};