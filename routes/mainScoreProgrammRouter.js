/**
 * Created by simvolice on 24.08.2017 16:30
 */



const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');
const MainScoreProgramService = require('../services/MainScoreProgramService');



router.post('/addplatform', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.addPlatform(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});



router.post('/getplatform', checkSeesionToken, async (req, res, next) =>{


    let result = await MainScoreProgramService.getAll();


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }


});

router.post('/updplatform', checkSeesionToken, async (req, res, next) =>{



    let result =  await MainScoreProgramService.updPlatform(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});


router.post('/deleteplatform', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.deletePlatform(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});









////////////////////Проекты/////////////////////////////////////////////////////


router.post('/addproject', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.addProject(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});



router.post('/getproject', checkSeesionToken, async (req, res, next) =>{


    let result = await MainScoreProgramService.getAllProject();


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }


});

router.post('/updproject', checkSeesionToken, async (req, res, next) =>{



    let result =  await MainScoreProgramService.updProject(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});


router.post('/deleteproject', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.deleteProject(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});


////////////////////RegionalInvest/////////////////////////////////////////////////////


router.post('/addregionalinvest', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.addRegionalInvest(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});



router.post('/getregionalinvest', checkSeesionToken, async (req, res, next) =>{


    let result = await MainScoreProgramService.getAllRegionalInvest();


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }


});

router.post('/updregionalinvest', checkSeesionToken, async (req, res, next) =>{



    let result =  await MainScoreProgramService.updRegionalInvest(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});


router.post('/deleteregionalinvest', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.deleteRegionalInvest(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});


////////////////////MobileResurs/////////////////////////////////////////////////////


router.post('/addmobileresurs', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.addMobileResurs(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});



router.post('/getmobileresurs', checkSeesionToken, async (req, res, next) =>{


    let result = await MainScoreProgramService.getAllMobileResurs();


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }


});

router.post('/updmobileresurs', checkSeesionToken, async (req, res, next) =>{



    let result =  await MainScoreProgramService.updMobileResurs(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});


router.post('/deletemobileresurs', checkSeesionToken, async (req, res, next) =>{

    let result =  await MainScoreProgramService.deleteMobileResurs(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});





module.exports = router;