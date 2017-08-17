/**
 * Created by simvolice on 17.08.2017 16:32
 */




const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

const FinansialStatusService = require('../services/FinansialStatusService');

router.post('/addfinansialstatus', checkSeesionToken, async (req, res, next) =>{


    let result =  await FinansialStatusService.addFinansialStatus(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0, "resultFromDb": result.ops[0]});

    } else {

        res.json({"code": 1});

    }


});



router.post('/getfinansialstatus', checkSeesionToken, async (req, res, next) =>{


    let result = await checkRole.forFinansialStatus(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }



});


router.post('/updfinansialstatus', checkSeesionToken, async (req, res, next) =>{

    let result =  await FinansialStatusService.updFinansialStatus(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/delfinansialstatus', checkSeesionToken, async (req, res, next) =>{

    let result =  await FinansialStatusService.delFinansialStatus(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});

module.exports = router;