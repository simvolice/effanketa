/**
 * Created by simvolice on 29.08.2017 17:35
 */


const express = require('express');
const router = express.Router();
const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

const TypePeriod = require('../services/TypePeriod');
const NameYear = require('../services/NameYear');
const BuildReportService = require('../services/BuildReportService');

router.post('/gettypeperiod', checkSeesionToken, async (req, res, next) =>{

    let result = await TypePeriod.getAll();

    res.json({"code": "ok", "resultFromDb": result});


});


router.post('/getyearname', checkSeesionToken, async (req, res, next) =>{


    let result = await NameYear.getAll();

    res.json({"code": "ok", "resultFromDb": result});

});



router.post('/getgrowpotencialnewver', checkSeesionToken, async (req, res, next) =>{


    let result = await BuildReportService.getgrowpotencialNewVersion(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});


router.post('/getgrowpotencial', checkSeesionToken, async (req, res, next) =>{


    let result = await BuildReportService.getgrowpotencial(req.body.data);

res.json({"code": "ok", "resultFromDb": result});

});

router.post('/getreportcredits', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportcredits(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});




router.post('/getreportgrm', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportgrm(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});



router.post('/getreportfinansialstatus', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportfinansialstatus(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});


router.post('/addnewreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.addnewreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});

router.post('/getreport', checkSeesionToken, async (req, res, next) =>{
    let result = await checkRole.forBuildReport(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }
});



router.post('/updreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.updreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/delreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.delreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});

module.exports = router;



