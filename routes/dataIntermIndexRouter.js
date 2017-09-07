/**
 * Created by simvolice on 07.09.2017 19:26
 */




const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const DataIntermedIndexService = require('../services/DataIntermedIndexService');



router.post('/getreportuserssatisfied', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getUserSatisfaction(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});



});


router.post('/getreportcountprogramm', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getReportCountProgramm(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});



});



router.post('/getreportcountregeonalinvest', checkSeesionToken, async (req, res, next) =>{


    let result = await DataIntermedIndexService.getReportCountRegeonalInvest(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});



});



router.post('/getreportsummobileamount', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getReportSumMobileAmount(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});

router.post('/getreportcountplatform', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getReportCountPlatform(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});



router.post('/getreportcountbenificiarproject', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getReportSumBenificiarProject(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});



});



router.post('/getreportsumgaproject', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getReportSumGAProject(req.body.data);


    res.json({"code": "ok", "resultFromDb": result});


});



router.post('/getreportcountcompletegrm', checkSeesionToken, async (req, res, next) =>{
    let result = await DataIntermedIndexService.getReportCountCompleteGRM(req.body.data);


    res.json({"code": "ok", "resultFromDb": result});




});

module.exports = router;