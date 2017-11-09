/**
 * Created by simvolice on 16.08.2017 0:41
 */


const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');


const GrmService = require('../services/GrmService');
const GrmStatusService = require('../services/GrmStatusService');


router.post('/getallstatus', checkSeesionToken, async (req, res, next) =>{


    let result = await GrmStatusService.getAllStatus();

    res.json({"code": 0, "resultFromDb": result});

});






router.post('/addgrm', checkSeesionToken, async (req, res, next) =>{

    let result =  await GrmService.addGrm(req.body.data);






    if (result.hasOwnProperty("result")) {

        res.json({"code": 0, resultFromDb: result.ops[0]});

    } else {

        res.json({"code": 1});

    }


});




router.post('/getallgrm', checkSeesionToken, async (req, res, next) =>{

    let result = await checkRole.forGrm(req.body.sessionToken);



    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }

});




router.post('/changestatus', checkSeesionToken, async (req, res, next) =>{

    let result =  await GrmService.changeSatatus(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});


router.post('/deletegrm', checkSeesionToken, async (req, res, next) =>{

    let result =  await GrmService.delGrm(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});

router.post('/updategrm', checkSeesionToken, async (req, res, next) =>{

    let result =  await GrmService.updateGrm(req.body.data);


    console.log("\x1b[42m", result);


    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }


});



router.get('/getallcanalrequest', async (req, res, next) =>{

    let result = await GrmStatusService.getAllCanalsRequest();

    res.json({"code": 0, "resultFromDb": result});


});


router.post('/insertnewcanalrequest', checkSeesionToken, async (req, res, next) =>{

   await GrmStatusService.insertCanalsRequest(req.body.data);
   let result = await GrmStatusService.getAllCanalsRequest();
   res.json({"code": 0, "resultFromDb": result});


});



router.get('/getallcateggrm', async (req, res, next) =>{

    let result = await GrmStatusService.getAllCategGRM();

    res.json({"code": 0, "resultFromDb": result});


});



router.post('/insertnewcateggrm', checkSeesionToken, async (req, res, next) =>{

    await GrmStatusService.insertCategGRM(req.body.data);
    let result = await GrmStatusService.getAllCategGRM();
    res.json({"code": 0, "resultFromDb": result});


});

module.exports = router;