/**
 * Created by simvolice on 14.08.2017 15:16
 */



const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

const CreditsService = require('../services/CreditsService');
const SourceInfoService = require('../services/SourceInfoService');






router.post('/getallcredits', checkSeesionToken, async (req, res, next) =>{


    let result = await checkRole.forCredits(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }




});




router.post('/addcredit', checkSeesionToken, async (req, res, next) =>{


    let result =  await CreditsService.addCredit(req.body.data);


    if (result.hasOwnProperty("result")) {

        res.json({"code": 0, "resultFromDb": result.ops[0]});

    } else {

        res.json({"code": 1});

    }


});


router.post('/delcredits', checkSeesionToken, async (req, res, next) =>{





    let result =  await CreditsService.delCredits(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }







});


router.post('/updcredits', checkSeesionToken, async (req, res, next) =>{

    let result =  await CreditsService.updCredits(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }




});



router.post('/getsourceinfo', checkSeesionToken, async (req, res, next) =>{

    let result = await SourceInfoService.getAllSourceInfo();
    res.json({"code": 0, "resultFromDb": result});

});




router.post('/addtable5', checkSeesionToken, async (req, res, next) =>{

    let result =  await CreditsService.addCreditToTable5(req.body.data);


    if (result.hasOwnProperty("result")) {

        res.json({"code": 0, "resultFromDb": result.ops[0]});

    } else {

        res.json({"code": 1});

    }


});



router.post('/deltable5', checkSeesionToken, async (req, res, next) =>{





    let result =  await CreditsService.delTable5(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }







});




router.post('/getalltable5', checkSeesionToken, async (req, res, next) =>{


    let result = await checkRole.forTable5(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }




});

router.post('/updtable5', checkSeesionToken, async (req, res, next) =>{

    let result =  await CreditsService.updTable5(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});

module.exports = router;