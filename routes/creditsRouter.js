/**
 * Created by simvolice on 14.08.2017 15:16
 */



const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

const CreditsService = require('../services/CreditsService');
const ItemForFactInCredits = require('../services/ItemForFactInCredits');






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


router.get('/creditsfact', async (req, res, next) =>{

    let result =  await ItemForFactInCredits.getAllCreditsFact();




    res.json({"code": 0, "resultFromDb": result});


});



router.post('/newcreditsfact', checkSeesionToken, async (req, res, next) =>{

   await ItemForFactInCredits.insertCreditsFact(req.body.data);



    let result =  await ItemForFactInCredits.getAllCreditsFact();



    res.json({"code": 0, "resultFromDb": result});


});






module.exports = router;