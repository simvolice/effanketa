/**
 * Created by simvolice on 07.09.2017 19:26
 */




const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const DataIntermedIndexService = require('../services/DataIntermedIndexService');



router.post('/getreportallforms', checkSeesionToken, async (req, res, next) =>{

    let result = await DataIntermedIndexService.getAllForm(req.body.data);

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



router.post('/getreportsumgenderevent', checkSeesionToken, async (req, res, next) =>{
    let result = await DataIntermedIndexService.getReportSumGenderEvent(req.body.data);


    res.json({"code": "ok", "resultFromDb": result});




});


router.post('/insertnewval', checkSeesionToken, async (req, res, next) =>{
    await DataIntermedIndexService.insertNewVal(req.body.data);


    res.json({"code": 0});




});


router.get('/getnewval', async (req, res, next) =>{
    let result = await DataIntermedIndexService.getNewval();


    res.json({"code": 0, resultFromDb: result[0]});




});

module.exports = router;